import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { ensureHistory } from "@/lib/history";

export type CultStats = {
  fire: number;
  casts: number;
  types: Record<string, number>;
};

async function ensureCult() {
  const sql = await getSql();
  await sql`
    create table if not exists cult (
      k text primary key,
      n int not null default 0
    )
  `;
  await sql`insert into cult (k, n) values ('fire', 3188) on conflict (k) do nothing`;
  await sql`insert into cult (k, n) values ('casts', 0) on conflict (k) do nothing`;
}

async function readCult(): Promise<CultStats> {
  await ensureCult();
  await ensureHistory();
  const sql = await getSql();
  const rows = await sql<{ k: string; n: number }>`select k, n from cult`;
  const types: Record<string, number> = {};
  let fire = 3188;
  let casts = 0;
  for (const r of rows) {
    if (r.k === "fire") fire = Number(r.n);
    else if (r.k === "casts") casts = Number(r.n);
    else if (r.k.startsWith("t:")) types[r.k.slice(2)] = Number(r.n);
  }
  return { fire, casts, types };
}

export const getCult = createServerFn({ method: "GET" }).handler(() => readCult());

export { readCult };

export const passFire = createServerFn({ method: "POST" }).handler(async () => {
  await ensureCult();
  const sql = await getSql();
  await sql`insert into cult (k, n) values ('fire', 3189) on conflict (k) do update set n = cult.n + 1`;
  return readCult();
});

export const recordCast = createServerFn({ method: "POST" })
  .validator((letters: string) => letters.replace(/[^A-Z]/g, "").slice(0, 4))
  .handler(async ({ data: letters }) => {
    if (!/^[GS][MK][CX][LD]$/.test(letters)) return readCult();
    await ensureCult();
    const sql = await getSql();
    const key = `t:${letters}`;
    await sql`insert into cult (k, n) values (${key}, 1) on conflict (k) do update set n = cult.n + 1`;
    await sql`insert into cult (k, n) values ('casts', 1) on conflict (k) do update set n = cult.n + 1`;
    return readCult();
  });
