import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import {
  SEED_WISHES,
  isWishId,
  pickCowType,
  wishById,
  type WishId,
} from "@/lib/wish-data";

export type WishRow = {
  id: string;
  serial: number;
  nickname: string;
  wishId: WishId;
  label: string;
  cowType: string;
  createdAt: string;
};

function makeId() {
  return `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function asWish(row: {
  id: string;
  serial: number;
  nickname: string;
  category: string;
  message: string;
  cow_type: string;
  created_at: string | Date;
}): WishRow {
  const created =
    typeof row.created_at === "string"
      ? row.created_at
      : row.created_at.toISOString();
  const wish = isWishId(row.category) ? wishById(row.category) : wishById("caitou");
  return {
    id: row.id,
    serial: Number(row.serial),
    nickname: row.nickname,
    wishId: wish.id,
    label: row.message || wish.label,
    cowType: row.cow_type,
    createdAt: created,
  };
}

async function seedIfEmpty() {
  const sql = await getSql();
  const [{ n }] = await sql<{ n: number }>`select count(*)::int as n from wishes`;
  if (n > 0) return;

  const start = 8888;
  for (let i = 0; i < SEED_WISHES.length; i += 1) {
    const w = SEED_WISHES[i];
    const wish = wishById(w.wishId);
    const id = `seed${String(i + 1).padStart(3, "0")}`;
    const serial = start + i;
    const cowType = pickCowType(id, w.wishId);
    const minutesAgo = (SEED_WISHES.length - i) * 17 + 4;
    await sql`
      insert into wishes (id, serial, nickname, category, message, cow_type, created_at)
      values (
        ${id},
        ${serial},
        ${w.nickname},
        ${w.wishId},
        ${wish.label},
        ${cowType},
        now() - (${minutesAgo} || ' minutes')::interval
      )
      on conflict (id) do nothing
    `;
  }
  await sql`select setval('wish_serial_seq', (select coalesce(max(serial), 8887) from wishes))`;
}

export async function readStats() {
  await seedIfEmpty();
  const sql = await getSql();
  const [row] = await sql<{
    total: number;
    last_serial: number | null;
  }>`select count(*)::int as total, max(serial)::int as last_serial from wishes`;
  const byWish = await sql<{ category: string; n: number }>`
    select category, count(*)::int as n from wishes group by category
  `;
  const counts: Record<string, number> = {};
  for (const r of byWish) counts[r.category] = r.n;
  return {
    total: row?.total ?? 0,
    lastSerial: row?.last_serial ?? 8887,
    counts,
  };
}

export async function readWishes(input: { limit?: number; wishId?: string } = {}) {
  const limit = Math.min(Math.max(input.limit ?? 36, 1), 80);
  const wishId = input.wishId && isWishId(input.wishId) ? input.wishId : null;
  await seedIfEmpty();
  const sql = await getSql();
  const rows = wishId
    ? await sql<{
        id: string;
        serial: number;
        nickname: string;
        category: string;
        message: string;
        cow_type: string;
        created_at: string;
      }>`
        select id, serial, nickname, category, message, cow_type, created_at
        from wishes
        where category = ${wishId}
        order by serial desc
        limit ${limit}
      `
    : await sql<{
        id: string;
        serial: number;
        nickname: string;
        category: string;
        message: string;
        cow_type: string;
        created_at: string;
      }>`
        select id, serial, nickname, category, message, cow_type, created_at
        from wishes
        order by serial desc
        limit ${limit}
      `;
  return rows.map(asWish);
}

export const emptyStats = { total: 0, lastSerial: 8887, counts: {} as Record<string, number> };

export const getStats = createServerFn({ method: "GET" }).handler(() => readStats());

export const listWishes = createServerFn({ method: "GET" })
  .validator((input: { limit?: number; wishId?: string } = {}) => ({
    limit: Math.min(Math.max(input.limit ?? 36, 1), 80),
    wishId: input.wishId && isWishId(input.wishId) ? input.wishId : null,
  }))
  .handler(async ({ data }) => readWishes({ limit: data.limit, wishId: data.wishId ?? undefined }));

export const getWish = createServerFn({ method: "GET" })
  .validator((id: string) => id.trim())
  .handler(async ({ data: id }) => {
    if (!id) return null;
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      serial: number;
      nickname: string;
      category: string;
      message: string;
      cow_type: string;
      created_at: string;
    }>`
      select id, serial, nickname, category, message, cow_type, created_at
      from wishes where id = ${id} limit 1
    `;
    return rows[0] ? asWish(rows[0]) : null;
  });

export const createWish = createServerFn({ method: "POST" })
  .validator((input: { nickname: string; wishId: string }) => {
    const nickname = input.nickname.trim().slice(0, 12) || "无名氏";
    if (!isWishId(input.wishId)) throw new Error("这一愿不在香位上");
    return { nickname, wishId: input.wishId };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    await seedIfEmpty();

    let userId: string | null = null;
    try {
      const { getSessionUser } = await import("@/lib/auth/verify.server");
      const u = await getSessionUser();
      userId = u?.id ?? null;
    } catch {
      userId = null;
    }

    const wish = wishById(data.wishId);
    const id = makeId();
    const cowType = pickCowType(id, data.wishId);
    const [row] = await sql<{
      id: string;
      serial: number;
      nickname: string;
      category: string;
      message: string;
      cow_type: string;
      created_at: string;
    }>`
      insert into wishes (id, serial, nickname, category, message, cow_type, user_id)
      values (
        ${id},
        nextval('wish_serial_seq'),
        ${data.nickname},
        ${data.wishId},
        ${wish.label},
        ${cowType},
        ${userId}
      )
      returning id, serial, nickname, category, message, cow_type, created_at
    `;
    return asWish(row);
  });
