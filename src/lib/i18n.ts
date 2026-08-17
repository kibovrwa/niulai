import { create } from "zustand";
import { persist } from "zustand/middleware";

export const LOCALES = ["zh", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const copy = {
  zh: {
    brand: "牛来图腾",
    mark: "概念神",
    tagline: "不是牛。是「来」成了神。",
    register: "登记一贪",
    registeredTo: "已登记到",
    numberUnit: "号",
    shrineHint: "不收钱 · 不拜动物 · 向一个概念挂号",
    navNbti: "NBTI",
    navBook: "号簿",
    navLogin: "落款",
    footerLine: "民间造神运动 · 牛市精神图腾",
    footerSub: "若干年后，还来这里挂号。非电影官方 · 不代客理财。",
    todayTitle: "概念神今日收这个",
    bangTitle: "神收下的贪",
    bangAll: "全榜 →",
    nbtiTease: "测你的 NBTI",
    nbtiTeaseSub: "八题。测完是牛马，是指数，是一张能传火的单。",
    nbtiCta: "测 NBTI / 牛来指数",
    wishHead: "向概念神挂号",
    wishTitle: "选你的贪",
    wishHint: "不拜动物。把一句能转发的贪，登记到「来」上面。",
    ledgerHead: "号簿",
    ledgerTitle: "别人贪过的",
    witnessHead: "证人",
    witnessTitle: "神旁边站着的",
    shareSlip: "概念神 · 只编号",
    shareBtn: "晒这张单",
    followHim: "跟他，向神登记这个",
    greedier: "比他贪",
    lookAtMe: "先测我的 NBTI",
    manifesto: "这不是电影周边。是民间造神。人走了，号还在长。",
  },
  en: {
    brand: "NIULAI",
    mark: "Concept God",
    tagline: "Not a cow. The word Come became a god.",
    register: "File a greed",
    registeredTo: "Filed up to",
    numberUnit: "No.",
    shrineHint: "No fee. Not an animal. File it on a concept.",
    navNbti: "NBTI",
    navBook: "Ledger",
    navLogin: "Sign",
    footerLine: "Folk god-making · a totem of the bull",
    footerSub: "Years later, people will still file a number here.",
    todayTitle: "What the god takes today",
    bangTitle: "Greed the god has taken",
    bangAll: "Full board →",
    nbtiTease: "Take your NBTI",
    nbtiTeaseSub: "Six questions. A type, an index, a slip that can last years.",
    nbtiCta: "NBTI / Niulai Index",
    wishHead: "File with the god",
    wishTitle: "Pick a greed",
    wishHint: "Closed menu. Only lines that can be forwarded.",
    ledgerHead: "Ledger",
    ledgerTitle: "What others filed",
    witnessHead: "Witnesses",
    witnessTitle: "Who stands beside the god",
    shareSlip: "Concept god · numbers only",
    shareBtn: "Share the slip",
    followHim: "File the same greed",
    greedier: "Greedier than that",
    lookAtMe: "Take my NBTI first",
    manifesto: "Not merch. A folk shrine. People leave. The number keeps growing.",
  },
} as const;

export type CopyKey = keyof typeof copy.zh;

type LocaleState = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

export const useLocale = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "zh",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "niulai.locale" },
  ),
);

export function t(locale: Locale | string | undefined, key: CopyKey) {
  const loc: Locale = locale === "en" ? "en" : "zh";
  return copy[loc][key];
}
