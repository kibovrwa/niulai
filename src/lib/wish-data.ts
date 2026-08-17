export const PACKS = [
  { id: "pan", label: "盘面" },
  { id: "ren", label: "人间" },
  { id: "abs", label: "抽象" },
] as const;

export type PackId = (typeof PACKS)[number]["id"];

export const WISHES = [
  { id: "double", pack: "pan", label: "股票翻倍", roast: "贪一点才像许愿。", stamp: "待翻" },
  { id: "limitup", pack: "pan", label: "明天涨停", roast: "今晚先别刷新行情。", stamp: "待封" },
  { id: "huiben", pack: "pan", label: "被套三年今日回本", roast: "套久了，神也看不下去。", stamp: "回本" },
  { id: "sixk", pack: "pan", label: "大A站上六千", roast: "点位许愿，自古有之。", stamp: "冲锋" },
  { id: "dahai", pack: "pan", label: "美股是大海", roast: "池塘在这边。海在那边。", stamp: "出海" },
  { id: "kongcang", pack: "pan", label: "空仓的人后悔", roast: "踏空也是一种修行。", stamp: "满仓" },
  { id: "zhuli", pack: "pan", label: "主力连夜来接", roast: "接你的人，今晚加班。", stamp: "待接" },
  { id: "hongpan", pack: "pan", label: "下周红盘开门", roast: "先把周一活过去。", stamp: "开门红" },
  { id: "bonus", pack: "ren", label: "年终奖翻倍", roast: "公司许不了，图腾许。", stamp: "待发" },
  { id: "reply", pack: "ren", label: "暗恋回消息", roast: "回一个字就算灵。", stamp: "待回" },
  { id: "exam", pack: "ren", label: "考试过了", roast: "过了再来谢牛。", stamp: "待出分" },
  { id: "offer", pack: "ren", label: "offer 来一个", roast: "一个就够，别贪。", stamp: "待发" },
  { id: "rent", pack: "ren", label: "房租别再涨", roast: "房东听不见，牛听得见。", stamp: "冻住" },
  { id: "tijian", pack: "ren", label: "体检全绿", roast: "先把单子翻过来。", stamp: "待查" },
  { id: "client", pack: "ren", label: "甲方不改需求", roast: "此愿难度高于涨停。", stamp: "奇迹" },
  { id: "caitou", pack: "abs", label: "图个彩头", roast: "抽象的愿，抽象地灵。", stamp: "已登记" },
  { id: "cuzao", pack: "abs", label: "建模越糙越灵", roast: "精致的神不接散户。", stamp: "糙灵" },
  { id: "bandao", pack: "abs", label: "绊倒也能涨", roast: "倒了就倒了，站起来还是牛。", stamp: "再起" },
  { id: "yingyuan", pack: "abs", label: "先许一个再进影院", roast: "票是香火，愿是彩头。", stamp: "已购" },
] as const;

export type WishId = (typeof WISHES)[number]["id"];

export const COW_TYPES = [
  { id: "huitou", name: "跌停回封牛", line: "被砸过，还在盘里。" },
  { id: "hengpan", name: "横盘蓄势牛", line: "不急。草会长。" },
  { id: "bandao", name: "绊倒再起牛", line: "倒了就倒了，站起来还是牛。" },
  { id: "fanchu", name: "躺平反刍牛", line: "先吃草。行情自己来。" },
  { id: "tuomeng", name: "美股大海牛", line: "A股是池塘。那边才是海。" },
  { id: "weiguan", name: "路边围观牛", line: "先看看别人许的。" },
  { id: "langqun", name: "硬刚狼群牛", line: "回撤来了也不让。" },
  { id: "tuodi", name: "托底加仓牛", line: "有人在后面托着。" },
  { id: "dazi", name: "搭子同行牛", line: "谁跟你一起走，比点位重要。" },
  { id: "dandang", name: "梦醒担当牛", line: "许完愿就开始干活。" },
  { id: "zhexue", name: "抽象哲学牛", line: "每一帧都像后现代。" },
  { id: "liuqian", name: "冲锋点位牛", line: "点位许了，人就踏实了。" },
] as const;

export type CowTypeId = (typeof COW_TYPES)[number]["id"];

export function isWishId(v: string): v is WishId {
  return WISHES.some((w) => w.id === v);
}

export function wishById(id: string) {
  return WISHES.find((w) => w.id === id) ?? WISHES[0];
}

export function cowTypeById(id: string) {
  return COW_TYPES.find((t) => t.id === id) ?? COW_TYPES[2];
}

export function pickCowType(seed: string, wishId: string): CowTypeId {
  let h = 0;
  const s = `${seed}:${wishId}`;
  for (let i = 0; i < s.length; i += 1) h = (h * 33 + s.charCodeAt(i)) >>> 0;
  return COW_TYPES[h % COW_TYPES.length].id;
}

