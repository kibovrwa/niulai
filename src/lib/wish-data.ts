export const PACKS = [
  { id: "pan", label: "盘面", labelEn: "Tape" },
  { id: "ren", label: "人间", labelEn: "Life" },
  { id: "abs", label: "抽象", labelEn: "Abstract" },
] as const;

export type PackId = (typeof PACKS)[number]["id"];

export const WISHES = [
  { id: "double", pack: "pan", label: "股票翻倍", labelEn: "Double it", roast: "贪一点才像许愿。", roastEn: "If it isn't greedy, it isn't a wish.", stamp: "待翻", stampEn: "Pending" },
  { id: "limitup", pack: "pan", label: "明天涨停", labelEn: "Limit-up tomorrow", roast: "今晚先别刷新行情。", roastEn: "Don't refresh tonight.", stamp: "待封", stampEn: "Pending" },
  { id: "huiben", pack: "pan", label: "被套三年今日回本", labelEn: "Back to even today", roast: "套久了，神也看不下去。", roastEn: "Even the god is tired of this hold.", stamp: "回本", stampEn: "Even" },
  { id: "sixk", pack: "pan", label: "大A站上六千", labelEn: "A-shares at 6000", roast: "点位许愿，自古有之。", roastEn: "Picking a number is an old religion.", stamp: "冲锋", stampEn: "Charge" },
  { id: "dahai", pack: "pan", label: "美股是大海", labelEn: "The US is the ocean", roast: "池塘在这边。海在那边。", roastEn: "This side is a pond.", stamp: "出海", stampEn: "Sail" },
  { id: "kongcang", pack: "pan", label: "空仓的人后悔", labelEn: "May the flat regret it", roast: "踏空也是一种修行。", roastEn: "Missing the move is a practice too.", stamp: "满仓", stampEn: "Full" },
  { id: "zhuli", pack: "pan", label: "主力连夜来接", labelEn: "Someone catch this overnight", roast: "接你的人，今晚加班。", roastEn: "Whoever catches you works nights.", stamp: "待接", stampEn: "Waiting" },
  { id: "hongpan", pack: "pan", label: "下周红盘开门", labelEn: "Open green next week", roast: "先把周一活过去。", roastEn: "Survive Monday first.", stamp: "开门红", stampEn: "Open" },
  { id: "bonus", pack: "ren", label: "年终奖翻倍", labelEn: "Double the bonus", roast: "公司许不了，图腾许。", roastEn: "Work won't. The totem will.", stamp: "待发", stampEn: "Pending" },
  { id: "reply", pack: "ren", label: "暗恋回消息", labelEn: "They text back", roast: "回一个字就算灵。", roastEn: "One word counts.", stamp: "待回", stampEn: "Waiting" },
  { id: "exam", pack: "ren", label: "考试过了", labelEn: "Pass the exam", roast: "过了再来谢牛。", roastEn: "Pass first. Thank the cow later.", stamp: "待出分", stampEn: "Pending" },
  { id: "offer", pack: "ren", label: "offer 来一个", labelEn: "One offer", roast: "一个就够，别贪。", roastEn: "One is enough.", stamp: "待发", stampEn: "Pending" },
  { id: "rent", pack: "ren", label: "房租别再涨", labelEn: "Rent stops here", roast: "房东听不见，牛听得见。", roastEn: "The landlord can't hear. The cow can.", stamp: "冻住", stampEn: "Frozen" },
  { id: "tijian", pack: "ren", label: "体检全绿", labelEn: "Clean checkup", roast: "先把单子翻过来。", roastEn: "Turn the report over first.", stamp: "待查", stampEn: "Pending" },
  { id: "client", pack: "ren", label: "甲方不改需求", labelEn: "The client freezes the spec", roast: "此愿难度高于涨停。", roastEn: "Harder than a limit-up.", stamp: "奇迹", stampEn: "Miracle" },
  { id: "marry", pack: "ren", label: "我想和金主训结婚", labelEn: "Marry Juhoon", roast: "神不包办。编号可以。", roastEn: "The god doesn't arrange it. It numbers you.", stamp: "待嫁", stampEn: "Pending" },
  { id: "caitou", pack: "abs", label: "图个彩头", labelEn: "Just for luck", roast: "抽象的愿，抽象地灵。", roastEn: "Weird wish. Weird luck.", stamp: "已登记", stampEn: "In" },
  { id: "cuzao", pack: "abs", label: "建模越糙越灵", labelEn: "The cruder, the holier", roast: "精致的神不接散户。", roastEn: "A polished god doesn't take retail.", stamp: "糙灵", stampEn: "Crude" },
  { id: "bandao", pack: "abs", label: "绊倒也能涨", labelEn: "Even a trip can rise", roast: "倒了就倒了，站起来还是牛。", roastEn: "Fell. Stood. Still a bull.", stamp: "再起", stampEn: "Again" },
  { id: "yingyuan", pack: "abs", label: "先许一个再进影院", labelEn: "Wish, then the movie", roast: "票是香火，愿是彩头。", roastEn: "The ticket is incense.", stamp: "已购", stampEn: "In" },
] as const;

export type WishId = (typeof WISHES)[number]["id"];

