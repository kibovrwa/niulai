import { COW_TYPES, TYPE_REC, type CowTypeId, type WishId } from "@/lib/wish-data";

export const QUESTIONS = [
  {
    id: "cang",
    q: "你现在的仓位像什么？",
    opts: [
      { id: "a", t: "空仓看戏", types: ["weiguan", "fanchu"] },
      { id: "b", t: "半仓发抖", types: ["hengpan", "huitou"] },
      { id: "c", t: "满仓睡觉", types: ["langqun", "liuqian"] },
      { id: "d", t: "已经是草", types: ["zhexue", "bandao"] },
    ],
  },
  {
    id: "xin",
    q: "你更信哪一面？",
    opts: [
      { id: "a", t: "均线", types: ["hengpan", "dandang"] },
      { id: "b", t: "政策", types: ["tuodi", "liuqian"] },
      { id: "c", t: "图腾", types: ["tuomeng", "zhexue"] },
      { id: "d", t: "朋友圈截图", types: ["dazi", "weiguan"] },
    ],
  },
  {
    id: "dao",
    q: "牛要是绊倒了，你？",
    opts: [
      { id: "a", t: "笑出声", types: ["zhexue", "weiguan"] },
      { id: "b", t: "一起倒", types: ["bandao", "dazi"] },
      { id: "c", t: "把它扶起来", types: ["tuodi", "dandang"] },
      { id: "d", t: "截图发群", types: ["liuqian", "huitou"] },
    ],
  },
  {
    id: "lai",
    q: "你来这里，其实是为了？",
    opts: [
      { id: "a", t: "要一个号", types: ["huitou", "langqun"] },
      { id: "b", t: "要一张能晒的单", types: ["liuqian", "dazi"] },
      { id: "c", t: "看看别人有多贪", types: ["weiguan", "fanchu"] },
      { id: "d", t: "纯抽象", types: ["zhexue", "tuomeng"] },
    ],
  },
] as const;

export type AnswerMap = Record<string, string>;

export function isCowTypeId(v: string): v is CowTypeId {
  return COW_TYPES.some((t) => t.id === v);
}

export function scoreXiang(answers: AnswerMap): CowTypeId {
  const score: Record<string, number> = {};
  for (const q of QUESTIONS) {
    const pick = q.opts.find((o) => o.id === answers[q.id]);
    if (!pick) continue;
    for (const t of pick.types) score[t] = (score[t] ?? 0) + 1;
  }
  let best: CowTypeId = "weiguan";
  let n = -1;
  for (const t of COW_TYPES) {
    const v = score[t.id] ?? 0;
    if (v > n) {
      n = v;
      best = t.id;
    }
  }
  return best;
}

export function recWishFor(type: CowTypeId): WishId {
  return TYPE_REC[type];
}

export function encodeAnswers(answers: AnswerMap) {
  return QUESTIONS.map((q) => answers[q.id] ?? "a").join("");
}

export function decodeAnswers(code: string): AnswerMap {
  const out: AnswerMap = {};
  QUESTIONS.forEach((q, i) => {
    const ch = code[i];
    out[q.id] = q.opts.some((o) => o.id === ch) ? ch : "a";
  });
  return out;
}
