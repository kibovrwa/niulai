import { useEffect, useRef, useState, type Ref } from "react";
import { QrMark } from "@/components/qr-mark";
import { ShareBar } from "@/components/share-bar";
import { addGongde } from "@/lib/gongde";
import { isRepaid, markRepaid } from "@/lib/repay";
import { awardSeal } from "@/lib/seals";
import { repayShare, publicUrl, wishShare } from "@/lib/share";
import { repayWish } from "@/lib/wish-fns";
import { ShareShot } from "@/components/share-shot";
import { saveNodePng } from "@/lib/share-image";
import { renderWishPoster } from "@/lib/wish-poster";
import { cowTypeById, luckyMark, wishById } from "@/lib/wish-data";
import type { WishRow } from "@/lib/wish-fns";

type CertificateProps = {
  wish: WishRow;
  sameCount: number;
  onClose: () => void;
  onAgain: () => void;
};

export function Certificate({ wish, sameCount, onClose, onAgain }: CertificateProps) {
  const spec = wishById(wish.wishId);
  const cow = cowTypeById(wish.cowType);
  const [saving, setSaving] = useState(false);
  const [shot, setShot] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const poster = useRef<HTMLDivElement>(null);

  const [done, setDone] = useState(false);

  useEffect(() => {
    setUrl(publicUrl(`/w/${wish.id}`));
    setDone(isRepaid(wish.id));
  }, [wish.id]);

  function repay() {
    if (done) return;
    markRepaid(wish.id);
    setDone(true);
    awardSeal("repay");
    addGongde(3);
    void repayWish({ data: { id: wish.id, serial: wish.serial } });
  }

  async function save() {
    setSaving(true);
    try {
      const blob = await renderWishPoster(wish, sameCount);
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = `niulai-${wish.serial}.jpg`;
      a.click();
      setShot(href);
    } catch {
      if (poster.current) {
        const pic = await saveNodePng(poster.current, `niulai-${wish.serial}.png`);
        setShot(pic);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/80 px-3 pb-6 pt-14 sm:flex sm:items-center sm:justify-center sm:pt-6">
      <div className="mx-auto w-full max-w-sm">
        <ShareSlip posterRef={poster} wish={wish} sameCount={sameCount} playUrl={url} />
        <div className="flex flex-col gap-2 rounded-b-sm bg-paper px-4 py-3 text-ink">
          <p className="text-center font-brush text-lg text-cinnabar">{cow.name}</p>
          <p className="text-center text-sm text-muted">{spec.roast}</p>
          <ShareBar
            compact
            payload={
              done
                ? repayShare({ serial: wish.serial, label: wish.label, id: wish.id })
                : wishShare({ serial: wish.serial, label: wish.label, id: wish.id })
            }
            saveLabel="做出图去发"
            saving={saving}
            onSave={() => void save()}
          />
          {shot ? <ShareShot src={shot} onClose={() => setShot(null)} /> : null}
          {done ? (
            <p className="text-center font-brush text-cinnabar">这号还过了</p>
          ) : (
            <button
              type="button"
              onClick={repay}
              className="min-h-11 rounded-sm bg-cinnabar font-display tracking-widest text-paper"
            >
              灵了，还愿
            </button>
          )}
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={onAgain} className="min-h-11 rounded-sm bg-paper-deep font-display">
              再许一个
            </button>
            <button type="button" onClick={onClose} className="min-h-11 rounded-sm bg-paper-deep font-display text-muted">
              留下看号
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShareSlip({
  wish,
  sameCount,
  playUrl,
  posterRef,
}: {
  wish: WishRow;
  sameCount: number;
  playUrl?: string;
  posterRef?: Ref<HTMLDivElement>;
}) {
  const spec = wishById(wish.wishId);
  const lucky = luckyMark(wish.serial);
  const [url, setUrl] = useState(playUrl ?? "");

  useEffect(() => {
    if (playUrl) {
      setUrl(playUrl);
      return;
    }
    setUrl(publicUrl(`/w/${wish.id}`));
  }, [playUrl, wish.id]);

  return (
    <div ref={posterRef} className="relative overflow-hidden bg-ink text-center text-paper">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/art/grass.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/40 via-ink/15 to-ink/90" />
      <span className="absolute right-3 top-10 z-10 rotate-12 border-2 border-cinnabar-bright px-2.5 py-1 font-brush text-lg text-cinnabar-bright">
        {lucky ?? spec.stamp}
      </span>
      <div className="relative z-10 px-4 pb-4 pt-5">
        <p className="font-brush text-sm tracking-widest text-gold-soft">此页已开光</p>
        <p className="mt-1 font-brush text-2xl text-gold-soft">第 {wish.serial} 号</p>
        <img
          src="/art/totem-god.jpg"
          alt=""
          className="mx-auto mt-2 w-[58%] object-contain"
          style={{ outline: "none" }}
          crossOrigin="anonymous"
        />
        <p className="mt-1 font-display text-lg tracking-widest text-gold-soft">信牛来，牛市一定来</p>
        <div className="mt-3 rounded-sm bg-paper px-3 py-3 text-ink">
          <p className="font-display text-2xl leading-snug">{wish.label}</p>
          <p className="mt-2 text-xs text-muted">
            {sameCount} 人同一贪 · {wish.nickname}
          </p>
          <p className="mt-1 text-sm text-cinnabar">{spec.roast}</p>
        </div>
        {url ? (
          <div className="mt-2 rounded-sm bg-paper px-2 py-2">
            <QrMark url={url} label="扫码也来许一个" size={128} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
