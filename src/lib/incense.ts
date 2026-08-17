import { addGongde, spendGongde } from "@/lib/gongde";
import { awardSeal } from "@/lib/seals";

const KEY = "niulai.incense.v1";

export const STICKS = [
  { id: "cao", name: "草香", cost: 0, line: "进池就领。免费。" },
  { id: "hong", name: "红香", cost: 8, line: "红一点，神多看一眼。" },
  { id: "mama", name: "麻麻香", cost: 18, line: "点着，神会叫麻麻。" },
  { id: "zhang", name: "涨停香", cost: 36, line: "香比盘先红。" },
] as const;

export type StickId = (typeof STICKS)[number]["id"];

export type Incense = {
  last: string;
  streak: number;
  best: number;
  owned: StickId[];
  on: StickId;
};

function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
}

function empty(): Incense {
  return { last: "", streak: 0, best: 0, owned: [], on: "cao" };
}

export function stickById(id: string) {
  return STICKS.find((s) => s.id === id);
}

export function loadIncense(): Incense {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Partial<Incense>;
    const owned = Array.isArray(p.owned) ? (p.owned as StickId[]) : [];
    return {
      last: String(p.last ?? ""),
      streak: Number(p.streak) || 0,
      best: Number(p.best) || 0,
      owned,
      on: stickById(String(p.on)) ? (p.on as StickId) : "cao",
    };
  } catch {
    return empty();
  }
}

function save(state: Incense) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function claimFreeStick() {
  const state = loadIncense();
  if (state.owned.includes("cao")) return state;
  state.owned.push("cao");
  state.on = "cao";
  save(state);
  addGongde(2);
  awardSeal("today");
  return state;
}

export function swapStick(id: StickId) {
  const item = stickById(id);
  const state = loadIncense();
  if (!item) return { ok: false as const, state, msg: "没有这种香。" };
  if (state.owned.includes(id)) {
    state.on = id;
    save(state);
    return { ok: true as const, state, msg: `换上${item.name}。` };
  }
  if (item.cost === 0) {
    state.owned.push(id);
    state.on = id;
    save(state);
    return { ok: true as const, state, msg: `领了${item.name}。` };
  }
  const pay = spendGongde(item.cost);
  if (!pay.ok) return { ok: false as const, state, msg: `功德不够。${item.name}要 ${item.cost}。` };
  state.owned.push(id);
  state.on = id;
  save(state);
  return { ok: true as const, state, msg: `换上${item.name}。${item.line}` };
}

export function touchIncense(): Incense {
  const prev = loadIncense();
  const today = dayKey();
  if (prev.last === today) return prev;
  const streak = prev.last === yesterdayKey() ? prev.streak + 1 : 1;
  const next: Incense = { ...prev, last: today, streak, best: Math.max(prev.best, streak) };
  save(next);
  if (prev.last) awardSeal("back");
  addGongde(streak >= 3 ? 12 : 4);
  return next;
}

export function hasStick(state = loadIncense()) {
  return state.owned.length > 0;
}

export function incenseLine(inc: Incense) {
  const stick = stickById(inc.on)?.name ?? "草香";
  if (!inc.owned.length) return "进池免费领一炷。后面再换。";
  if (inc.streak <= 1) return `${stick}刚点上。明日再来，别灭。`;
  return `${stick}连着 ${inc.streak} 天。明日换一炷，别灭。`;
}

let mamaClip: HTMLAudioElement | null = null;

export function playMama() {
  if (typeof window === "undefined") return;
  if (!mamaClip) {
    mamaClip = new Audio("/art/mama.mp3?v=yuan");
    mamaClip.preload = "auto";
  }
  mamaClip.currentTime = 0;
  void mamaClip.play();
}
