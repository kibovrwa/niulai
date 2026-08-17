import { useEffect, useMemo, useState } from "react";
import { PACKS, WISHES, wishById, type PackId, type WishId } from "@/lib/wish-data";

type WishBoxProps = {
  open: boolean;
  busy: boolean;
  error: string | null;
  dropping: boolean;
  counts: Record<string, number>;
  preset?: WishId | null;
  onClose: () => void;
  onSubmit: (input: { nickname: string; wishId: WishId }) => void;
};

export function WishBox({
  open,
  busy,
  error,
  dropping,
  counts,
  preset,
  onClose,
  onSubmit,
}: WishBoxProps) {
  const start = preset ?? "double";
  const [pack, setPack] = useState<PackId>(wishById(start).pack);
  const [wishId, setWishId] = useState<WishId>(start);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (!open || !preset) return;
    setWishId(preset);
    setPack(wishById(preset).pack);
  }, [open, preset]);

  const list = useMemo(() => WISHES.filter((w) => w.pack === pack), [pack]);
  const current = wishById(wishId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        className="absolute inset-0 border-0 bg-ink/70"
        aria-label="关闭"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-h-[88dvh] max-w-lg overflow-y-auto rounded-t-sm bg-paper px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 text-ink shadow-plaque sm:px-6">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-wood/30" />
        {dropping ? (
          <div className="relative flex h-40 items-center justify-center">
            <span className="slip-fly inline-block rotate-2 bg-cinnabar px-5 py-3 font-brush text-2xl text-paper">
              {current.label}
            </span>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({ nickname, wishId });
            }}
          >
            <header>
              <p className="font-brush text-cinnabar">向概念神挂号</p>
              <h2 className="font-display text-2xl tracking-widest">选你的贪</h2>
              <p className="mt-1 text-sm text-muted">
                不拜动物。把一句能转发的贪，登记到「来」上面。
              </p>
            </header>

            <div className="grid grid-cols-3 gap-2">
              {PACKS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPack(p.id);
                    const first = WISHES.find((w) => w.pack === p.id);
                    if (first) setWishId(first.id);
                  }}
                  className={`min-h-11 rounded-sm font-display ${
                    pack === p.id
                      ? "bg-cinnabar text-paper"
                      : "bg-paper-deep text-ink"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2">
              {list.map((w) => {
                const on = w.id === wishId;
                const n = counts[w.id] ?? 0;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWishId(w.id)}
                    className={`flex min-h-12 items-center justify-between rounded-sm px-3 text-left ${
                      on ? "bg-cinnabar text-paper" : "bg-paper-deep text-ink"
                    }`}
                  >
                    <span className="font-display text-lg">{w.label}</span>
                    <span className={`text-xs tabular-nums ${on ? "text-gold-soft" : "text-muted"}`}>
                      {n} 人
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="block">
              <span className="mb-1 block text-xs tracking-widest text-muted">
                落款，可空
              </span>
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value.slice(0, 12))}
                maxLength={12}
                placeholder="无名氏"
                className="min-h-11 w-full rounded-sm border-0 bg-paper-deep px-3 font-serif text-base text-ink outline-2 outline-wood/30 focus:outline-cinnabar"
              />
            </label>

            {error ? <p className="text-sm text-cinnabar">{error}</p> : null}

            <button
              type="submit"
              disabled={busy}
              className="min-h-12 rounded-sm bg-cinnabar font-display text-lg tracking-widest text-paper hover:bg-cinnabar-bright disabled:opacity-60"
            >
              {busy ? "号在加…" : `登记「${current.label}」`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