export const COW_TYPES = [
  { id: "huitou", name: "跌停回封牛", nameEn: "Rebound Bull", line: "被砸过，还在盘里。", lineEn: "Got smashed. Still in." },
  { id: "hengpan", name: "横盘蓄势牛", nameEn: "Range Bull", line: "不急。草会长。", lineEn: "No rush. Grass grows." },
  { id: "bandao", name: "绊倒再起牛", nameEn: "Trip Bull", line: "倒了就倒了，站起来还是牛。", lineEn: "Fell. Stood. Still a bull." },
  { id: "fanchu", name: "躺平反刍牛", nameEn: "Flat Bull", line: "先吃草。行情自己来。", lineEn: "Eat grass. The tape will come." },
  { id: "tuomeng", name: "美牛牛", nameEn: "Mei Niu Niu", line: "A股是池塘。那边才是海。", lineEn: "A-shares are a pond. That's the ocean." },
  { id: "weiguan", name: "路边围观牛", nameEn: "Spectator", line: "先看看别人许的。", lineEn: "Watch the others first." },
  { id: "langqun", name: "硬刚狼群牛", nameEn: "Never-Sell", line: "回撤来了也不让。", lineEn: "The dip came. You didn't leave." },
  { id: "tuodi", name: "托底加仓牛", nameEn: "Knife Catcher", line: "有人在后面托着。", lineEn: "Someone's catching this. Maybe you." },
  { id: "dazi", name: "搭子同行牛", nameEn: "Buddy Bull", line: "谁跟你一起走，比点位重要。", lineEn: "Who walks with you beats the number." },
  { id: "dandang", name: "梦醒担当牛", nameEn: "Clock-In Bull", line: "许完愿就开始干活。", lineEn: "Wish. Then go to work." },
  { id: "zhexue", name: "抽象哲学牛", nameEn: "Abstract Bull", line: "每一帧都像后现代。", lineEn: "Every frame looks like a joke." },
  { id: "liuqian", name: "冲锋点位牛", nameEn: "Six-Thousand", line: "点位许了，人就踏实了。", lineEn: "Name a number. Then breathe." },
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

export function wishLabelOf(id: string, locale: string) {
  const w = wishById(id);
  return locale === "en" ? w.labelEn : w.label;
}

export function wishRoastOf(id: string, locale: string) {
  const w = wishById(id);
  return locale === "en" ? w.roastEn : w.roast;
}

export function wishStampOf(id: string, locale: string) {
  const w = wishById(id);
  return locale === "en" ? w.stampEn : w.stamp;
}

export function cowNameOf(id: string, locale: string) {
  const c = cowTypeById(id);
  return locale === "en" ? c.nameEn : c.name;
}

export function cowLineOf(id: string, locale: string) {
  const c = cowTypeById(id);
  return locale === "en" ? c.lineEn : c.line;
}

export function packLabelOf(id: string, locale: string) {
  const p = PACKS.find((x) => x.id === id) ?? PACKS[0];
  return locale === "en" ? p.labelEn : p.label;
}

export function pickCowType(seed: string, wishId: string): CowTypeId {
  let h = 0;
  const s = `${seed}:${wishId}`;
  for (let i = 0; i < s.length; i += 1) h = (h * 33 + s.charCodeAt(i)) >>> 0;
  return COW_TYPES[h % COW_TYPES.length].id;
}

export function luckyMark(serial: number, locale = "zh"): string | null {
  const s = String(serial);
  const en = locale === "en";
  if (serial % 10000 === 0) return en ? "10k" : "万号";
  if (serial % 1000 === 0) return en ? "Round thousand" : "整千";
  if (/^(\d)\1+$/.test(s)) return en ? "Repeater" : "豹子";
  if (s === [...s].reverse().join("") && s.length >= 4) return en ? "Palindrome" : "回文";
  if (s.includes("888")) return en ? "888" : "发发发";
  if (s.endsWith("88")) return en ? "88" : "发发";
  if (s.endsWith("68")) return en ? "68" : "顺发";
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
  marry: "reply",
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
  { who: "散户甲", whoEn: "Retail A", line: "股民对这两个字有天然的向往。", lineEn: "Traders were born wanting these two words." },
  { who: "上海股民", whoEn: "Shanghai", line: "希望大A冲上六千。看个乐子，也算香火。", lineEn: "Hope A-shares hit 6000. A joke still counts as incense." },
  { who: "猫眼留言", whoEn: "Maoyan", line: "烂到极致必须尝尝咸淡。顺便许一个。", lineEn: "That bad, you have to taste it. File one while you're here." },
  { who: "路过的豹", whoEn: "Leopard", line: "先装饿。再许翻倍。", lineEn: "Play hungry. Then file a double." },
  { who: "云雀", whoEn: "Lark", line: "我只负责看着。贪不贪，看你们自己。", lineEn: "I just watch. Greed is on you." },
  { who: "韩网截图", whoEn: "KR shot", line: "这只绊倒的黄牛，被当成半导体老祖了。", lineEn: "This tripped yellow calf got taken for a chip ancestor." },
  { who: "影厅", whoEn: "Cinema", line: "有一个人晒单，群里就控制不住。", lineEn: "One person posts a slip. The group can't stop." },
  { who: "无名氏", whoEn: "Anon", line: "牛来不赐福。牛来给你编号。", lineEn: "Niulai doesn't bless. It numbers you." },
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
  { nickname: "Coer", wishId: "marry" },
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
