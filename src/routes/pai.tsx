import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SealAltar } from "@/components/seals";
import { Hall } from "@/components/hall";
import { SiteChrome } from "@/components/site-chrome";
import { loadBooklet } from "@/lib/booklet";
import { loadSeals, type SealState } from "@/lib/seals";
import { loadGongde, rankOf } from "@/lib/gongde";
import { seoHead } from "@/lib/seo";
import { paiShare } from "@/lib/share";
import { ShareBar } from "@/components/share-bar";

export const Route = createFileRoute("/pai")({
  head: () =>
    seoHead({
      title: "香牌 · 牛来庙",
      desc: "叩首、挂号、测相、传火，领朱红印章。这是你在庙里的牌位。",
      path: "/pai",
    }),
  component: PaiPage,
});

function PaiPage() {
  const [seals, setSeals] = useState<SealState>({ bows: 0, earned: {} });
  const [name, setName] = useState("");
  const [gongde, setGongde] = useState(0);

  useEffect(() => {
    setSeals(loadSeals());
    setGongde(loadGongde());
    const b = loadBooklet();
    if (b.nbti) setName(`${b.nbti.name} ${b.nbti.letters}`);
  }, []);

  return (
    <SiteChrome>
      <Hall>
        <p className="text-center font-brush text-gold-soft">香牌</p>
        <h1 className="text-center font-display text-4xl tracking-widest">你在庙里的章</h1>
        {name ? <p className="mt-3 text-center font-display text-xl text-cow">{name}</p> : null}
        <p className="mt-1 text-center text-sm text-paper/70">
          功德 {gongde} · {rankOf(gongde).name} · 已叩 {seals.bows} 次
        </p>
        <div className="mt-6 rounded-sm bg-paper px-4 py-5 text-ink">
          <SealAltar state={seals} />
        </div>
        <div className="mt-6">
          <ShareBar compact payload={paiShare({ name: name || undefined, bows: seals.bows })} />
        </div>
        <Link to="/" className="mt-4 block text-center text-sm text-gold-soft">
          回去叩
        </Link>
      </Hall>
    </SiteChrome>
  );
}
