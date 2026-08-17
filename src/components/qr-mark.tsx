import { useEffect, useRef } from "react";

export function QrMark({
  url,
  label,
  size = 168,
}: {
  url: string;
  label: string;
  size?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let gone = false;
    void import("qrcode").then((QR) => {
      if (gone || !ref.current) return;
      return QR.toCanvas(ref.current, url, {
        width: size,
        margin: 1,
        color: { dark: "#1a1610", light: "#f3e6c8" },
        errorCorrectionLevel: "M",
      });
    });
    return () => {
      gone = true;
    };
  }, [url, size]);

  return (
    <div className="flex items-center gap-3 rounded-sm bg-paper px-3 py-3 text-ink">
      <canvas
        ref={ref}
        className="shrink-0 bg-paper"
        style={{ width: Math.round(size * 0.72), height: Math.round(size * 0.72) }}
      />
      <div className="min-w-0 text-left">
        <p className="font-display text-lg leading-snug">{label}</p>
        <p className="mt-1 text-xs tracking-widest text-muted">NIULAI.ORG</p>
      </div>
    </div>
  );
}
