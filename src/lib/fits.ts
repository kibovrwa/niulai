export const FITS = [
  { id: "pihong", slot: "body", name: "披红", cost: 8, line: "庙里最正经的一件。" },
  { id: "cao", slot: "head", name: "草环", cost: 8, line: "先吃草。神也吃。" },
  { id: "beng", slot: "face", name: "绊倒绷带", cost: 8, line: "倒过，还敢当神。" },
  { id: "nai", slot: "hold", name: "一瓶奶", cost: 12, line: "豹看见会装饿。" },
  { id: "jing", slot: "face", name: "墨镜", cost: 18, line: "满仓装死专用。" },
  { id: "majia", slot: "body", name: "红马甲", cost: 18, line: "散户工装。" },
  { id: "zhang", slot: "head", name: "涨停帽", cost: 36, line: "帽子比盘先红。" },
  { id: "que", slot: "head", name: "云雀", cost: 36, line: "让它看着。别让它下单。" },
] as const;

export type FitId = (typeof FITS)[number]["id"];
export type FitSlot = (typeof FITS)[number]["slot"];

const KEY = "niulai.fits.v1";

export type FitState = {
  owned: FitId[];
  on: Partial<Record<FitSlot, FitId>>;
};

function empty(): FitState {
  return { owned: [], on: {} };
}

export function loadFits(): FitState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as FitState;
    return {
      owned: Array.isArray(parsed.owned) ? parsed.owned : [],
      on: parsed.on ?? {},
    };
  } catch {
    return empty();
  }
}

function save(state: FitState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function fitById(id: string) {
  return FITS.find((f) => f.id === id);
}

export function toggleFit(id: FitId) {
  const item = fitById(id);
  const state = loadFits();
  if (!item || !state.owned.includes(id)) return state;
  if (state.on[item.slot] === id) delete state.on[item.slot];
  else state.on[item.slot] = id;
  save(state);
  return state;
}

export function ownFit(id: FitId) {
  const state = loadFits();
  if (!state.owned.includes(id)) state.owned.push(id);
  const item = fitById(id);
  if (item) state.on[item.slot] = id;
  save(state);
  return state;
}

export function equippedList(state = loadFits()) {
  return (Object.values(state.on).filter(Boolean) as FitId[])
    .map((id) => fitById(id))
    .filter((x): x is (typeof FITS)[number] => Boolean(x));
}
