import type { WishId } from "@/lib/wish-data";

export const QUESTIONS = [
  {
    id: "loss",
    q: { zh: "事情砸了的第一夜，你？", en: "The night it went wrong — you?" },
    opts: [
      { id: "a", t: { zh: "翻来覆去，想是谁害的", en: "Stay up. Blame someone." }, g: 1, m: 1, c: 0, l: 1 },
      { id: "b", t: { zh: "睡了。反正已经这样了", en: "Sleep. It's already gone." }, g: 0, m: 0, c: 1, l: 0 },
      { id: "c", t: { zh: "再压一把。它必须回来", en: "Double down. It has to come back." }, g: 2, m: 2, c: 0, l: 2 },
      { id: "d", t: { zh: "发条消息，求一句安慰", en: "Send a text. Need a hug." }, g: 0, m: 1, c: 2, l: 1 },
    ],
  },
  {
    id: "pos",
    q: { zh: "你现在的日子，更像？", en: "Your days look like?" },
    opts: [
      { id: "a", t: { zh: "满得睡不着", en: "Maxed. Can't sleep." }, g: 1, m: 2, c: 0, l: 1 },
      { id: "b", t: { zh: "空得心慌", en: "Empty. Heart racing." }, g: 1, m: 0, c: 0, l: 1 },
      { id: "c", t: { zh: "撑着，装镇定", en: "Holding. Faking calm." }, g: 0, m: 1, c: 0, l: 0 },
      { id: "d", t: { zh: "躺平。草比人旺", en: "Lie flat. The grass is winning." }, g: 0, m: 0, c: 2, l: 0 },
    ],
  },
  {
    id: "what",
    q: { zh: "你觉得牛来到底是什么？", en: "What is Niulai, really?" },
    opts: [
      { id: "a", t: { zh: "神。认真的", en: "A god. I mean it." }, g: 0, m: 0, c: 2, l: 2 },
      { id: "b", t: { zh: "一部很糙的电影", en: "A janky movie." }, g: 0, m: 0, c: 2, l: 0 },
      { id: "c", t: { zh: "一个盼头，一个数字", en: "A hope. A number." }, g: 2, m: 1, c: 0, l: 2 },
      { id: "d", t: { zh: "一种传染病", en: "It's catching." }, g: 1, m: 1, c: 1, l: 1 },
    ],
  },
  {
    id: "flex",
    q: { zh: "朋友晒赢了，你？", en: "Someone posts a win. You?" },
    opts: [
      { id: "a", t: { zh: "点赞。手在抖", en: "Like it. Hands shaking." }, g: 0, m: 1, c: 0, l: 1 },
      { id: "b", t: { zh: "回一句「牛」。关掉", en: "Type “nice.” Close it." }, g: 0, m: 0, c: 1, l: 0 },
      { id: "c", t: { zh: "翻自己口袋，确认还活着", en: "Check your own pocket." }, g: 1, m: 2, c: 0, l: 1 },
      { id: "d", t: { zh: "决定明天也去搏一把", en: "Tomorrow you try too." }, g: 2, m: 1, c: 1, l: 2 },
    ],
  },
  {
    id: "fall",
    q: { zh: "概念神要是绊倒了？", en: "If the god trips?" },
    opts: [
      { id: "a", t: { zh: "笑出声，先截图", en: "Laugh. Screenshot." }, g: 0, m: 0, c: 2, l: 1 },
      { id: "b", t: { zh: "跟着一起倒", en: "Fall with it." }, g: 1, m: 1, c: 2, l: 0 },
      { id: "c", t: { zh: "把它扶起来，当自己没倒过", en: "Help it up. Never happened." }, g: 0, m: 2, c: 0, l: 1 },
      { id: "d", t: { zh: "倒了才像真的。更信了", en: "The fall made it real." }, g: 2, m: 1, c: 2, l: 2 },
    ],
  },
  {
    id: "pick",
    q: { zh: "暗恋回消息，和突然发财，先要哪个？", en: "They text back, or a sudden fortune?" },
    opts: [
      { id: "a", t: { zh: "发财。人可以再找", en: "The money. People can wait." }, g: 2, m: 2, c: 0, l: 1 },
      { id: "b", t: { zh: "回消息。钱可以再等", en: "The text. Money can wait." }, g: 0, m: 0, c: 1, l: 1 },
      { id: "c", t: { zh: "都要。我贪", en: "Both. I'm greedy." }, g: 2, m: 1, c: 1, l: 2 },
      { id: "d", t: { zh: "都是幻觉，但我两个都想", en: "Both fake. Want both." }, g: 1, m: 0, c: 2, l: 0 },
    ],
  },
  {
    id: "come",
    q: { zh: "要是好运真的来了，你第一件事？", en: "If the luck actually shows?" },
    opts: [
      { id: "a", t: { zh: "加码。来都来了", en: "Double down. We're already here." }, g: 2, m: 2, c: 0, l: 2 },
      { id: "b", t: { zh: "先收一半。怕它走", en: "Take half. It might leave." }, g: 0, m: 1, c: 0, l: 0 },
      { id: "c", t: { zh: "去把《牛来》再看一遍", en: "Rewatch the movie." }, g: 0, m: 0, c: 2, l: 2 },
      { id: "d", t: { zh: "不信。再等等", en: "Don't buy it. Wait." }, g: 0, m: 0, c: 1, l: 0 },
    ],
  },
  {
    id: "why",
    q: { zh: "你来测这套，其实是？", en: "You opened this because?" },
    opts: [
      { id: "a", t: { zh: "我要一个能晒的结果", en: "I want something to post." }, g: 2, m: 1, c: 0, l: 2 },
      { id: "b", t: { zh: "我要看自己有多贪", en: "To see how greedy I am." }, g: 1, m: 1, c: 1, l: 1 },
      { id: "c", t: { zh: "朋友甩过来的，我跟", en: "A friend sent it. I followed." }, g: 0, m: 0, c: 1, l: 1 },
      { id: "d", t: { zh: "概念神托梦喊我来的", en: "The god showed up in a dream." }, g: 1, m: 0, c: 2, l: 2 },
    ],
  },
] as const;

