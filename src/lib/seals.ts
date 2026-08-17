const KEY = "niulai.seals.v1";

export const SEALS = [
  { id: "bow1", mark: "叩", name: "初叩", how: "对着神磕一个" },
  { id: "bow8", mark: "虔", name: "八叩", how: "叩满八次" },
  { id: "bow88", mark: "门", name: "门徒", how: "叩满八十八" },
  { id: "wish", mark: "香", name: "初香", how: "向神挂号" },
  { id: "nbti", mark: "相", name: "有相", how: "测出牛马" },
  { id: "fire", mark: "火", name: "传火", how: "把单传出去" },
  { id: "today", mark: "今", name: "今日香", how: "跟今日神谕" },
  { id: "lucky", mark: "瑞", name: "瑞号", how: "领到吉号" },
  { id: "back", mark: "回", name: "回头香", how: "过后再来" },
  { id: "lot", mark: "签", name: "抽签", how: "抽一签狗血" },
  { id: "gossip", mark: "闻", name: "听闻", how: "跟证人说上话" },
  { id: "offer", mark: "供", name: "上供", how: "给神一件衣或道具" },
  { id: "repay", mark: "还", name: "还愿", how: "灵了，回来还一炷" },
] as const;

export type SealId = (typeof SEALS)[number]["id"];

export type SealState = {
  bows: number;
  earned: Partial<Record<SealId, string>>;
  seenAt?: string;
};

function empty(): SealState {
  return { bows: 0, earned: {} };
}

export function loadSeals(): SealState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as SealState;
    return {
      bows: Number(parsed.bows) || 0,
      earned: parsed.earned ?? {},
      seenAt: parsed.seenAt,
    };
  } catch {
    return empty();
  }
}

function save(state: SealState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function awardSeal(id: SealId) {
  const state = loadSeals();
  if (state.earned[id]) return state;
  state.earned[id] = new Date().toISOString();
  save(state);
  return state;
}

export function addBow() {
  const state = loadSeals();
  state.bows += 1;
  if (state.bows >= 1) state.earned.bow1 ??= new Date().toISOString();
  if (state.bows >= 8) state.earned.bow8 ??= new Date().toISOString();
  if (state.bows >= 88) state.earned.bow88 ??= new Date().toISOString();
  save(state);
  return state;
}

export function markReturn() {
  const state = loadSeals();
  const today = new Date().toISOString().slice(0, 10);
  if (state.seenAt && state.seenAt !== today) {
    state.earned.back ??= new Date().toISOString();
  }
  state.seenAt = today;
  save(state);
  return state;
}

export function earnedList(state = loadSeals()) {
  return SEALS.filter((s) => state.earned[s.id]);
}
