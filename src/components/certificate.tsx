import { useEffect, useRef, useState, type Ref } from "react";
import { QrMark } from "@/components/qr-mark";
import { ShareBar } from "@/components/share-bar";
import { publicUrl, wishShare } from "@/lib/share";
import { saveNodePng } from "@/lib/share-image";
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
  const [url, setUrl] = useState("");
  const poster = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUrl(publicUrl(`/w/${wish.id}`));
  }, [wish.id]);

  async function save() {
    if (!poster.current) return;
    setSaving(true);
    try {
      await saveNodePng(poster.current, `niulai-${wish.serial}.png`);
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
            payload={wishShare({ serial: wish.serial, label: wish.label, id: wish.id })}
            saveLabel="保存这张单"
            saving={saving}
            onSave={() => void save()}
          />
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
    <div ref={posterRef} className="relative bg-grass px-4 pb-4 pt-4 text-center text-paper">
      <p className="font-brush text-gold-soft">第 {wish.serial} 号</p>
      <img
        src="/art/totem-god.jpg"
        alt=""
        className="mx-auto mt-2 h-14 w-14 rounded-full object-cover"
        crossOrigin="anonymous"
      />
      <p className="mt-2 font-display text-2xl leading-tight">{wish.label}</p>
      <p className="mt-1 text-xs text-gold-soft/90">
        {sameCount} 人同一贪 · {wish.nickname}
      </p>
      <span className="absolute right-2 top-3 rotate-12 border-2 border-cinnabar-bright px-2 py-0.5 font-brush text-cinnabar-bright">
        {lucky ?? spec.stamp}
      </span>
      {url ? (
        <div className="mt-3">
          <QrMark url={url} label="扫码也来许一个" size={128} />
        </div>
      ) : null}
    </div>
  );
}