export type AnswerMap = Record<string, string>;

type Line = { zh: string; en: string };

type TypeCard = {
  name: Line;
  line: Line;
  punch: Line;
  verdict: Line;
  rec: WishId;
  read: { face: Line; die: Line; live: Line; yes: Line; no: Line; mouth: Line };
};

/** One line a non-trader can get. Shown under the type name. */
export const PLAIN: Record<string, Line> = {
  GMCL: { zh: "盯着一个数，不到不睡。", en: "A number. You won't sleep till it hits." },
  GMCD: { zh: "陷进去了，假装没这回事。", en: "Stuck. Pretending it isn't happening." },
  GMXL: { zh: "别人收工，你才开工。", en: "They clock out. You clock in." },
  GMXD: { zh: "弯不弯无所谓，抽象就完了。", en: "Bent or not. Abstract is the point." },
  GKCL: { zh: "没上车，眼红。", en: "Missed it. Jealous." },
  GKCD: { zh: "先冲。理由后面再说。", en: "Launch first. Reasons later." },
  GKXL: { zh: "先问为什么，再动手。", en: "Ask why. Then move." },
  GKXD: { zh: "该冲的时候没冲。", en: "Never charged when it counted." },
  SMCL: { zh: "先织网，再等人来。", en: "Spin the web. Wait." },
  SMCD: { zh: "不当普通人，要当王。", en: "Not retail. The king." },
  SMXL: { zh: "没人赐，自己加班。", en: "No blessing. You overtime." },
  SMXD: { zh: "不是拿着，是放不下。", en: "Not holding. Can't let go." },
  SKCL: { zh: "倒了，还是牛。", en: "Fell. Still a bull." },
  SKCD: { zh: "我先走。你们继续耗。", en: "I leave. You stay in it." },
  SKXL: { zh: "节奏慢，但还在跳。", en: "Slow. Still dancing." },
  SKXD: { zh: "开一天，谢一天。", en: "Bloom a day. Fold a day." },
  NLBN: { zh: "隐藏款。就是它本人。", en: "Hidden. The original." },
};