export function luckyMark(serial: number): string | null {
  const s = String(serial);
  if (serial % 10000 === 0) return "万号";
  if (serial % 1000 === 0) return "整千";
  if (/^(\d)\1+$/.test(s)) return "豹子";
  if (s === [...s].reverse().join("") && s.length >= 4) return "回文";
  if (s.includes("888")) return "发发发";
  if (s.endsWith("88")) return "发发";
  if (s.endsWith("68")) return "顺发";
  return null;
}

export function nextMilestone(n: number) {
  const marks = [10, 36, 88, 188, 520, 888, 1000, 1888, 5200, 8888];
  return marks.find((m) => n < m) ?? Math.ceil((n + 1) / 1000) * 1000;
}

export const GREEDIER: Record<WishId, WishId> = {
  double: "sixk",
  limitup: "double",
  huiben: "double",
  sixk: "dahai",
  dahai: "double",
  kongcang: "limitup",
  zhuli: "limitup",
  hongpan: "limitup",
  bonus: "double",
  reply: "bonus",
  exam: "offer",
  offer: "bonus",
  rent: "bonus",
  tijian: "exam",
  client: "double",
  caitou: "double",
  cuzao: "bandao",
  bandao: "double",
  yingyuan: "caitou",
};

export function greedierThan(id: WishId): WishId {
  return GREEDIER[id] ?? "double";
}

export function todayWishId(at = new Date()) {
  const key = `${at.getFullYear()}-${at.getMonth() + 1}-${at.getDate()}`;
  let h = 0;
  for (let i = 0; i < key.length; i += 1) h = (h * 33 + key.charCodeAt(i)) >>> 0;
  return WISHES[h % WISHES.length].id;
}

export const TYPE_REC: Record<CowTypeId, WishId> = {
  huitou: "huiben",
  hengpan: "hongpan",
  bandao: "bandao",
  fanchu: "caitou",
  tuomeng: "reply",
  weiguan: "kongcang",
  langqun: "limitup",
  tuodi: "zhuli",
  dazi: "yingyuan",
  dandang: "exam",
  zhexue: "cuzao",
  liuqian: "sixk",
};

export function rankWishes(counts: Record<string, number>) {
  return [...WISHES]
    .map((w) => ({ ...w, n: counts[w.id] ?? 0 }))
    .sort((a, b) => b.n - a.n || a.label.localeCompare(b.label, "zh"));
}

export const ROADSIDE_TALK = [
  { who: "散户甲", line: "股民对这两个字有天然的向往。" },
  { who: "上海股民", line: "希望大A冲上六千。看个乐子，也算香火。" },
  { who: "猫眼留言", line: "烂到极致必须尝尝咸淡。顺便许一个。" },
  { who: "路过的豹", line: "先装饿。再许翻倍。" },
  { who: "云雀", line: "我只负责看着。贪不贪，看你们自己。" },
  { who: "韩网截图", line: "这只绊倒的黄牛，被当成半导体老祖了。" },
  { who: "影厅", line: "有一个人晒单，群里就控制不住。" },
  { who: "无名氏", line: "牛来不赐福。牛来给你编号。" },
];

export const SEED_WISHES: Array<{ nickname: string; wishId: WishId }> = [
  { nickname: "空仓的人", wishId: "kongcang" },
  { nickname: "夜班", wishId: "double" },
  { nickname: "二战考研", wishId: "exam" },
  { nickname: "无名氏", wishId: "reply" },
  { nickname: "小店", wishId: "bonus" },
  { nickname: "抽象仙人", wishId: "caitou" },
  { nickname: "加仓的人", wishId: "limitup" },
  { nickname: "北漂", wishId: "rent" },
  { nickname: "妈妈", wishId: "tijian" },
  { nickname: "散户乙", wishId: "sixk" },
  { nickname: "应届生", wishId: "offer" },
  { nickname: "修车的", wishId: "hongpan" },
  { nickname: "前任", wishId: "reply" },
  { nickname: "程序员", wishId: "client" },
  { nickname: "路过", wishId: "cuzao" },
  { nickname: "大姨", wishId: "huiben" },
  { nickname: "期货", wishId: "zhuli" },
  { nickname: "高三", wishId: "exam" },
  { nickname: "摆摊", wishId: "yingyuan" },
  { nickname: "打工人", wishId: "bonus" },
  { nickname: "影迷", wishId: "bandao" },
  { nickname: "基金", wishId: "double" },
  { nickname: "司机", wishId: "hongpan" },
  { nickname: "套牢五年", wishId: "huiben" },
  { nickname: "美股夜班", wishId: "dahai" },
  { nickname: "核动力", wishId: "bonus" },
  { nickname: "云雀看着", wishId: "caitou" },
  { nickname: "豹先装饿", wishId: "zhuli" },
  { nickname: "第八次倒", wishId: "bandao" },
  { nickname: "匿名香客", wishId: "double" },
];
