import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SealAltar } from "@/components/seals";
import { SiteChrome } from "@/components/site-chrome";
import { loadBooklet } from "@/lib/booklet";
import { loadSeals, type SealState } from "@/lib/seals";
import { loadGongde, rankOf } from "@/lib/gongde";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/pai")({
  head: () =>
    seoHead({
      title: "香牌 · 牛来图腾",
      desc: "叩首、挂号、测相、传火，领朱红印章。这是你在庙里的牌位。",
      path: "/pai",
    }),
  component: PaiPage,
});

function PaiPage() {
  const [seals, setSeals] = useState<SealState>({ bows: 0, earned: {} });
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const [gongde, setGongde] = useState(0);

  useEffect(() => {
    setSeals(loadSeals());
    setGongde(loadGongde());
    const b = loadBooklet();
    if (b.nbti) setName(`${b.nbti.name} ${b.nbti.letters}`);
  }, []);

  async function nominate() {
    const text = [
      name ? `我是${name}。` : "我在牛来图腾磕过了。",
      `已叩 ${seals.bows} 次。`,
      "点三个还没测的。你们也来磕一个，领一张香牌。",
      "https://niulai.org/ce",
    ].join("");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <SiteChrome>
      <main className="bg-paper px-4 pb-16 pt-24 text-ink sm:px-6">
        <div className="mx-auto max-w-md">
          <p className="font-brush text-cinnabar">香牌</p>
          <h1 className="mt-1 font-display text-4xl tracking-widest">你在庙里的章</h1>
          <p className="mt-2 text-sm text-muted">
            不是积分。是磕过、许过、传过留下的印。空的章，是还没来。
          </p>
          {name ? <p className="mt-4 font-display text-xl text-cinnabar">{name}</p> : null}
          <p className="mt-1 text-sm">
            功德 {gongde} · {rankOf(gongde).name} · 已叩 {seals.bows} 次
          </p>
          <div className="mt-8">
            <SealAltar state={seals} />
          </div>
          <button
            type="button"
            onClick={() => void nominate()}
            className="mt-8 min-h-12 w-full rounded-sm bg-cinnabar font-display tracking-widest text-paper"
          >
            {copied ? "已复制，去点三个人" : "点三个还没测的"}
          </button>
          <Link to="/" className="mt-4 block text-center text-sm text-muted">
            回去叩
          </Link>
        </div>
      </main>
    </SiteChrome>
  );
}