export const TYPES: Record<string, TypeCard> = {
  GMCL: {
    name: { zh: "六千牛", en: "Six-Thousand" },
    line: { zh: "点位许了，人就踏实了。", en: "Name a level, then breathe." },
    punch: { zh: "六千不到，我不睡。", en: "No 6000, no sleep." },
    verdict: { zh: "神批：分析是烟。你跪的是一个整数。", en: "You kneel to an integer." },
    rec: "sixk",
    read: {
      face: { zh: "眼里有一根线。线不到，觉不睡。", en: "A line lives in your eye." },
      die: { zh: "死在「就差二十个点」。", en: "Die twenty points short." },
      live: { zh: "给自己一座庙，庙址叫点位。", en: "Your temple is a price." },
      yes: { zh: "许大A站上六千。许完去干活。", en: "File 6000. Then work." },
      no: { zh: "别在群里解释为什么还没到。", en: "Don't explain the miss." },
      mouth: { zh: "你不是看多。你是信教。", en: "Not bullish. Devout." },
    },
  },
  GMCD: {
    name: { zh: "套死牛", en: "Bagged Bull" },
    line: { zh: "仓位比人先睡着。", en: "The position fell asleep first." },
    punch: { zh: "满了。当它没开盘。", en: "Full. Market's closed. For me." },
    verdict: { zh: "神批：这不叫淡定，叫不敢看。", en: "Not calm. Won't look." },
    rec: "limitup",
    read: {
      face: { zh: "脸色很稳。手机倒扣。", en: "Calm face. Phone face-down." },
      die: { zh: "死在「我没看，当它没跌」。", en: "Die by not looking." },
      live: { zh: "用睡觉代替止损。", en: "Sleep instead of stop-loss." },
      yes: { zh: "许明天涨停。许完还是别看。", en: "File a limit-up. Still don't look." },
      no: { zh: "别半夜起来确认还活着。", en: "Don't check at 2am." },
      mouth: { zh: "仓位比你先躺平。", en: "Your position lay down first." },
    },
  },
  GMXL: {
    name: { zh: "美牛牛", en: "Mei Niu Niu" },
    line: { zh: "A股是池塘。那边才是海。", en: "A-shares are a pond. That's the ocean." },
    punch: { zh: "我的白天，是别人的收盘。", en: "My morning is their close." },
    verdict: { zh: "神批：海会涨。你会失眠。两件事都真。", en: "The ocean rises. You don't sleep. Both true." },
    rec: "dahai",
    read: {
      face: { zh: "黑眼圈是时差。自信是纳指。", en: "Circles from the time zone. Faith from the Nasdaq." },
      die: { zh: "死在「大海回调都是上车」。一回调，你加到没现金。", en: "Die buying every dip in the ocean." },
      live: { zh: "夜里给美股当牛，白天给公司当牛。双核。", en: "US mule at night. Office mule by day." },
      yes: { zh: "许股票翻倍。许的是那边，不是这边。", en: "File a double. Their market, not this one." },
      no: { zh: "别在早会上用纳指教育同事。", en: "Don't lecture the standup with the Nasdaq." },
      mouth: { zh: "大海是真的。你的觉，也是真的没了。", en: "The ocean is real. So is your missing sleep." },
    },
  },
  GMXD: {
    name: { zh: "gay里gay牛", en: "Gay-Gay Cow" },
    line: { zh: "盘花。人更花。", en: "The tape is extra. So are you." },
    punch: { zh: "我不是弯。我是抽象。", en: "Not bent. Abstract." },
    verdict: { zh: "神批：你来证明世界配得上这么糙的神。证明完，手还是伸向涨跌。", en: "You came for the joke. Stayed for the tape." },
    rec: "cuzao",
    read: {
      face: { zh: "说话像影评。账户像赌局。", en: "Talks like a critic. Trades like a bet." },
      die: { zh: "死在「我是来体验的」。体验到腰斩。", en: "Die of 'just experiencing it'." },
      live: { zh: "把亏钱讲成美学，讲完还是会刷新。", en: "You aestheticize the loss. Then refresh." },
      yes: { zh: "许建模越糙越灵。这句配你。", en: "File: the cruder, the holier." },
      no: { zh: "别用哲学给亏损写闭幕词。", en: "Don't write philosophy over a red P&L." },
      mouth: { zh: "后现代看完了。涨跌还在。", en: "Postmodernism ended. The tape didn't." },
    },
  },
  GKCL: {
    name: { zh: "踏空牛", en: "Sideline Bull" },
    line: { zh: "空着。看着别人赚。手在抖。", en: "Flat. Watching others win." },
    punch: { zh: "我不是怕亏。我是眼红。", en: "Not fear. Envy." },
    verdict: { zh: "神批：空仓的人香火最急。", en: "The flat pray hardest." },
    rec: "kongcang",
    read: {
      face: { zh: "嘴上「等回调」。眼里全是别人的截图。", en: "You say wait for a dip. You stare at screenshots." },
      die: { zh: "死在踏空，不死在回撤。", en: "You die of missing it, not of drawdown." },
      live: { zh: "等一句「我没上车是对的」。那句永远不来。", en: "Waiting to be right about not boarding." },
      yes: { zh: "许空仓的人后悔。你许的是自己。", en: "File: may the flat regret. That's you." },
      no: { zh: "别在涨的时候教育还没买的人。", en: "Don't lecture the ones still flat." },
      mouth: { zh: "你不是谨慎。你是嫉妒穿了马甲。", en: "Not cautious. Jealous in a vest." },
    },
  },
  GKCD: {
    name: { zh: "牛斯克", en: "Niusk" },
    line: { zh: "推特先于开盘。", en: "Tweet first. Tape later." },
    punch: { zh: "我先发射。仓自己会来。", en: "Launch first. The book will follow." },
    verdict: { zh: "神批：发射完再看仓，仓自己会说话。", en: "Launch first. The book talks later." },
    rec: "caitou",
    read: {
      face: { zh: "嘴里在发射。手里在刷盘。", en: "Mouth launching. Thumb on the tape." },
      die: { zh: "死在「先发一条」。发完仓没动。", en: "Die of a tweet. No fill." },
      live: { zh: "把愿景当持仓。愿景比仓大。", en: "The vision is bigger than the book." },
      yes: { zh: "许股票翻倍。许的是那边那只。", en: "File a double. Their ticker." },
      no: { zh: "别用发射代替下单。", en: "A launch is not a fill." },
      mouth: { zh: "推比盘快。亏也比盘快。", en: "Tweets beat the tape. So do losses." },
    },
  },
  GKXL: {
    name: { zh: "牛鼻子老道", en: "Ox-Nose Daoist" },
    line: { zh: "先烧柱香。点位以后说。", en: "Incense first. Levels later." },
    punch: { zh: "我先问道。再开盘。", en: "Ask the dao. Then the tape." },
    verdict: { zh: "神批：这尊神就是你下周的门票。", en: "This god is next week's ticket." },
    rec: "caitou",
    read: {
      face: { zh: "做事之前先求个响。响了才迈步。", en: "A sound before a step." },
      die: { zh: "死在彩头灵了，人还没准备好。", en: "The omen lands. You aren't ready." },
      live: { zh: "把运气当入场券。券有了，戏还得自己演。", en: "Luck is a ticket. You still act." },
      yes: { zh: "许图个彩头。许完去买票，或去开盘。", en: "File the omen. Then go." },
      no: { zh: "别把彩头当成已经赚到的钱。", en: "An omen is not P&L." },
      mouth: { zh: "你不是迷信。你是需要一个开始。", en: "Not superstitious. You need a start." },
    },
  },
  GKXD: {
    name: { zh: "大阉牛", en: "Capon Cow" },
    line: { zh: "该顶的没顶。草倒是吃了。", en: "Didn't charge. Ate the grass." },
    punch: { zh: "该顶的没顶。", en: "Never charged." },
    verdict: { zh: "神批：像修行，也像拖。", en: "Looks like zen. Also delay." },
    rec: "bandao",
    read: {
      face: { zh: "肩是松的。刷新是勤的。", en: "Loose shoulders. Busy thumb." },
      die: { zh: "死在「再等等它自己来」。等到别人都走了。", en: "Die waiting for it to arrive." },
      live: { zh: "用躺平掩盖不敢下单。草吃了很多。", en: "Lying flat hides the unclicked buy." },
      yes: { zh: "许绊倒也能涨。倒着等，也算一种等。", en: "File: even a fall can rise." },
      no: { zh: "别把不动说成智慧。", en: "Stillness isn't always wisdom." },
      mouth: { zh: "牛来不等人躺平。", en: "The bull doesn't wait for you to lie down." },
    },
  },
  SMCL: {
    name: { zh: "牛蛛侠", en: "Cow-Spidey" },
    line: { zh: "吊着就不算跌。", en: "Hanging is not falling." },
    punch: { zh: "我先吐丝。再接盘。", en: "Web first. Then catch." },
    verdict: { zh: "神批：勋章和套牢通知，同一天到。", en: "Medal and bag, same day." },
    rec: "zhuli",
    read: {
      face: { zh: "跌的时候你最忙。", en: "Busiest on red days." },
      die: { zh: "死在「我来给大家托一下」。", en: "Die catching it for the group." },
      live: { zh: "把加仓当救人。救的是自己的成本。", en: "Adding is rescue. You're rescuing cost." },
      yes: { zh: "许主力连夜来接。你许完，自己先别接。", en: "File for a bid. Don't be the bid." },
      no: { zh: "别在群里说「我托住了」。", en: "Don't announce you caught it." },
      mouth: { zh: "刀掉下来，不是叫你用手接。", en: "A falling knife is not a handshake." },
    },
  },
  SMCD: {
    name: { zh: "牛魔王", en: "Demon King" },
    line: { zh: "这盘得给我跪下。", en: "The tape should kneel." },
    punch: { zh: "我不是散户。我是王。", en: "Not a retail. The king." },
    verdict: { zh: "神批：亏过的人最难走，也最像信徒。", en: "The hurt make the best believers." },
    rec: "huiben",
    read: {
      face: { zh: "不喊疼。成本写在脸上。", en: "No cry. Cost on the face." },
      die: { zh: "死在「回本我就走」。回本那天你加仓。", en: "Die at breakeven. You add there." },
      live: { zh: "把亏损当成债权。债主是盘，盘不认。", en: "You filed a claim. The tape didn't sign." },
      yes: { zh: "许被套三年今日回本。许完，真回了就走。", en: "File a return to cost. Then leave." },
      no: { zh: "别把「我亏过」当成永久通行证。", en: "A loss is not a lifetime pass." },
      mouth: { zh: "盘不欠任何人。包括你。", en: "The tape owes no one. Including you." },
    },
  },
  SMXL: {
    name: { zh: "核动力牛", en: "Nuclear Bull" },
    line: { zh: "许完愿就开始搬。电池是假的，班是真的。", en: "File the wish. Then haul." },
    punch: { zh: "神不用赐。我会加班。", en: "No blessing. I'll overtime." },
    verdict: { zh: "神批：这种人，神少操点心。", en: "This one, the god can ignore." },
    rec: "exam",
    read: {
      face: { zh: "站不久。许完就走。", en: "Doesn't linger. Files and goes." },
      die: { zh: "几乎不死在盘上。会死在太勤快。", en: "Won't die on the tape. Might die of work." },
      live: { zh: "把神当垃圾桶。怕扔进去，人轻松。", en: "The god is a bin for fear." },
      yes: { zh: "许考试过了，或许 offer。许完去背书。", en: "File the exam. Then study." },
      no: { zh: "别许完还在庙里刷盘。", en: "Don't file and then stay refreshing." },
      mouth: { zh: "核动力不用充电。班就是燃料。", en: "Nuclear. The shift is the fuel." },
    },
  },
  SMXD: {
    name: { zh: "吸牛", en: "Suck Cow" },
    line: { zh: "仓在漏。我在吸。", en: "The book leaks. I drink." },
    punch: { zh: "我不是拿着。我是吸着。", en: "Not holding. Sucking." },
    verdict: { zh: "神批：回撤不收道德。吸也不收。", en: "Drawdown doesn't take virtue. Neither does sucking." },
    rec: "hongpan",
    read: {
      face: { zh: "牙关是紧的。账户是红的。", en: "Jaw tight. Account red." },
      die: { zh: "死在「我都拿这么久了」。", en: "Die of I've held this long." },
      live: { zh: "用时间证明自己是对的。时间不站队。", en: "Time is not on a side." },
      yes: { zh: "许下周红盘开门。许完，设一个真的卖点。", en: "File a red open. Then set an exit." },
      no: { zh: "别在亏的时候讲信仰。", en: "Don't preach while red." },
      mouth: { zh: "硬刚很帅。账单更硬。", en: "Holding looks brave. The bill is braver." },
    },
  },
  SKCL: {
    name: { zh: "绊倒牛", en: "Trip Bull" },
    line: { zh: "倒了就倒了，站起来还是牛。", en: "Fell. Stood. Still a bull." },
    punch: { zh: "倒了。还是牛。", en: "Fell. Still a bull." },
    verdict: { zh: "神批：糙，是因为摔过还敢当神。", en: "Crude, because it stood back up." },
    rec: "bandao",
    read: {
      face: { zh: "膝盖有泥。正面还是站着。", en: "Mud on the knee. Still facing forward." },
      die: { zh: "不死在摔。死在摔完不好意思再买。", en: "Not the fall. The shame after." },
      live: { zh: "把出丑当门票。门票有效。", en: "Embarrassment is a ticket. It works." },
      yes: { zh: "许绊倒也能涨。这句就是给你写的。", en: "File: even a trip can rise." },
      no: { zh: "别把摔跤剪成励志再发。摔过就行。", en: "Don't edit the fall into a speech." },
      mouth: { zh: "电影里的牛绊倒了。你也是。所以你能来。", en: "The movie cow tripped. So did you." },
    },
  },
  SKCD: {
    name: { zh: "牛跃亭", en: "Niu Yueting" },
    line: { zh: "下周回国。仓先走。", en: "Back next week. The book left first." },
    punch: { zh: "我先走。你们在粪里拿着。", en: "I leave. You hold the dung." },
    verdict: { zh: "神批：先走的人最会许愿。粪留给后来的。", en: "The one who leaves files first. The dung stays." },
    rec: "yingyuan",
    read: {
      face: { zh: "笑着说下周。人已经不在。", en: "Smiles next week. Already gone." },
      die: { zh: "不死。死的是还在拿着的人。", en: "He doesn't die. The holders do." },
      live: { zh: "把「回国」当成永久延期。", en: "Coming home is a rolling delay." },
      yes: { zh: "许下周回国。许完你自己先别走。", en: "File next week. Don't be the one who leaves." },
      no: { zh: "别替他在粪里加仓。", en: "Don't add in his dung." },
      mouth: { zh: "他先走。粪是你的。", en: "He left. The dung is yours." },
    },
  },
  SKXL: {
    name: { zh: "拖拉机牛", en: "Tractor Cow" },
    line: { zh: "开拖拉机。顶胯。仓也跟着晃。", en: "Drive the tractor. The book sways." },
    punch: { zh: "我在跳拖拉机。盘也是。", en: "Tractor dance. Tractor tape." },
    verdict: { zh: "神批：衣服是CORTIS的。腿还在犁地。", en: "CORTIS kit. Tractor legs." },
    rec: "marry",
    read: {
      face: { zh: "衣服是练舞的。腿是犁地的。", en: "Dance kit. Plough legs." },
      die: { zh: "死在「我这身能跑」。跑的是田埂。", en: "Die of I can run. You ran a field." },
      live: { zh: "慢，但是能耕。耕完还在。", en: "Slow. It ploughs. It stays." },
      yes: { zh: "许股票翻倍。许完还是一档一档往前。", en: "File a double. Then crawl a gear at a time." },
      no: { zh: "别穿着运动服骂盘慢。你也慢。", en: "Don't curse the tape in a tracksuit. You're slow too." },
      mouth: { zh: "金主训那身是真的。拖拉机也是真的。", en: "The kit is real. So is the tractor." },
    },
  },
  SKXD: {
    name: { zh: "牵牛花", en: "Morning Glory" },
    line: { zh: "开一天。谢一天。", en: "Bloom a day. Fold a day." },
    punch: { zh: "我开花。你来牵。", en: "I bloom. You pull." },
    verdict: { zh: "神批：开得最快，谢得也最快。", en: "First to bloom. First to fold." },
    rec: "caitou",
    read: {
      face: { zh: "开得很快。谢得也快。", en: "Blooms fast. Folds fast." },
      die: { zh: "死在中午。早上还在开。", en: "Dead by noon. Open at dawn." },
      live: { zh: "一天一季。明天再开一朵。", en: "One day is a season. Bloom again tomorrow." },
      yes: { zh: "许开一天也算开过。", en: "File: one day still counts." },
      no: { zh: "别把藤缠在别人仓上。", en: "Don't vine onto someone else's book." },
      mouth: { zh: "花谢了。牛还在。", en: "The flower folded. The cow stayed." },
    },
  },
  NLBN: {
    name: { zh: "牛来本牛", en: "The Original" },
    line: { zh: "不是像。是本尊。", en: "Not a likeness. The original." },
    punch: { zh: "我就是它。", en: "I am it." },
    verdict: { zh: "神批：十六型里没有这个。它自己来了。", en: "Not in the sixteen. It arrived." },
    rec: "bandao",
    read: {
      face: { zh: "脸就是神的脸。不用再找。", en: "The face is the god's face." },
      die: { zh: "不死。本尊没有死法。", en: "The original has no death." },
      live: { zh: "别人测的是像。你测出了庙。", en: "They got a likeness. You got the shrine." },
      yes: { zh: "许什么都算盖过章。号已经是你的。", en: "Any wish is already stamped." },
      no: { zh: "别解释。越解释越像假的。", en: "Don't explain. It starts to look fake." },
      mouth: { zh: "牛来见了你，也得叫一声本牛。", en: "Even the god nods." },
    },
  },
};

