const KEY = "niulai.repay.v1";

export function loadRepaid(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isRepaid(id: string) {
  return loadRepaid().includes(id);
}

export function markRepaid(id: string) {
  const next = [...new Set([id, ...loadRepaid()])].slice(0, 80);
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
