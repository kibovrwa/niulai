import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site-chrome";
import { Hall } from "@/components/hall";
import { loadGongde } from "@/lib/gongde";
import {
  STICKS,
  claimFreeStick,
  incenseLine,
  loadIncense,
  playMama,
  swapStick,
  type Incense,
} from "@/lib/incense";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/xiang")({
  head: () =>
    seoHead({
      title: "领香换香",
      desc: "牛来许愿池。进池免费领一炷。后面换香。点神像叫麻麻。",
      path: "/xiang",
    }),
  component: XiangPage,
});

function XiangPage() {
  const [inc, setInc] = useState<Incense>({ last: "", streak: 0, best: 0, owned: [], on: "cao" });
  const [gongde, setGongde] = useState(0);
  const [msg, setMsg] = useState("进池先领一炷。后面再换。");

  useEffect(() => {
    setInc(loadIncense());
    setGongde(loadGongde());
  }, []);

  function takeFree() {
    const next = claimFreeStick();
    setInc(next);
    setGongde(loadGongde());
    setMsg("草香领了。点神像，它会叫麻麻。");
  }

  function swap(id: (typeof STICKS)[number]["id"]) {
    if (id === "cao" && !inc.owned.includes("cao")) {
      takeFree();
      return;
    }
    const res = swapStick(id);
    setInc(res.state);
    setGongde(loadGongde());
    setMsg(res.msg);
    if (id === "mama" && res.ok) playMama();
  }

  return (
    <SiteChrome>
      <Hall>
        <p className="text-center font-brush text-gold-soft">香案</p>
        <h1 className="text-center font-display text-4xl tracking-widest">领香 · 换香</h1>
        <p className="mt-2 text-center text-sm text-paper/70">功德 {gongde}</p>
        <p className="mt-3 text-center font-brush text-gold-soft">{msg}</p>
        <p className="mt-1 text-center text-xs text-gold-soft/80">{incenseLine(inc)}</p>

        {!inc.owned.includes("cao") ? (
          <button
            type="button"
            onClick={takeFree}
            className="mx-auto mt-5 flex min-h-12 w-full max-w-xs items-center justify-center rounded-sm bg-cinnabar font-display text-xl tracking-widest text-paper"
          >
            免费领香
          </button>
        ) : null}

        <ul className="mt-6 space-y-2">
          {STICKS.map((s) => {
            const owned = inc.owned.includes(s.id);
            const on = inc.on === s.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => swap(s.id)}
                  className={`flex min-h-12 w-full items-center justify-between rounded-sm px-4 font-display ${
                    on ? "bg-cow text-ink" : "bg-paper/10 text-paper"
                  }`}
                >
                  <span>
                    {s.name}
                    {s.id === "mama" ? " · 叫麻麻" : ""}
                  </span>
                  <span className="text-sm tracking-widest">
                    {on ? "正燃" : owned ? "换上" : s.cost === 0 ? "免费领" : `${s.cost} 功德`}
                  </span>
                </button>
                <p className="mt-1 px-1 text-xs text-muted">{s.line}</p>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => {
            playMama();
            setMsg("麻麻。");
          }}
          className="mx-auto mt-6 flex min-h-11 w-full max-w-xs items-center justify-center rounded-sm border border-cow/70 font-display tracking-widest text-cow"
        >
          听牛来叫麻麻
        </button>
        <Link to="/" className="mt-4 block text-center text-sm text-muted">
          回池
        </Link>
      </Hall>
    </SiteChrome>
  );
}
