import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Certificate } from "@/components/certificate";
import { Ledger } from "@/components/ledger";
import { TotemOrbits } from "@/components/orbit";
import { Roadside } from "@/components/roadside";
import { Shrine } from "@/components/shrine";
import { SiteChrome } from "@/components/site-chrome";
import { WishBox } from "@/components/wish-box";
import { addSlip } from "@/lib/booklet";
import { readCult } from "@/lib/cult-fns";
import { addGongde } from "@/lib/gongde";
import { awardSeal } from "@/lib/seals";
import { seoHead } from "@/lib/seo";
import { isWishId, luckyMark, todayWishId, wishById, type WishId } from "@/lib/wish-data";
import { createWish, emptyStats, getStats, readStats, readWishes, type WishRow } from "@/lib/wish-fns";

type HomeSearch = { g?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    g: typeof search.g === "string" ? search.g : undefined,
  }),
  head: () =>
    seoHead({
      title: "我刚给牛来磕了一个",
      desc: "测你是核动力牛还是套死牛。八题出 NBTI。号只增不减。",
      path: "/",
    }),
  loader: async () => {
    try {
      const [stats, wishes, cult] = await Promise.all([
        readStats(),
        readWishes({ limit: 8 }),
        readCult(),
      ]);
      return { stats, wishes, cult };
    } catch {
      return {
        stats: emptyStats,
        wishes: [] as WishRow[],
        cult: { fire: 3188, casts: 0, types: {} },
      };
    }
  },
  component: Home,
});

function Home() {
  const initial = Route.useLoaderData();
  const { g } = Route.useSearch();
  const fromUrl = g && isWishId(g) ? g : null;
  const [picked, setPicked] = useState<WishId | null>(fromUrl);
  const [stats, setStats] = useState(initial.stats);
  const [wishes, setWishes] = useState(initial.wishes);
  const [open, setOpen] = useState(Boolean(fromUrl));
  const [busy, setBusy] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [receiving, setReceiving] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mine, setMine] = useState<WishRow | null>(null);

  useEffect(() => {
    const t = window.setInterval(() => {
      void getStats().then(setStats);
    }, 12000);
    return () => window.clearInterval(t);
  }, []);

  function offer(wishId?: WishId) {
    setError(null);
    if (wishId) setPicked(wishId);
    setOpen(true);
  }

  async function submit(input: { nickname: string; wishId: WishId }) {
    setBusy(true);
    setError(null);
    setDropping(true);
    try {
      const row = await createWish({ data: input });
      addSlip({
        id: row.id,
        serial: row.serial,
        wishId: row.wishId,
        label: row.label,
        at: row.createdAt,
      });
      awardSeal("wish");
      addGongde(8);
      if (input.wishId === todayWishId()) awardSeal("today");
      if (luckyMark(row.serial)) awardSeal("lucky");
      setReceiving(true);
      window.setTimeout(() => setReceiving(false), 900);
      setStats((s) => ({
        ...s,
        total: s.total + 1,
        lastSerial: row.serial,
        counts: { ...s.counts, [row.wishId]: (s.counts[row.wishId] ?? 0) + 1 },
      }));
      setWishes((list) => [row, ...list].slice(0, 8));
      setFlashing(true);
      window.setTimeout(() => setFlashing(false), 800);
      window.setTimeout(() => {
        setDropping(false);
        setOpen(false);
        setMine(row);
        setBusy(false);
      }, 700);
    } catch (e) {
      setDropping(false);
      setBusy(false);
      setError(e instanceof Error ? e.message : "号没加上，再登一次");
    }
  }

  return (
    <SiteChrome>
      <Shrine
        serial={stats.lastSerial}
        fire={initial.cult.fire}
        todayLabel={wishById(todayWishId()).label}
        flashing={flashing}
        receiving={receiving}
        onOffer={() => offer()}
      />
      <WishBox
        open={open}
        busy={busy}
        error={error}
        dropping={dropping}
        counts={stats.counts}
        preset={picked ?? fromUrl}
        onClose={() => !busy && setOpen(false)}
        onSubmit={(input) => void submit(input)}
      />
      {mine ? (
        <Certificate
          wish={mine}
          sameCount={stats.counts[mine.wishId] ?? 1}
          onClose={() => setMine(null)}
          onAgain={() => {
            setMine(null);
            setOpen(true);
          }}
        />
      ) : null}
      <TotemOrbits counts={stats.counts} fire={initial.cult.fire} types={initial.cult.types} onOffer={offer} />
      <Ledger wishes={wishes} />
      <Roadside />
    </SiteChrome>
  );
}
