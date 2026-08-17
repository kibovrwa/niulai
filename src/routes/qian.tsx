import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { QrMark } from "@/components/qr-mark";
import { ShareBar } from "@/components/share-bar";
import { SiteChrome } from "@/components/site-chrome";
import { addGongde, loadGongde, rankOf } from "@/lib/gongde";
import { drawLot, todayLot, type Lot } from "@/lib/lots";
import { awardSeal } from "@/lib/seals";
import { seoHead } from "@/lib/seo";
import { lotShare, publicUrl } from "@/lib/share";
import { saveNodePng } from "@/lib/share-image";

export const Route = createFileRoute("/qian")({
  head: () =>
    seoHead({
      title: "神前抽一支",
      desc: "上上、大凶、饿。抽完自己看。",
      path: "/qian",
    }),
  component: QianPage,
});

function QianPage() {
  const [lot, setLot] = useState<Lot | null>(null);
  const [gongde, setGongde] = useState(0);
  const [saving, setSaving] = useState(false);
  const [shaking, setShaking] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGongde(loadGongde());
  }, []);

  function draw(today?: boolean) {
    setShaking(true);
    window.setTimeout(() => {
      const next = today ? todayLot() : drawLot(Date.now() + loadGongde() * 13);
      setLot(next);
      awardSeal("lot");
      setGongde(addGongde(3));
      setShaking(false);
    }, 420);
  }

  const rank = rankOf(gongde);

  return (
    <SiteChrome>
      <main className="relative isolate min-h-dvh overflow-hidden pb-16 pt-20 text-paper">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/art/grass.jpg)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/25 to-ink/90" />

        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-4">
          <p className="font-brush text-lg text-gold-soft">神前</p>
          <h1 className="font-display text-5xl tracking-[0.35em]">抽一支</h1>
          <p className="mt-2 text-sm text-paper/70">
            功德 {gongde} · {rank.name}
          </p>

          <div className={`relative mt-4 ${shaking ? "totem-bow" : ""}`}>
            <span
              className="halo-ring pointer-events-none absolute left-1/2 top-[40%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-halo/45 blur-2xl"
              aria-hidden
            />
            <img
              src="/art/totem-god.jpg"
              alt=""
              className="relative z-10 mx-auto w-[min(42vw,180px)]"
              crossOrigin="anonymous"
            />
            <Incense />
          </div>

          {lot ? (
            <div
              ref={card}
              className="relative mt-5 w-full overflow-hidden rounded-sm"
              style={{ background: "#1c4324", color: "#f3e6c8" }}
            >
              <img
                src="/art/totem-god.jpg"
                alt=""
                className="mx-auto mt-5 h-20 w-20 rounded-full object-cover"
                crossOrigin="anonymous"
              />
              <p className="mt-2 font-brush text-xl" style={{ color: "#e8c36a" }}>
                {lot.rank}
              </p>
              <p
                className="font-display text-7xl leading-none tracking-[0.2em]"
                style={{ color: "#c43a22" }}
              >
                {lot.mark}
              </p>
              <p className="mx-auto mt-3 max-w-xs px-5 pb-1 text-center text-base leading-relaxed">
                {lot.line}
              </p>
              <p className="text-center text-[11px] tracking-[0.35em]" style={{ color: "#c49a4a" }}>
                牛来 · 灵不灵以后说
              </p>
              <div className="p-4">
                <QrMark url={publicUrl("/qian")} label="扫码抽一支" size={128} />
              </div>
            </div>
          ) : (
            <p className="mt-8 font-brush text-xl text-gold-soft">签在神脚边。抽一支。</p>
          )}

          <div className="mt-5 grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => draw(true)}
              className="min-h-12 rounded-sm bg-paper font-display tracking-widest text-ink"
            >
              今日签
            </button>
            <button
              type="button"
              onClick={() => draw(false)}
              className="min-h-12 rounded-sm bg-cinnabar font-display tracking-widest text-paper"
            >
              再抽一支
            </button>
          </div>

          {lot ? (
            <div className="mt-4 w-full">
              <ShareBar
                compact
                payload={lotShare({ rank: lot.rank, line: lot.line })}
                saveLabel="保存这签"
                saving={saving}
                onSave={() => {
                  if (!card.current) return;
                  setSaving(true);
                  void saveNodePng(card.current, "niulai-qian.png").finally(() => setSaving(false));
                }}
              />
            </div>
          ) : null}

          <Link to="/" className="mt-6 text-sm text-gold-soft">
            回去叩
          </Link>
        </div>
      </main>
    </SiteChrome>
  );
}

function Incense() {
  return (
    <div className="pointer-events-none absolute bottom-[6%] left-1/2 flex -translate-x-1/2 gap-5" aria-hidden>
      <span className="smoke-wisp h-12 w-1 rounded-full bg-paper/30" />
      <span className="smoke-wisp h-16 w-1 rounded-full bg-paper/25 [animation-delay:0.6s]" />
      <span className="smoke-wisp h-11 w-1 rounded-full bg-paper/20 [animation-delay:1.1s]" />
    </div>
  );
}
