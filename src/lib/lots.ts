export const LOTS = [
  { rank: "上上", mark: "起", line: "绊倒四次。第五次自己站起来。仓位也是。" },
  { rank: "上上", mark: "奶", line: "豹今天不装饿。你可以少喂一点。" },
  { rank: "上吉", mark: "梦", line: "云雀进了梦。梦里的盘是红的。醒着再看一眼。" },
  { rank: "上吉", mark: "名", line: "妈已经给起过名了。你不用再改代码。" },
  { rank: "中平", mark: "趴", line: "剧情是成长。画面是趴着。账户跟画面走。" },
  { rank: "中平", mark: "雀", line: "云雀负责看。你负责亏。分工明确。" },
  { rank: "中平", mark: "草", line: "草会长。单不一定。先把草吃完。" },
  { rank: "中平", mark: "模", line: "穿模了。手穿过了K线。人还在里面。" },
  { rank: "下下", mark: "饿", line: "豹说自己饿。喝完你的奶，去吃别人的涨停。" },
  { rank: "下下", mark: "醒", line: "梦散了。现实还是跌停。片尾曲别当止损。" },
  { rank: "下下", mark: "妈", line: "牛妈比你有信仰。你只是有杠杆。" },
  { rank: "大凶", mark: "倒", line: "先倒。再解释。解释完还是倒。" },
  { rank: "大凶", mark: "穿", line: "建模穿了。仓位也穿了。神说这叫统一。" },
  { rank: "抽象", mark: "糙", line: "越糙越灵。你精致的那一笔，神没看见。" },
  { rank: "抽象", mark: "票", line: "票房是猎奇。你的单也是。反正都来了。" },
  { rank: "狗血", mark: "旧", line: "前男友的纳指比你有担当。云雀都看见了。" },
  { rank: "狗血", mark: "奶", line: "你把仓位喂了豹。豹说这是友情。盘说这是接盘。" },
  { rank: "狗血", mark: "梦", line: "你把暗恋带进梦里。梦里她回了。醒来是涨停，不是她。" },
  { rank: "狗血", mark: "妈", line: "家里问你赚没赚。你说在修行。修行两个字，红的。" },
  { rank: "怪梗", mark: "雀", line: "云雀在你账户里筑巢。孵出来的是手续费。" },
  { rank: "怪梗", mark: "豹", line: "路边豹开始写研报。第一句：先装饿。" },
  { rank: "怪梗", mark: "神", line: "神今天也绊倒了。功德 +1。点位 -1%。公平。" },
  { rank: "怪梗", mark: "厅", line: "影厅有人鼓掌。不是因为好看。是因为终于倒完了。" },
  { rank: "转吉", mark: "四", line: "倒了还能涨。电影里是这样演的。你再倒一次试试。" },
] as const;

export type Lot = (typeof LOTS)[number];

export function drawLot(seed = Date.now()) {
  let h = seed >>> 0;
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  return LOTS[h % LOTS.length];
}

export function todayLot() {
  const d = new Date();
  const key = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return drawLot(key * 97);
}
