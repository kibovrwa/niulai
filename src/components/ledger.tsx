import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { passFire } from "@/lib/cult-fns";
import { addGongde, alreadyBlessed, markBlessed, XIANG } from "@/lib/gongde";
import type { WishRow } from "@/lib/wish-fns";

export function Ledger({ wishes }: { wishes: WishRow[] }) {
  const [, bump] = useState(0);

  function bless(id: string) {
    if (alreadyBlessed(id)) return;
    markBlessed(id);
    addGongde(XIANG.bless);
    void passFire();
    bump((n) => n + 1);
  }

  return (
    <section className="bg-paper px-4 py-12 text-ink sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="font-brush text-cinnabar">号簿</p>
        <div className="mt-1 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-widest">别人贪过的</h2>
          <Link
            to="/wall"
            className="min-h-11 shrink-0 py-2 text-sm text-cinnabar no-underline"
          >
            整本 →
          </Link>
        </div>
        <p className="mt-2 text-sm text-muted">帮别人积福，换 {XIANG.bless} 炷香。</p>
        <ul className="mt-6 divide-y divide-wood/15">
          {wishes.map((w) => (
            <li key={w.id} className="flex items-center justify-between gap-3 py-3">
              <Link
                to="/w/$code"
                params={{ code: w.id }}
                className="min-w-0 text-ink no-underline"
              >
                <span className="mr-2 font-display tabular-nums text-cinnabar">{w.serial}</span>
                <span className="text-sm text-muted">{w.nickname}</span>
                <span className="mt-0.5 block font-display text-xl">{w.label}</span>
              </Link>
              <button
                type="button"
                onClick={() => bless(w.id)}
                disabled={alreadyBlessed(w.id)}
                className="shrink-0 rounded-sm border border-cinnabar/40 px-2.5 py-1.5 text-sm text-cinnabar disabled:border-wood/20 disabled:text-muted"
              >
                {alreadyBlessed(w.id) ? "已积福" : "积福"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}