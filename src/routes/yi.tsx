import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { TotemStage } from "@/components/totem-dress";
import { Hall } from "@/components/hall";
import { SiteChrome } from "@/components/site-chrome";
import { FITS, equippedList, loadFits, ownFit, toggleFit, type FitId, type FitState } from "@/lib/fits";
import { loadGongde, spendGongde } from "@/lib/gongde";
import { awardSeal } from "@/lib/seals";
import { seoHead } from "@/lib/seo";
import { saveNodePng } from "@/lib/share-image";

export const Route = createFileRoute("/yi")({
  head: () =>
    seoHead({
      title: "上供更衣 · 牛来庙",
      desc: "用功德给概念神披红、戴草环、挂云雀。不是买衣服，是上供。",
      path: "/yi",
    }),
  component: YiPage,
});

function YiPage() {
  const [fits, setFits] = useState<FitState>({ owned: [], on: {} });
  const [gongde, setGongde] = useState(0);
  const [msg, setMsg] = useState("功德请一件。请完，神就穿着。");
  const [saving, setSaving] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFits(loadFits());
    setGongde(loadGongde());
  }, []);

  const wearing = equippedList(fits).map((f) => f.id);

  function offer(id: FitId) {
    const item = FITS.find((f) => f.id === id);
    if (!item) return;
    if (fits.owned.includes(id)) {
      setFits(toggleFit(id));
      setMsg(fits.on[item.slot] === id ? `卸下${item.name}。` : `给神戴上${item.name}。`);
      return;
    }
    const pay = spendGongde(item.cost);
    setGongde(pay.left);
    if (!pay.ok) {
      setMsg(`功德不够。${item.name}要 ${item.cost}。先去磕、抽、传。`);
      return;
    }
    const next = ownFit(id);
    setFits(next);
    awardSeal("offer");
    setMsg(`上供成功。${item.line}`);
  }

  return (
    <SiteChrome>
      <Hall totem={false}>
        <p className="text-center font-brush text-gold-soft">上供</p>
        <h1 className="text-center font-display text-4xl tracking-widest">给神一件</h1>
        <p className="mt-2 text-center text-sm text-paper/70">功德 {gongde}</p>

        <div ref={stage} className="relative mx-auto mt-4 w-[min(70vw,280px)]">
          <span
            className="halo-ring pointer-events-none absolute left-1/2 top-[38%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-halo/40 blur-2xl"
            aria-hidden
          />
          <TotemStage src="/art/totem-god.jpg" on={wearing} className="relative z-10" />
        </div>
        <p className="mt-3 text-center font-brush text-gold-soft">{msg}</p>

        <ul className="mt-6 space-y-2">
          {FITS.map((f) => {
            const owned = fits.owned.includes(f.id);
            const on = wearing.includes(f.id);
            return (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => offer(f.id)}
                  className={`flex min-h-12 w-full items-center justify-between rounded-sm px-4 text-left ${
                    on ? "bg-cinnabar text-paper" : "bg-paper text-ink"
                  }`}
                >
                  <span>
                    <span className="font-display">{f.name}</span>
                    <span className="ml-2 text-xs opacity-80">{f.line}</span>
                  </span>
                  <span className="text-xs tabular-nums">
                    {owned ? (on ? "穿着" : "已供") : `${f.cost} 功德`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => {
            if (!stage.current) return;
            setSaving(true);
            void saveNodePng(stage.current, "niulai-yi.png").finally(() => setSaving(false));
          }}
          className="mt-6 min-h-12 w-full rounded-sm bg-paper font-display tracking-widest text-ink"
        >
          {saving ? "出图…" : "保存这身神"}
        </button>
        <Link to="/" className="mt-4 block text-center text-sm text-gold-soft">
          回去看神穿着
        </Link>
      </Hall>
    </SiteChrome>
  );
}
