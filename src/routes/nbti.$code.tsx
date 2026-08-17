import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { QrMark } from "@/components/qr-mark";
import { SiteChrome } from "@/components/site-chrome";
import { useLocale } from "@/lib/i18n";
import { saveNbti } from "@/lib/booklet";
import { getCult, passFire, recordCast, type CultStats } from "@/lib/cult-fns";
import { awardSeal } from "@/lib/seals";
import { addGongde, XIANG } from "@/lib/gongde";
import { decodeAnswers, formatIndex, scoreNbti, typeArt } from "@/lib/nbti";
import { ShareBar } from "@/components/share-bar";
import { seoHead } from "@/lib/seo";
import { nbtiShare, publicUrl } from "@/lib/share";
import { ShareShot } from "@/components/share-shot";
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
      title: r ? `我是「${r.type.name.zh}」` : "NBTI · 牛来许愿池",
      desc: r
        ? `我是${r.type.name.zh}。${r.type.punch.zh} 你也测一个。`
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
  const [shot, setShot] = useState<string | null>(null);
  const [cult, setCult] = useState<CultStats | null>(null);
  const [fired, setFired] = useState(false);

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
    addGongde(XIANG.nbti);
    void recordCast({ data: result.code }).then(setCult);
  }, [result?.code, code]);

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
    setSaving(true);
    try {
      setShot(typeArt(r.code, locale));
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
      <main className="min-h-dvh bg-[#e8eee4] px-4 pb-16 pt-16">
        <div className="mx-auto max-w-md space-y-3">
          <div className="overflow-hidden rounded-2xl bg-white" style={{ background: "#ffffff" }}>
            <img
              src={typeArt(r.code, locale)}
              alt={`${r.type.name[locale]} ${r.type.punch[locale]}`}
              className="mx-auto w-full"
              style={{ outline: "none" }}
            />
          </div>

          <div className="rounded-2xl bg-white px-5 py-5 text-ink">
            <p className="text-xs text-muted">你的主类型</p>
            <p className="mt-1 font-display text-3xl">
              {r.code}（{r.type.name[locale]}）
            </p>
            <p className="mt-3 inline-block rounded-full bg-[#dce8d6] px-3 py-1 text-sm text-[#2f5a32]">
              {r.code === "NLBN"
                ? "万中无一 · 本尊 · 约 1/888"
                : `匹配度 ${r.beat}% · 指数 ${formatIndex(r.index, r.dec)}`}
            </p>
            {delta !== null && rival ? (
              <p className="mt-2 text-sm text-cinnabar">
                {delta === 0
                  ? `平了 · ${rival.code}`
                  : delta > 0
                    ? `比对方高 ${delta} 点`
                    : `比对方低 ${Math.abs(delta)} 点`}
              </p>
            ) : null}
            <p className="mt-3 text-sm text-muted">
              {r.red ? "红盘" : "震荡"}
              {cult
                ? ` · 第 ${(cult.types[r.code] ?? 1).toLocaleString("zh-CN")} 个${r.type.name.zh}`
                : ""}
              。测完换 {XIANG.nbti} 炷香。转发再换 {XIANG.share} 炷。
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-5 text-left text-ink">
            <p className="font-display text-lg">该牛相的简单解读</p>
            <p className="mt-3 text-sm leading-relaxed">{r.type.verdict[locale]}</p>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              {bars.map((b) => (
                <div key={b.k} className="rounded-sm bg-[#eef3ea] py-2">
                  <p className="font-display text-lg tabular-nums">{b.v}</p>
                  <p className="text-[11px] text-muted">{b.k}</p>
                </div>
              ))}
            </div>
            <dl className="mt-5 space-y-3 text-sm leading-relaxed">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-[11px] text-muted">前生</dt>
                  <dd className="mt-0.5">{r.fate.past[locale]}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-muted">今世</dt>
                  <dd className="mt-0.5">{r.fate.now[locale]}</dd>
                </div>
              </div>
              <div>
                <dt className="text-[11px] text-muted">面相</dt>
                <dd className="mt-0.5">{r.type.read.face[locale]}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-muted">你会怎么死</dt>
                <dd className="mt-0.5">{r.type.read.die[locale]}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-muted">你会怎么活</dt>
                <dd className="mt-0.5">{r.type.read.live[locale]}</dd>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-[11px] text-muted">宜</dt>
                  <dd className="mt-0.5">{r.type.read.yes[locale]}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-muted">忌</dt>
                  <dd className="mt-0.5">{r.type.read.no[locale]}</dd>
                </div>
              </div>
              <div className="rounded-sm bg-ink px-3 py-3 text-paper">
                <p className="text-[11px] tracking-widest text-gold-soft">神多嘴</p>
                <p className="mt-1 font-display text-lg leading-snug">{r.type.read.mouth[locale]}</p>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl bg-white px-4 py-4">
            <QrMark url={playUrl} label="扫码测你的" size={128} />
            <div className="mt-3">
              <ShareBar
                compact
                payload={nbtiShare({
                  code: r.code,
                  name: r.type.name.zh,
                  index: formatIndex(r.index, r.dec),
                  punch: r.type.punch.zh,
                  beat: r.beat,
                })}
                saveLabel="做出图去发"
                saving={saving}
                onSave={() => void save()}
                onShared={() => {
                  if (!fired) {
                    setFired(true);
                    awardSeal("fire");
                    void passFire().then(setCult);
                  }
                }}
              />
            </div>
            <Link to="/qian" className="mt-2 flex min-h-11 items-center justify-center rounded-sm bg-wood font-display text-paper no-underline">
              今日签还没抽
            </Link>
            <Link
              to="/"
              search={{ g: rec.id }}
              className="mt-2 flex min-h-11 items-center justify-center rounded-sm bg-paper-deep font-display no-underline"
            >
              向神登记「{rec.label}」
            </Link>
            <p className="mt-2 text-center text-xs text-muted">
              {r.code === "NLBN" ? "本尊在了。明日来续香。" : "本牛约 1/888。香火明日再来，别灭。"}
            </p>
            <Link to="/ce" className="mt-1 block min-h-11 text-center text-sm text-muted">
              再测一次
            </Link>
          </div>
        </div>
      </main>
      {shot ? <ShareShot src={shot} onClose={() => setShot(null)} /> : null}
    </SiteChrome>
  );
}
