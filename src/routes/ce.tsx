import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site-chrome";
import { Hall } from "@/components/hall";
import { useLocale } from "@/lib/i18n";
import { QUESTIONS, decodeAnswers, encodeAnswers, scoreNbti, formatIndex, type AnswerMap } from "@/lib/nbti";
import { passFire } from "@/lib/cult-fns";
import { addGongde, alreadyBlessed, markBlessed, XIANG } from "@/lib/gongde";
import { seoHead } from "@/lib/seo";

type CeSearch = { from?: string; go?: string };

export const Route = createFileRoute("/ce")({
  validateSearch: (search: Record<string, unknown>): CeSearch => ({
    from: typeof search.from === "string" ? search.from : undefined,
    go: typeof search.go === "string" ? search.go : undefined,
  }),
  head: () =>
    seoHead({
      title: "测你是哪种牛",
      desc: "八题。核动力牛、美牛牛、套死牛。测完来对。",
      path: "/ce",
    }),
  component: CePage,
});

function CePage() {
  const locale = useLocale((s) => s.locale) === "en" ? "en" : "zh";
  const { from, go } = Route.useSearch();
  const vs = from ? decodeAnswers(from) : null;
  const rival = vs ? scoreNbti(vs) : null;
  const [phase, setPhase] = useState<"intro" | "ask" | "marking">(
    from && !go ? "intro" : "ask",
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [pressed, setPressed] = useState<string | null>(null);
  const q = QUESTIONS[step];

  useEffect(() => {
    if (go) setPhase((p) => (p === "intro" ? "ask" : p));
  }, [go]);

  useEffect(() => {
    if (!from) return;
    const key = `niulai.fire.${from}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    if (!alreadyBlessed(`from:${from}`)) {
      markBlessed(`from:${from}`);
      addGongde(XIANG.bless);
    }
    void passFire();
  }, [from]);

  function pick(optId: string) {
    if (pressed || phase !== "ask") return;
    setPressed(optId);
    const next = { ...answers, [q.id]: optId };
    setAnswers(next);
    window.setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep((s) => s + 1);
        setPressed(null);
        return;
      }
      setPhase("marking");
      const code = encodeAnswers(next);
      const qstr = from ? `?from=${encodeURIComponent(from)}` : "";
      window.setTimeout(() => {
        window.location.assign(`/nbti/${code}${qstr}`);
      }, 900);
    }, 180);
  }

  return (
    <SiteChrome>
      <Hall totem={false}>
        <div>
          {phase === "intro" ? (
            <Intro locale={locale} rival={rival} onStart={() => setPhase("ask")} />
          ) : null}

          {phase === "marking" ? (
            <div className="pt-8 text-center">
              <GodFace />
              <p className="mt-6 font-brush text-2xl text-gold-soft">{locale === "en" ? "The god is marking" : "神在批卷"}</p>
              <p className="mt-2 text-sm text-paper/70">{locale === "en" ? "Don't refresh." : "指数在跳。别刷新。"}</p>
            </div>
          ) : null}

          {phase === "ask" && q ? (
            <>
              <p className="text-center font-brush text-gold-soft">{locale === "en" ? "The god asks" : "神问你"}</p>
              <p className="mt-1 text-center text-sm text-paper/75">
                {step + 1} / {QUESTIONS.length}
              </p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/40">
                <div
                  className="h-full bg-cow"
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <GodFace />
              <h1 className="mt-4 text-center font-display text-2xl leading-snug">{q.q[locale]}</h1>
              <div className="relative z-20 mt-4 grid gap-2">
                {q.opts.map((o) => {
                  const on = pressed === o.id;
                  return (
                    <button
                      key={`${step}-${o.id}`}
                      type="button"
                      disabled={Boolean(pressed)}
                      onClick={() => pick(o.id)}
                      className={`min-h-12 touch-manipulation rounded-sm px-4 py-3 text-left font-display text-lg ${
                        on ? "bg-cinnabar text-paper" : "bg-paper text-ink"
                      }`}
                    >
                      {o.t[locale]}
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </Hall>
    </SiteChrome>
  );
}

function Intro({
  locale,
  rival,
  onStart,
}: {
  locale: "zh" | "en";
  rival: ReturnType<typeof scoreNbti> | null;
  onStart: () => void;
}) {
  return (
    <div className="pt-2 text-center">
      <GodFace large />
      <p className="mt-5 font-brush text-gold-soft">此页已开光</p>
      <h1 className="mt-1 font-display text-4xl tracking-widest">{locale === "en" ? "Which cow are you?" : "测你是哪种牛"}</h1>
      <p className="mt-2 font-brush text-xl text-gold-soft">
        {locale === "en" ? "Believe in niulai. The bull will come." : "信牛来，牛市一定来"}
      </p>
      <p className="mt-3 text-sm text-paper/75">
        {locale === "en"
          ? "Eight questions about greed. Not a trading exam."
          : "八题看你怎么贪。不炒股也能答。"}
      </p>
      {rival ? (
        <div className="mt-5 rounded-sm bg-ink/35 px-4 py-4 text-left">
          <p className="text-xs tracking-widest text-gold-soft">{locale === "en" ? "Someone tossed you a slip" : "有人甩给你一张单"}</p>
          <p className="mt-1 font-display text-2xl">
            {rival.code} · {rival.type.name[locale]}
          </p>
          <p className="mt-1 font-display text-3xl tabular-nums text-cow">
            {formatIndex(rival.index, rival.dec)}
          </p>
          <p className="mt-2 text-sm text-paper/75">{locale === "en" ? "Your index. Dare you." : "你的指数，敢不敢比。"}</p>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => onStart()}
        className="relative z-20 mt-8 flex min-h-12 w-full items-center justify-center rounded-sm bg-cinnabar font-display text-xl tracking-widest text-paper"
      >
        {locale === "en" ? "I'll take it" : rival ? "我来比" : "顺手测测"}
      </button>
      <Link to="/" className="mt-4 inline-block min-h-11 text-sm text-gold-soft">
        {locale === "en" ? "Wish first" : "先去许一个"}
      </Link>
    </div>
  );
}

function GodFace({ large }: { large?: boolean }) {
  return (
    <div className="relative mx-auto mt-5 w-fit">
      <span
        className="halo-ring pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-halo/40 blur-2xl"
        aria-hidden
      />
      <img
        src="/art/totem-god.jpg"
        alt=""
        className={`relative z-10 object-contain ${large ? "w-28" : "w-16"}`}
        crossOrigin="anonymous"
      />
    </div>
  );
}
