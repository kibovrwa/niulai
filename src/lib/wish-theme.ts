import type { WishId } from "@/lib/wish-data";

export type WishTheme = {
  scene: string;
  boast: string;
  bits: string[];
  ink: string;
};

const THEMES: Record<WishId, WishTheme> = {
  marry: {
    scene: "/art/wish/marry.jpg",
    boast: "神不包办。这号，是聘书。",
    bits: ["喜", "嫁", "来", "红"],
    ink: "#c43a22",
  },
  reply: {
    scene: "/art/wish/reply.jpg",
    boast: "回一个字，就算灵。",
    bits: ["回", "信", "来"],
    ink: "#c43a22",
  },
  sleep: {
    scene: "/art/wish/sleep.jpg",
    boast: "今晚把眼睛交给神。",
    bits: ["眠", "香", "静"],
    ink: "#8a5a32",
  },
  offwork: {
    scene: "/art/wish/sleep.jpg",
    boast: "准点走，也是一种涨停。",
    bits: ["走", "准", "香"],
    ink: "#8a5a32",
  },
  double: {
    scene: "/art/wish/gold.jpg",
    boast: "贪一点，才像许愿。",
    bits: ["倍", "金", "来"],
    ink: "#c4921c",
  },
  bonus: {
    scene: "/art/wish/gold.jpg",
    boast: "公司许不了，牛许。",
    bits: ["奖", "倍", "来"],
    ink: "#c4921c",
  },
  caitou: {
    scene: "/art/wish/gold.jpg",
    boast: "图个彩头，也算香火。",
    bits: ["彩", "来", "灵"],
    ink: "#c4921c",
  },
  cuzao: {
    scene: "/art/wish/gold.jpg",
    boast: "越糙越灵。精致的神不接散户。",
    bits: ["糙", "灵", "来"],
    ink: "#c4921c",
  },
  limitup: {
    scene: "/art/wish/red.jpg",
    boast: "今晚先别刷新。",
    bits: ["涨", "封", "红"],
    ink: "#c43a22",
  },
  hongpan: {
    scene: "/art/wish/red.jpg",
    boast: "先把周一活过去。",
    bits: ["红", "开", "门"],
    ink: "#c43a22",
  },
  sixk: {
    scene: "/art/wish/red.jpg",
    boast: "一个整数，就是一座庙。",
    bits: ["六", "千", "冲"],
    ink: "#c43a22",
  },
  huiben: {
    scene: "/art/wish/red.jpg",
    boast: "套了三年，神也看不下去。",
    bits: ["回", "本", "来"],
    ink: "#c43a22",
  },
  zhuli: {
    scene: "/art/wish/red.jpg",
    boast: "接你的人，今晚加班。",
    bits: ["接", "夜", "来"],
    ink: "#c43a22",
  },
  kongcang: {
    scene: "/art/wish/red.jpg",
    boast: "踏空也是一种修行。",
    bits: ["空", "悔", "来"],
    ink: "#c43a22",
  },
  dahai: {
    scene: "/art/wish/gold.jpg",
    boast: "池塘在这边。海在那边。",
    bits: ["海", "航", "来"],
    ink: "#c4921c",
  },
  exam: {
    scene: "/art/wish/sleep.jpg",
    boast: "过了再来谢牛。",
    bits: ["过", "中", "来"],
    ink: "#8a5a32",
  },
  offer: {
    scene: "/art/wish/gold.jpg",
    boast: "一个就够，别贪。",
    bits: ["Offer", "来", "收"],
    ink: "#c4921c",
  },
  rent: {
    scene: "/art/wish/sleep.jpg",
    boast: "房东听不见，牛听得见。",
    bits: ["冻", "租", "住"],
    ink: "#8a5a32",
  },
  tijian: {
    scene: "/art/wish/sleep.jpg",
    boast: "先把单子翻过来。",
    bits: ["绿", "安", "来"],
    ink: "#3b7540",
  },
  client: {
    scene: "/art/wish/red.jpg",
    boast: "此愿难度高于涨停。",
    bits: ["冻", "需", "求"],
    ink: "#c43a22",
  },
  bandao: {
    scene: "/art/wish/gold.jpg",
    boast: "倒了就倒了，站起来还是牛。",
    bits: ["倒", "起", "涨"],
    ink: "#c4921c",
  },
  yingyuan: {
    scene: "/art/wish/gold.jpg",
    boast: "票是香火，愿是彩头。",
    bits: ["票", "香", "来"],
    ink: "#c4921c",
  },
};

const FALLBACK: WishTheme = {
  scene: "/art/wish/gold.jpg",
  boast: "信牛来，牛市一定来。",
  bits: ["来", "香", "灵"],
  ink: "#c43a22",
};

export function wishTheme(id: string): WishTheme {
  return (THEMES as Record<string, WishTheme>)[id] ?? FALLBACK;
}