export const FATE: Record<string, { past: Line; now: Line }> = {
  GMCL: {
    past: { zh: "庙里守香的。一根香灭了就慌。", en: "A keeper of incense." },
    now: { zh: "守一根均线。线断了比香灭更慌。", en: "You keep a moving average." },
  },
  GMCD: {
    past: { zh: "冬眠的兽。外面打雷也不醒。", en: "A hibernating beast." },
    now: { zh: "满仓装死。雷是行情。", en: "Full. Playing dead." },
  },
  GMXL: {
    past: { zh: "渡海的船工。夜里才敢开船。", en: "A night ferryman." },
    now: { zh: "美牛牛。你的白天是别人的收盘。", en: "US Cow. Your morning is their close." },
  },
  GMXD: {
    past: { zh: "写经写歪的和尚。歪了反而成派。", en: "A monk who wrote the sutra crooked." },
    now: { zh: "gay里gay牛。把亏讲成美学。", en: "You aestheticize the loss." },
  },
  GKCL: {
    past: { zh: "没挤上船的人。岸上目送。", en: "Missed the boat." },
    now: { zh: "踏空内耗牛。岸还是那道岸。", en: "Still on the shore." },
  },
  GKCD: {
    past: { zh: "庙门口看热闹的。从不进去。", en: "Watched from the gate." },
    now: { zh: "牛斯克。发射完再看榜。", en: "Launch. Then check the board." },
  },
  GKXL: {
    past: { zh: "求签不看解。响一下就走。", en: "Drew a lot, skipped the reading." },
    now: { zh: "牛鼻子老道。响一下，算开始。", en: "An omen is a start." },
  },
  GKXD: {
    past: { zh: "吃斋的懒和尚。斋在，功课无。", en: "A lazy monk with a clean bowl." },
    now: { zh: "大阉牛。草在，单无。", en: "Grass yes. Orders no." },
  },
  SMCL: {
    past: { zh: "替人挡灾的。灾接完是自己的。", en: "Caught other people's disasters." },
    now: { zh: "牛蛛侠。丝还是热的。", en: "The web is still warm." },
  },
  SMCD: {
    past: { zh: "讨债的。债主比债还硬。", en: "A collector. The debtor was harder." },
    now: { zh: "牛魔王。盘不认这个王。", en: "The tape doesn't bow." },
  },
  SMXL: {
    past: { zh: "驿站跑腿。腿比马快。", en: "A post-station runner." },
    now: { zh: "核动力牛。班就是燃料。", en: "The shift is the fuel." },
  },
  SMXD: {
    past: { zh: "守城不肯开闸的。城在，人空。", en: "Wouldn't open the gate." },
    now: { zh: "吸牛。还在吸。", en: "Still sucking." },
  },
  SKCL: {
    past: { zh: "摔跤的角斗士。倒了观众更爱。", en: "A wrestler. The fall was the show." },
    now: { zh: "绊倒牛。倒了才像这尊神。", en: "You look like the god when you fall." },
  },
  SKCD: {
    past: { zh: "衙门盖章的。章比话真。", en: "A clerk of stamps." },
    now: { zh: "牛跃亭。先走的人，粪留给后来的。", en: "He left. The dung stayed." },
  },
  SKXL: {
    past: { zh: "结拜。酒比血浓。", en: "Sworn brothers. Wine thicker than blood." },
    now: { zh: "拖拉机牛。衣服能跑，仓在耕。", en: "Kit can run. Book ploughs." },
  },
  SKXD: {
    past: { zh: "戏园子看客。看到一半上台。", en: "An audience member who climbed onstage." },
    now: { zh: "牵牛花。开一天，谢一天。", en: "Bloom a day. Fold a day." },
  },
  NLBN: {
    past: { zh: "庙还没起的时候，它已经站在那里。", en: "It stood before the shrine." },
    now: { zh: "牛来本牛。不是像，是它。", en: "Not a likeness. It." },
  },
};

