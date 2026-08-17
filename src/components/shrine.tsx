import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { TotemStage } from "@/components/totem-dress";
import { loadBooklet } from "@/lib/booklet";
import { equippedList, loadFits, type FitId } from "@/lib/fits";
import { addBow, loadSeals, markReturn, type SealState } from "@/lib/seals";
import { TYPES } from "@/lib/nbti";
import { incenseLine, touchIncense, type Incense } from "@/lib/incense";
import { addGongde, loadGongde } from "@/lib/gongde";
import { drawLot } from "@/lib/lots";

type ShrineProps = {
  serial: number;
  fire: number;
  todayLabel: string;
  flashing?: boolean;
  receiving?: boolean;
  onOffer: () => void;
};

export function Shrine({
  serial,
  fire,
  todayLabel,
  flashing,
  receiving,
  onOffer,
}: ShrineProps) {
  const [src, setSrc] = useState("/art/totem-god.jpg");
  const [mine, setMine] = useState<string | null>(null);
  const [seals, setSeals] = useState<SealState>({ bows: 0, earned: {} });
  const [bowing, setBowing] = useState(false);
  const [said, setSaid] = useState("点神像，磕一个");
  const [gongde, setGongde] = useState(0);
  const [incense, setIncense] = useState<Incense>({ last: "", streak: 0, best: 0 });
  const [fits, setFits] = useState<FitId[]>([]);

  useEffect(() => {
    const b = loadBooklet();
    if (b.nbti) {
      const live = TYPES[b.nbti.letters]?.name.zh;
      setMine(`${live ?? b.nbti.name} · ${b.nbti.letters}`);
    }
    setSeals(markReturn());
    setIncense(touchIncense());
    setGongde(loadGongde());
    setFits(equippedList(loadFits()).map((f) => f.id));
  }, []);

  useEffect(() => {
    if (!receiving) {
      setSrc("/art/totem-god.jpg");
      return;
    }
    setSrc("/art/totem-bow.jpg");
    const tmr = window.setTimeout(() => setSrc("/art/totem-god.jpg"), 1100);
    return () => window.clearTimeout(tmr);
  }, [receiving]);

  function kowtow() {
    if (bowing) return;
    setBowing(true);
    setSrc("/art/totem-bow.jpg");
    const next = addBow();
    setSeals(next);
    const gd = addGongde(1);
    setGongde(gd);
    const dream = drawLot(Date.now() + next.bows * 17);
    const line =
      next.bows === 8
        ? "八叩。章来了。"
        : next.bows === 88
          ? "门徒。这尊神认你。"
          : `【${dream.rank}】${dream.line}`;
    setSaid(line);
    window.setTimeout(() => {
      setSrc("/art/totem-god.jpg");
      setBowing(false);
    }, 900);
  }

  return (
    <section className="relative isolate flex min-h-dvh flex-col items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/art/grass.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/35 via-ink/10 to-ink/88" />

      <div className="relative z-10 flex w-full max-w-lg flex-1 flex-col items-center px-4 pb-6 pt-16 sm:pt-20">
        <h1 className="font-display text-3xl tracking-widest text-paper">测你是哪种牛</h1>

        <button
          type="button"
          onClick={kowtow}
          className={`relative mt-2 w-full max-w-sm border-0 bg-transparent p-0 ${bowing || receiving ? "totem-bow" : ""}`}
          aria-label="向神叩首"
        >
          <span
            className="halo-ring pointer-events-none absolute left-1/2 top-[38%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-halo/50 blur-2xl sm:h-56 sm:w-56"
            aria-hidden
          />
          <TotemStage src={src} on={fits} className="relative z-10 mx-auto w-[min(52vw,240px)]">
            <Incense />
          </TotemStage>
        </button>
        <p className="mt-1 font-brush text-gold-soft">{said}</p>

        <p
          className={`mt-1 font-display text-5xl tabular-nums leading-none text-cow sm:text-6xl ${flashing ? "number-flash" : ""}`}
        >
          {serial.toLocaleString("zh-CN")}
          <span className="ml-1 font-brush text-xl text-gold-soft">号</span>
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {["核动力", "美牛牛", "牛跃亭"].map((n) => (
            <span
              key={n}
              className="rounded-sm border border-cow/70 px-2.5 py-1 font-display text-sm tracking-widest text-cow"
            >
              {n}
            </span>
          ))}
        </div>
        {mine ? <p className="mt-2 font-display text-sm text-cow">{mine}</p> : null}

        <Link
          to="/ce"
          className="mt-4 flex min-h-12 w-full max-w-xs items-center justify-center rounded-sm bg-cinnabar font-display text-xl tracking-widest text-paper no-underline"
        >
          开测
        </Link>
        <div className="mt-2 grid w-full max-w-xs grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onOffer}
            className="min-h-11 rounded-sm bg-paper font-display tracking-widest text-ink"
          >
            许一个
          </button>
          <Link
            to="/qian"
            className="flex min-h-11 items-center justify-center rounded-sm bg-wood font-display tracking-widest text-paper no-underline"
          >
            抽一支
          </Link>
        </div>
        <p className="mt-3 text-center text-xs text-gold-soft/80">
          今日 · {todayLabel} · 已叩 {seals.bows}
        </p>
        <p className="mt-1 text-center text-xs text-gold-soft">{incenseLine(incense)}</p>
      </div>
    </section>
  );
}

function Incense() {
  return (
    <div className="pointer-events-none absolute bottom-[8%] left-1/2 flex -translate-x-1/2 gap-6" aria-hidden>
      <span className="smoke-wisp h-16 w-1 rounded-full bg-paper/30" />
      <span className="smoke-wisp h-20 w-1 rounded-full bg-paper/25 [animation-delay:0.6s]" />
      <span className="smoke-wisp h-14 w-1 rounded-full bg-paper/20 [animation-delay:1.1s]" />
    </div>
  );
}
