const KEY = "niulai.gongde.v1";

export const RANKS = [
  { min: 0, name: "路人", line: "还没磕。站着看。" },
  { min: 8, name: "看客", line: "看完了。手还没伸。" },
  { min: 36, name: "香客", line: "号领了。人还在。" },
  { min: 88, name: "门徒", line: "神点过头。你也点过。" },
  { min: 188, name: "庙祝", line: "这庙没人看，你在看。" },
  { min: 888, name: "野神", line: "功德够了。盘不一定看你。" },
] as const;

export function rankOf(n: number) {
  return [...RANKS].reverse().find((r) => n >= r.min) ?? RANKS[0];
}

export function loadGongde() {
  if (typeof window === "undefined") return 0;
  try {
    return Number(window.localStorage.getItem(KEY) ?? 0) || 0;
  } catch {
    return 0;
  }
}

export function addGongde(n: number) {
  const next = Math.max(0, loadGongde() + n);
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, String(next));
  return next;
}

export function spendGongde(n: number) {
  const now = loadGongde();
  if (now < n) return { ok: false as const, left: now };
  const next = now - n;
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, String(next));
  return { ok: true as const, left: next };
}
