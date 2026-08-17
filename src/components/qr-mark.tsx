import { useEffect, useRef } from "react";

export function QrMark({
  url,
  label,
  size = 128,
}: {
  url: string;
  label: string;
  size?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const shown = Math.min(size, 128);

  useEffect(() => {
    let gone = false;
    void import("qrcode").then((QR) => {
      if (gone || !ref.current) return;
      return QR.toCanvas(ref.current, url, {
        width: shown,
        margin: 1,
        color: { dark: "#1a1610", light: "#f3e6c8" },
        errorCorrectionLevel: "M",
      });
    });
    return () => {
      gone = true;
    };
  }, [url, shown]);

  return (
    <div className="flex items-center gap-3 rounded-sm bg-paper px-3 py-2.5 text-ink">
      <canvas
        ref={ref}
        className="h-20 w-20 shrink-0 bg-paper sm:h-[5.5rem] sm:w-[5.5rem]"
      />
      <div className="min-w-0 text-left">
        <p className="font-display text-base leading-snug">{label}</p>
        <p className="mt-1 text-xs tracking-widest text-muted">NIULAI.ORG</p>
      </div>
    </div>
  );
}