export function encodeAnswers(answers: AnswerMap) {
  return QUESTIONS.map((q) => answers[q.id] ?? "a").join("");
}

export function decodeAnswers(code: string): AnswerMap | null {
  if (!/^[abcd]{8}$/.test(code) && !/^[abcd]{6}$/.test(code)) return null;
  const out: AnswerMap = {};
  QUESTIONS.forEach((q, i) => {
    out[q.id] = /^[abcd]$/.test(code[i] ?? "") ? (code[i] as string) : "a";
  });
  return out;
}

export function typeArt(code: string, locale: "zh" | "en" = "zh") {
  return locale === "en" ? `/art/types/${code}.en.jpg` : `/art/types/${code}.jpg`;
}

export function scoreNbti(answers: AnswerMap) {
  let g = 0;
  let m = 0;
  let c = 0;
  let l = 0;
  let hash = 0;
  for (const q of QUESTIONS) {
    const pick = q.opts.find((o) => o.id === answers[q.id]) ?? q.opts[0];
    g += pick.g;
    m += pick.m;
    c += pick.c;
    l += pick.l;
    hash = (hash * 33 + pick.id.charCodeAt(0)) >>> 0;
  }
  const rare = hash % 888 === 8;
  const gCut = 5;
  const mCut = 7;
  const cCut = 8;
  const lCut = 9;
  function side(score: number, cut: number, bit: number) {
    if (score > cut) return true;
    if (score < cut) return false;
    return (hash & (1 << bit)) !== 0;
  }
  const letters = rare
    ? "NLBN"
    : `${side(g, gCut, 0) ? "G" : "S"}${side(m, mCut, 1) ? "M" : "K"}${side(c, cCut, 2) ? "C" : "X"}${side(l, lCut, 3) ? "L" : "D"}`;
  const type = TYPES[letters] ?? TYPES.SKCD;
  const fate = FATE[letters] ?? FATE.SKCD;
  const index = rare ? 8888 : 2888 + g * 210 + m * 140 + c * 80 + l * 260 + (hash % 88);
  const dec = rare ? 88 : hash % 2 === 0 ? 88 : 68;
  const beat = rare ? 99 : 68 + (hash % 29);
  const red = l >= 8 || g >= 10;
  return {
    code: letters,
    type,
    fate,
    index,
    dec,
    beat,
    red,
    raw: { g, m, c, l },
    bars: {
      greed: Math.min(100, Math.round((g / 16) * 100)),
      full: Math.min(100, Math.round((m / 16) * 100)),
      crude: Math.min(100, Math.round((c / 16) * 100)),
      come: Math.min(100, Math.round((l / 16) * 100)),
    },
  };
}

export function formatIndex(n: number, dec: number) {
  return `${n.toLocaleString("zh-CN")}.${dec}`;
}
