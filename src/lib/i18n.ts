import { create } from "zustand";
import { persist } from "zustand/middleware";

export const LOCALES = ["zh", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const copy = {
  zh: {
    brand: "牛来许愿池",
    mark: "概念神",
    tagline: "不是官方。是路边那座许愿池。",
    register: "登记一贪",
    registeredTo: "已登记到",
    numberUnit: "号",
    shrineHint: "不收钱 · 不拜动物 · 向一个概念挂号",
    navNbti: "NBTI",
    navBook: "号簿",
    navLogin: "落款",
    footerLine: "一座民间许愿池 · 号只增不减",
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
    navOffer: "上供",
    navXiang: "换香",
    navLot: "抽签",
    navSeal: "香牌",
    navStory: "前生今世",
    navBoard: "贪榜",
    navShare: "分享",
    navAbout: "关于",
    navPrivacy: "隐私",
    navTerms: "免责",
  },
  en: {
    brand: "niulai",
    mark: "the totem",
    tagline: "Not official. A roadside shrine.",
    register: "Make a wish",
    registeredTo: "No.",
    numberUnit: "",
    shrineHint: "Free. Not an animal. A totem.",
    navNbti: "NBTI",
    navBook: "Book",
    navLogin: "Sign",
    footerLine: "A folk shrine. The number only goes up.",
    footerSub: "People leave. The number stays. Not official. Not advice.",
    todayTitle: "Today the god takes this",
    bangTitle: "What people wished",
    bangAll: "Full list →",
    nbtiTease: "What kind of bull are you?",
    nbtiTeaseSub: "Eight questions. A type. A number. A card to send.",
    nbtiCta: "Take the test",
    wishHead: "Make a wish",
    wishTitle: "Pick one line",
    wishHint: "Limit-up, even, double. That's the menu.",
    ledgerHead: "Book",
    ledgerTitle: "What others wished",
    witnessHead: "Witnesses",
    witnessTitle: "Who stands next to the god",
    shareSlip: "Numbers only",
    shareBtn: "Share this",
    followHim: "Wish the same",
    greedier: "Greedier",
    lookAtMe: "Test me first",
    manifesto: "Not merch. A shrine. People go. The number doesn't.",
    navOffer: "Dress the god",
    navXiang: "Incense",
    navLot: "Draw a lot",
    navSeal: "Seals",
    navStory: "Story",
    navBoard: "Board",
    navShare: "Share",
    navAbout: "About",
    navPrivacy: "Privacy",
    navTerms: "Disclaimer",
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
