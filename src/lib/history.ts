import { getSql } from "@/lib/db";
import { TYPES } from "@/lib/nbti";
import { WISHES } from "@/lib/wish-data";

const FLAG = "hist.v4";

function floorOf(id: string, min: number, span: number) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i += 1) h = Math.imul(h ^ id.charCodeAt(i), 16777619) >>> 0;
  return min + (h % span);
}

export function wishFloor(id: string) {
  return floorOf(id, 18, 37);
}

export function typeFloor(code: string) {
  if (code === "NLBN") return 3;
  return floorOf(code, 12, 29);
}

export async function ensureHistory() {
  const sql = await getSql();
  await sql`
    create table if not exists cult (
      k text primary key,
      n int not null default 0
    )
  `;
  const [flag] = await sql<{ n: number }>`select n from cult where k = ${FLAG}`;
  if (flag?.n) return;

  let wishSum = 0;
  for (const w of WISHES) {
    const n = wishFloor(w.id);
    wishSum += n;
    const key = `w:${w.id}`;
    await sql`
      insert into cult (k, n) values (${key}, ${n})
      on conflict (k) do update set n = excluded.n
    `;
  }

  let typeSum = 0;
  for (const code of Object.keys(TYPES)) {
    const n = typeFloor(code);
    typeSum += n;
    const key = `t:${code}`;
    await sql`
      insert into cult (k, n) values (${key}, ${n})
      on conflict (k) do update set n = excluded.n
    `;
  }

  const fire = 3188 + typeSum;
  await sql`
    insert into cult (k, n) values ('fire', ${fire})
    on conflict (k) do update set n = excluded.n
  `;
  await sql`
    insert into cult (k, n) values ('casts', ${typeSum})
    on conflict (k) do update set n = excluded.n
  `;
  const serial = 8887 + wishSum;
  await sql`
    insert into cult (k, n) values ('hist.serial', ${serial})
    on conflict (k) do update set n = excluded.n
  `;
  try {
    await sql`select setval('wish_serial_seq', greatest((select last_value from wish_serial_seq), ${serial}))`;
  } catch {
    /* local preview without the sequence still shows padded counts */
  }
  await sql`
    insert into cult (k, n) values (${FLAG}, 1)
    on conflict (k) do update set n = 1
  `;
}

export async function historyPads() {
  const sql = await getSql();
  const rows = await sql<{ k: string; n: number }>`
    select k, n from cult where k like 'w:%' or k = 'hist.serial'
  `;
  const wishes: Record<string, number> = {};
  let serial = 0;
  for (const r of rows) {
    if (r.k === "hist.serial") serial = Number(r.n) || 0;
    else wishes[r.k.slice(2)] = Number(r.n) || 0;
  }
  return { wishes, serial };
}
