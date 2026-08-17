import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BlessRain } from "@/components/bless-rain";
import { CreedMark } from "@/components/creed-mark";
import { TotemStage } from "@/components/totem-dress";
import { loadBooklet } from "@/lib/booklet";
import { equippedList, loadFits, type FitId } from "@/lib/fits";
import { addBow, loadSeals, markReturn, type SealState } from "@/lib/seals";
import { TYPES } from "@/lib/nbti";
import { t, useLocale } from "@/lib/i18n";
import { claimFreeStick, incenseLine, playMama, touchIncense, type Incense } from "@/lib/incense";
import { addGongde, loadGongde } from "@/lib/gongde";
import { drawLot } from "@/lib/lots";
import type { WishId } from "@/lib/wish-data";

type ShrineProps = {
  serial: number;
  fire: number;
  todayLabel: string;
  todayId?: WishId;
  flashing?: boolean;
  receiving?: boolean;
  canRepay?: boolean;
  onOffer: (wishId?: WishId) => void;
  onRepay?: () => void;
};

export function Shrine({
  serial,
  fire,
  todayLabel,
  todayId,
  flashing,
  receiving,
  canRepay,
  onOffer,
  onRepay,
}: ShrineProps) {
  const locale = useLocale((s) => s.locale) === "en" ? "en" : "zh";
  const [src, setSrc] = useState("/art/totem-god.jpg");
  const [mine, setMine] = useState<string | null>(null);
  const [seals, setSeals] = useState<SealState>({ bows: 0, earned: {} });
  const [bowing, setBowing] = useState(false);
  const [said, setSaid] = useState("信牛来，牛市一定来");
  const [gongde, setGongde] = useState(0);
  const [incense, setIncense] = useState<Incense>({ last: "", streak: 0, best: 0, owned: [], on: "cao" });
  const [fits, setFits] = useState<FitId[]>([]);

  useEffect(() => {
    const b = loadBooklet();
    if (b.nbti) {
      const live = TYPES[b.nbti.letters]?.name.zh;
      setMine(`${live ?? b.nbti.name} · ${b.nbti.letters}`);
    }
    setSeals(markReturn());
    const next = touchIncense();
    setIncense(next);
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
    playMama();
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
          : incense.on === "mama"
            ? "麻麻。"
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
      <CreedMark tone="dark" />
      <BlessRain />

      <div className="relative z-10 flex w-full max-w-lg flex-1 flex-col items-center px-4 pb-6 pt-16 sm:pt-20">
        <h1 className="font-display text-3xl tracking-widest text-paper">{t(locale, "shrineTitle")}</h1>
        <p className="mt-1 font-brush text-xl text-gold-soft">{t(locale, "creed")}</p>
        <p className="mt-1 text-sm text-gold-soft/80">{t(locale, "shrineLead")}</p>

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
          {serial.toLocaleString(locale === "en" ? "en-US" : "zh-CN")}
          <span className="ml-1 font-brush text-xl text-gold-soft">{t(locale, "numberUnit") || "No."}</span>
        </p>

        <button
          type="button"
          onClick={() => onOffer(todayId)}
          className="mt-3 rounded-sm border border-cow/70 px-3 py-1 font-display text-sm tracking-widest text-cow"
        >
          {locale === "en" ? "Today · " : "今日收下 · "}
          {todayLabel}
        </button>
        {mine ? <p className="mt-2 font-display text-sm text-cow">{mine}</p> : null}

        <button
          type="button"
          onClick={
            incense.owned.length
              ? onOffer
              : () => {
                  setIncense(claimFreeStick());
                  setSaid(locale === "en" ? "Incense claimed. Now wish." : "香领了。有香才能许愿。");
                  window.setTimeout(onOffer, 280);
                }
          }
          className="mt-4 flex min-h-12 w-full max-w-xs items-center justify-center rounded-sm bg-cinnabar font-display text-xl tracking-widest text-paper"
        >
          {incense.owned.length ? t(locale, "wishOne") : t(locale, "claimStick")}
        </button>
        <Link
          to="/qian"
          className="mt-2 flex min-h-11 w-full max-w-xs items-center justify-center rounded-sm bg-wood font-display tracking-widest text-paper no-underline"
        >
          {t(locale, "drawOne")}
        </Link>
        <Link
          to="/ce"
          className="mt-3 text-center text-sm tracking-widest text-gold-soft/80 no-underline"
        >
          {t(locale, "startQuiz")}
        </Link>
        {incense.owned.includes("cao") ? (
          <Link
            to="/xiang"
            className="mt-2 flex min-h-11 w-full max-w-xs items-center justify-center rounded-sm border border-cow/70 font-display tracking-widest text-cow no-underline"
          >
            {t(locale, "swapStick")}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              setIncense(claimFreeStick());
              setSaid("香领了。点神像，听它叫麻麻。");
            }}
            className="mt-2 min-h-11 w-full max-w-xs rounded-sm bg-cow font-display tracking-widest text-ink"
          >
            {t(locale, "freeStick")}
          </button>
        )}
        {canRepay && onRepay ? (
          <button
            type="button"
            onClick={onRepay}
            className="mt-2 min-h-11 w-full max-w-xs rounded-sm border border-cow/70 font-display tracking-widest text-cow"
          >
            {t(locale, "repayNow")}
          </button>
        ) : null}
        <a
          href="/poster.jpg"
          download="niulai-poster.jpg"
          className="mt-2 flex min-h-11 w-full max-w-xs items-center justify-center rounded-sm border border-gold-soft/70 font-display tracking-widest text-gold-soft no-underline"
        >
          {locale === "en" ? "Save poster" : "转发海报"}
        </a>
        <p className="mt-3 text-center text-xs text-gold-soft/80">
          香 {gongde} 炷 · 今日 · {todayLabel} · 已叩 {seals.bows}
        </p>
        <p className="mt-1 text-center text-xs text-gold-soft">{incenseLine(incense)}</p>
        <p className="mt-1 text-center text-xs text-gold-soft">
          许完传火 · 测完换香 · 积福换香
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
