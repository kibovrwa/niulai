import { useEffect, useMemo, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { QrMark } from "@/components/qr-mark";
import { SiteChrome } from "@/components/site-chrome";
import { useLocale } from "@/lib/i18n";
import { saveNbti } from "@/lib/booklet";
import { getCult, passFire, recordCast, type CultStats } from "@/lib/cult-fns";
import { awardSeal } from "@/lib/seals";
import { addGongde } from "@/lib/gongde";
import { decodeAnswers, formatIndex, scoreNbti } from "@/lib/nbti";
import { ShareBar } from "@/components/share-bar";
import { seoHead } from "@/lib/seo";
import { nbtiShare, publicUrl } from "@/lib/share";
import { saveNodePng } from "@/lib/share-image";
import { wishById } from "@/lib/wish-data";

type NbtiSearch = { from?: string };

export const Route = createFileRoute("/nbti/$code")({
  validateSearch: (search: Record<string, unknown>): NbtiSearch => ({
    from: typeof search.from === "string" ? search.from : undefined,
  }),
  head: ({ params }) => {
    const answers = decodeAnswers(params.code);
    const r = answers ? scoreNbti(answers) : null;
    return seoHead({
      title: r ? `我是「${r.type.name.zh}」` : "NBTI · 牛来图腾",
      desc: r
        ? `${r.type.punch.zh} 牛来指数 ${formatIndex(r.index, r.dec)}。你是哪种牛？来对线。`
        : "测你的 NBTI 和牛来指数。",
      path: `/nbti/${params.code}`,
    });
  },
  component: NbtiPage,
});

function NbtiPage() {
  const { code } = Route.useParams();
  const { from } = Route.useSearch();
  const locale = useLocale((s) => s.locale) === "en" ? "en" : "zh";
  const answers = decodeAnswers(code);
  const result = answers ? scoreNbti(answers) : null;
  const rival = from && decodeAnswers(from) ? scoreNbti(decodeAnswers(from)!) : null;
  const [saving, setSaving] = useState(false);
  const [shown, setShown] = useState(2800);
  const [cult, setCult] = useState<CultStats | null>(null);
  const [fired, setFired] = useState(false);
  const poster = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result) return;
    saveNbti({
      letters: result.code,
      answers: code,
      name: result.type.name.zh,
      index: result.index,
    });
    awardSeal("nbti");
    const key = `niulai.cast.${code}`;
    if (sessionStorage.getItem(key)) {
      void getCult().then(setCult);
      return;
    }
    sessionStorage.setItem(key, "1");
    addGongde(6);
    void recordCast({ data: result.code }).then(setCult);
  }, [result?.code, code]);

  useEffect(() => {
    if (!result) return;
    const target = result.index;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(2800 + (target - 2800) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [result?.index]);

  const playUrl = useMemo(() => publicUrl(`/ce?from=${code}`), [code]);

  if (!result) {
    return (
      <SiteChrome>
        <main className="grid min-h-dvh place-items-center bg-paper px-6 text-ink">
          <div className="text-center">
            <p className="font-display text-2xl">这卷看不清</p>
            <Link to="/ce" className="mt-4 inline-block text-cinnabar">
              NBTI
            </Link>
          </div>
        </main>
      </SiteChrome>
    );
  }

  const r = result;
  const rec = wishById(r.type.rec);
  const delta = rival ? r.index - rival.index : null;

  async function save() {
    if (!poster.current) return;
    setSaving(true);
    try {
      await saveNodePng(poster.current, `nbti-${r.code}.png`);
    } finally {
      setSaving(false);
    }
  }

  const bars = [
    { k: "贪", v: r.bars.greed },
    { k: "满", v: r.bars.full },
    { k: "糙", v: r.bars.crude },
    { k: "来", v: r.bars.come },
  ];

  return (
    <SiteChrome>
      <main className="bg-ink px-4 pb-16 pt-20 sm:px-6">
        <div className="mx-auto max-w-sm overflow-hidden rounded-sm shadow-plaque">
          <div ref={poster} className="bg-grass px-5 pb-5 pt-6 text-center text-paper">
            <p className="text-[11px] tracking-[0.4em] text-gold-soft">NBTI · 牛来纪</p>
            <img
              src="/logo.png"
              alt=""
              className="mx-auto mt-3 h-20 w-20 rounded-full object-cover"
              crossOrigin="anonymous"
            />
            <p className="mt-3 font-display text-5xl tracking-[0.16em]">{r.code}</p>
            <h1 className="mt-1 font-display text-3xl leading-tight">{r.type.name[locale]}</h1>
            <p className="mt-2 font-brush text-xl text-gold-soft">{r.type.punch[locale]}</p>
            <p className="mt-4 text-[11px] tracking-[0.35em] text-gold-soft">牛来指数</p>
            <p className={`font-display text-5xl tabular-nums leading-none ${r.red ? "text-cow" : "text-paper"}`}>
              {formatIndex(shown, r.dec)}
            </p>
            {delta !== null && rival ? (
              <p className="mt-2 font-display text-cow">
                {delta === 0
                  ? `平了 · ${rival.code}`
                  : delta > 0
                    ? `比对方高 ${delta} 点`
                    : `比对方低 ${Math.abs(delta)} 点`}
              </p>
            ) : null}
            <p className="mt-1 text-xs text-paper/70">
              {r.red ? "红盘" : "震荡"} · 击败 {r.beat}% 散户
              {cult
                ? ` · 第 ${(cult.types[r.code] ?? 1).toLocaleString("zh-CN")} 个${r.type.name.zh}`
                : ""}
            </p>
            <div className="mt-4">
              <QrMark url={playUrl} label="扫码测你的" size={128} />
            </div>
          </div>

          <div className="space-y-3 bg-paper px-5 py-5 text-ink">
            <p className="text-sm leading-relaxed">{r.type.verdict[locale]}</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              {bars.map((b) => (
                <div key={b.k}>
                  <p className="font-display text-lg tabular-nums">{b.v}</p>
                  <p className="text-[11px] text-muted">{b.k}</p>
                </div>
              ))}
            </div>

            <section className="border-t border-wood/20 pt-4 text-left">
              <p className="font-brush text-cinnabar">解读</p>
              <dl className="mt-3 space-y-3 text-sm leading-relaxed">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <dt className="text-[11px] tracking-widest text-muted">前生</dt>
                    <dd className="mt-0.5">{r.fate.past[locale]}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-widest text-muted">今世</dt>
                    <dd className="mt-0.5">{r.fate.now[locale]}</dd>
                  </div>
                </div>
                <div>
                  <dt className="text-[11px] tracking-widest text-muted">面相</dt>
                  <dd className="mt-0.5">{r.type.read.face[locale]}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-widest text-muted">你会怎么死</dt>
                  <dd className="mt-0.5">{r.type.read.die[locale]}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-widest text-muted">你会怎么活</dt>
                  <dd className="mt-0.5">{r.type.read.live[locale]}</dd>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <dt className="text-[11px] tracking-widest text-muted">宜</dt>
                    <dd className="mt-0.5">{r.type.read.yes[locale]}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-widest text-muted">忌</dt>
                    <dd className="mt-0.5">{r.type.read.no[locale]}</dd>
                  </div>
                </div>
                <div className="rounded-sm bg-grass px-3 py-3 text-paper">
                  <p className="text-[11px] tracking-widest text-gold-soft">神多嘴</p>
                  <p className="mt-1 font-display text-lg leading-snug">{r.type.read.mouth[locale]}</p>
                </div>
              </dl>
            </section>

            <ShareBar
              compact
              payload={nbtiShare({
                code: r.code,
                name: r.type.name.zh,
                index: formatIndex(r.index, r.dec),
                punch: r.type.punch.zh,
                beat: r.beat,
              })}
              saveLabel="保存这张牛相"
              saving={saving}
              onSave={() => void save()}
              onShared={() => {
                if (!fired) {
                  setFired(true);
                  awardSeal("fire");
                  addGongde(18);
                  void passFire().then(setCult);
                }
              }}
            />
            <Link
              to="/"
              search={{ g: rec.id }}
              className="flex min-h-11 items-center justify-center rounded-sm bg-paper-deep font-display no-underline"
            >
              向神登记「{rec.label}」
            </Link>
            <Link to="/ce" className="block min-h-11 text-center text-sm text-muted">
              再测一次
            </Link>
          </div>
        </div>
      </main>
    </SiteChrome>
  );
}
