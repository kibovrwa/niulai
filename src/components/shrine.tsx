import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SealRow } from "@/components/seals";
import { TotemStage } from "@/components/totem-dress";
import { t, useLocale } from "@/lib/i18n";
import { loadBooklet } from "@/lib/booklet";
import { equippedList, loadFits, type FitId } from "@/lib/fits";
import { addBow, loadSeals, markReturn, type SealState } from "@/lib/seals";
import { addGongde, loadGongde, rankOf } from "@/lib/gongde";
import { drawLot } from "@/lib/lots";
import { homeShare } from "@/lib/share";
import { ShareBar } from "@/components/share-bar";

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
  const locale = useLocale((s) => s.locale);
  const [src, setSrc] = useState("/art/totem-god.jpg");
  const [mine, setMine] = useState<string | null>(null);
  const [seals, setSeals] = useState<SealState>({ bows: 0, earned: {} });
  const [bowing, setBowing] = useState(false);
  const [said, setSaid] = useState("点神像，磕一个");
  const [gongde, setGongde] = useState(0);
  const [fits, setFits] = useState<FitId[]>([]);

  useEffect(() => {
    const b = loadBooklet();
    if (b.nbti) setMine(`${b.nbti.name} · ${b.nbti.letters}`);
    setSeals(markReturn());
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

      <div className="relative z-10 flex w-full max-w-lg flex-1 flex-col items-center px-4 pb-8 pt-20 sm:pt-24">
        <p className="font-brush text-lg text-gold-soft">磕一个</p>
        <h1 className="mt-1 font-display text-5xl tracking-[0.35em] text-paper sm:text-6xl">
          牛来
        </h1>
        <p className="mt-2 text-center text-sm text-paper/80">{t(locale, "tagline")}</p>

        <button
          type="button"
          onClick={kowtow}
          className={`relative mt-4 w-full max-w-sm border-0 bg-transparent p-0 ${bowing || receiving ? "totem-bow" : ""}`}
          aria-label="向神叩首"
        >
          <span
            className="halo-ring pointer-events-none absolute left-1/2 top-[38%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-halo/50 blur-2xl sm:h-64 sm:w-64"
            aria-hidden
          />
          <TotemStage src={src} on={fits} className="relative z-10 mx-auto w-[min(78vw,360px)]">
            <Incense />
          </TotemStage>
        </button>
        <p className="mt-2 font-brush text-gold-soft">{said}</p>

        <div className="mt-2 text-center">
          <p className="text-[11px] tracking-[0.35em] text-muted">已登记到</p>
          <p
            className={`font-display text-6xl tabular-nums leading-none text-cow sm:text-7xl ${flashing ? "number-flash" : ""}`}
          >
            {serial.toLocaleString("zh-CN")}
          </p>
          <p className="mt-1 font-brush text-xl text-gold-soft">号</p>
          <p className="mt-2 text-xs tracking-widest text-gold-soft/80">
            功德 {gongde} · {rankOf(gongde).name} · 已叩 {seals.bows} · 香火 {fire.toLocaleString("zh-CN")}
          </p>
        </div>

        {mine ? (
          <p className="mt-3 text-center font-display text-sm text-cow">{mine} · 还在</p>
        ) : null}

        <div className="mt-4 w-full max-w-sm">
          <SealRow state={seals} compact />
        </div>

        <p className="mt-4 text-center text-sm text-paper/80">今日神谕 · {todayLabel}</p>

        <div className="mt-5 grid w-full max-w-xs grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onOffer}
            className="min-h-12 rounded-sm bg-cinnabar font-display tracking-widest text-paper"
          >
            挂号
          </button>
          <Link
            to="/ce"
            className="flex min-h-12 items-center justify-center rounded-sm bg-paper font-display tracking-widest text-ink no-underline"
          >
            测相
          </Link>
          <Link
            to="/qian"
            className="flex min-h-12 items-center justify-center rounded-sm bg-wood font-display tracking-widest text-paper no-underline"
          >
            抽签
          </Link>
        </div>
        <div className="mt-5 w-full max-w-xs">
          <ShareBar payload={homeShare()} hideSlip />
        </div>
        <p className="mt-2 flex gap-4 text-xs text-gold-soft">
          <Link to="/yi">给神上供</Link>
          <Link to="/pai">香牌 · {rankOf(gongde).name}</Link>
        </p>
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
