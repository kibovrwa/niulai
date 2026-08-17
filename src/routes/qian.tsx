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
      title: "抽签 · 牛来图腾",
      desc: "狗血、怪梗、上上与大凶。抽一签，功德涨一点。灵不灵以后说。",
      path: "/qian",
    }),
  component: QianPage,
});

function QianPage() {
  const [lot, setLot] = useState<Lot | null>(null);
  const [gongde, setGongde] = useState(0);
  const [saving, setSaving] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGongde(loadGongde());
  }, []);

  function draw(today?: boolean) {
    const next = today ? todayLot() : drawLot(Date.now() + loadGongde() * 13);
    setLot(next);
    awardSeal("lot");
    setGongde(addGongde(3));
  }

  const rank = rankOf(gongde);

  return (
    <SiteChrome>
      <main className="bg-ink px-4 pb-16 pt-24 text-paper">
        <div className="mx-auto max-w-md">
          <p className="font-brush text-gold-soft">狗血签</p>
          <h1 className="mt-1 font-display text-4xl tracking-widest">抽一签</h1>
          <p className="mt-2 text-sm text-paper/70">
            豹装饿、云雀进梦、牛趴着起不来。签是戏。功德是真的涨。
          </p>
          <p className="mt-3 text-sm">
            功德 {gongde} · {rank.name}
          </p>

          {lot ? (
            <div
              ref={card}
              className="relative mt-6 overflow-hidden rounded-sm text-center"
              style={{ background: "#1c4324", color: "#f3e6c8" }}
            >
              <img
                src="/art/totem-god.jpg"
                alt=""
                className="mx-auto mt-5 h-28 w-28 rounded-full object-cover"
                crossOrigin="anonymous"
              />
              <p className="mt-3 font-brush text-lg" style={{ color: "#e8c36a" }}>
                {lot.rank}
              </p>
              <p className="font-display text-6xl leading-none" style={{ color: "#c23b2e" }}>
                {lot.mark}
              </p>
              <p className="mx-auto mt-3 max-w-xs px-5 text-base leading-relaxed">{lot.line}</p>
              <p className="mt-3 text-xs tracking-widest" style={{ color: "#c49a4a" }}>
                牛来 · 灵不灵以后说
              </p>
              <div className="p-4">
                <QrMark url={publicUrl("/qian")} label="扫码抽一签" size={128} />
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-sm border border-gold/30 px-5 py-10 text-center">
              <p className="font-brush text-gold-soft">签筒在神旁边</p>
              <p className="mt-2 text-sm text-paper/70">今日一签，人人同一句。再抽，是你自己的狗血。</p>
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => draw(true)}
              className="min-h-12 rounded-sm bg-paper font-display text-ink"
            >
              今日签
            </button>
            <button
              type="button"
              onClick={() => draw(false)}
              className="min-h-12 rounded-sm bg-cinnabar font-display text-paper"
            >
              再狗血一点
            </button>
          </div>
          {lot ? (
            <div className="mt-4">
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
          <Link to="/" className="mt-6 block text-center text-sm text-gold-soft">
            回去叩
          </Link>
        </div>
      </main>
    </SiteChrome>
  );
}
