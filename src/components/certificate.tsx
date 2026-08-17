import { Link } from "@tanstack/react-router";
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
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink/80 p-3 sm:items-center">
      <div className="w-full max-w-sm">
        <ShareSlip posterRef={poster} wish={wish} sameCount={sameCount} playUrl={url} />
        <div className="flex flex-col gap-2 rounded-b-sm bg-paper px-4 py-4 text-ink">
          <p className="text-center font-brush text-lg text-cinnabar">{cow.name}</p>
          <p className="text-center text-sm text-muted">{spec.roast}</p>
          <ShareBar
            payload={wishShare({ serial: wish.serial, label: wish.label, id: wish.id })}
            saveLabel="保存这张单"
            saving={saving}
            onSave={() => void save()}
          />
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/w/$code"
              params={{ code: wish.id }}
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-paper-deep font-display text-ink no-underline"
            >
              打开晒单
            </Link>
            <button type="button" onClick={onAgain} className="min-h-11 rounded-sm bg-paper-deep font-display">
              再贪一个
            </button>
          </div>
          <button type="button" onClick={onClose} className="min-h-11 text-sm text-muted">
            留下看号
          </button>
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
    <div ref={posterRef} className="relative bg-grass px-5 pb-5 pt-6 text-center text-paper">
      <p className="font-brush text-gold-soft">牛来纪 · 第 {wish.serial} 号</p>
      <img
        src="/logo.png"
        alt=""
        className="mx-auto mt-3 h-20 w-20 rounded-full object-cover"
        crossOrigin="anonymous"
      />
      <p className="mt-3 font-display text-3xl leading-tight">{wish.label}</p>
      <p className="mt-2 text-xs text-gold-soft/90">
        {sameCount} 人同一贪 · {wish.nickname}
      </p>
      <span className="absolute right-3 top-6 rotate-12 border-2 border-cinnabar-bright px-2 py-0.5 font-brush text-cinnabar-bright">
        {lucky ?? spec.stamp}
      </span>
      {url ? (
        <div className="mt-4">
          <QrMark url={url} label="扫码，也向神贪一个" size={200} />
        </div>
      ) : null}
    </div>
  );
}
