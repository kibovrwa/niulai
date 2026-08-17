import { SEALS, type SealId, type SealState } from "@/lib/seals";

export function SealChop({
  mark,
  name,
  dim,
}: {
  mark: string;
  name: string;
  dim?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center gap-1 ${dim ? "opacity-35" : ""}`}>
      <span className="seal-chop font-brush text-2xl text-cinnabar-bright">{mark}</span>
      <span className="text-[10px] tracking-widest text-gold-soft">{name}</span>
    </div>
  );
}

export function SealRow({ state, compact }: { state: SealState; compact?: boolean }) {
  const got = new Set(Object.keys(state.earned) as SealId[]);
  const list = compact ? SEALS.filter((s) => got.has(s.id)) : SEALS;
  if (compact && list.length === 0) return null;
  return (
    <div className="flex flex-wrap items-end justify-center gap-3">
      {list.map((s) => (
        <SealChop key={s.id} mark={s.mark} name={s.name} dim={!got.has(s.id)} />
      ))}
    </div>
  );
}

export function SealAltar({ state }: { state: SealState }) {
  const got = new Set(Object.keys(state.earned) as SealId[]);
  return (
    <div className="grid grid-cols-3 gap-4">
      {SEALS.map((s) => (
        <div key={s.id} className="text-center">
          <SealChop mark={s.mark} name={s.name} dim={!got.has(s.id)} />
          <p className="mt-1 text-[11px] text-muted">{got.has(s.id) ? "已领" : s.how}</p>
        </div>
      ))}
    </div>
  );
}
