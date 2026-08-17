import { addGongde } from "@/lib/gongde";
import { awardSeal } from "@/lib/seals";

const KEY = "niulai.incense.v1";

export type Incense = { last: string; streak: number; best: number };

function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
}

export function loadIncense(): Incense {
  if (typeof window === "undefined") return { last: "", streak: 0, best: 0 };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { last: "", streak: 0, best: 0 };
    const p = JSON.parse(raw) as Incense;
    return {
      last: String(p.last ?? ""),
      streak: Number(p.streak) || 0,
      best: Number(p.best) || 0,
    };
  } catch {
    return { last: "", streak: 0, best: 0 };
  }
}

export function touchIncense(): Incense {
  const prev = loadIncense();
  const today = dayKey();
  if (prev.last === today) return prev;
  const streak = prev.last === yesterdayKey() ? prev.streak + 1 : 1;
  const next: Incense = { last: today, streak, best: Math.max(prev.best, streak) };
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(next));
  if (prev.last) awardSeal("back");
  addGongde(streak >= 3 ? 12 : 4);
  return next;
}

export function incenseLine(inc: Incense) {
  if (inc.streak <= 1) return "香刚点上。明日再来，别灭。";
  return `香火连着 ${inc.streak} 天。明日再来，别灭。`;
}
