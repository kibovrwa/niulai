import { useLocale } from "@/lib/i18n";
import { useEffect, useState } from "react";

export function QrMark({
  url,
  label,
  size = 128,
}: {
  url: string;
  label: string;
  size?: number;
}) {
  const locale = useLocale((s) => s.locale);
  const [src, setSrc] = useState("");
  const shown = Math.min(size, 160);

  useEffect(() => {
    let gone = false;
    void import("qrcode").then((QR) =>
      QR.toDataURL(url, {
        width: shown * 2,
        margin: 1,
        color: { dark: "#1a1610", light: "#f3e6c8" },
        errorCorrectionLevel: "M",
      }).then((data) => {
        if (!gone) setSrc(data);
      }),
    );
    return () => {
      gone = true;
    };
  }, [url, shown]);

  return (
    <div className="flex items-center gap-3 rounded-sm bg-paper px-3 py-2.5 text-ink">
      {src ? (
        <img src={src} alt="" className="h-20 w-20 shrink-0" style={{ outline: "none" }} />
      ) : (
        <span className="h-20 w-20 shrink-0 bg-paper-deep" />
      )}
      <div className="min-w-0 text-left">
        <p className="font-display text-base leading-snug">{label}</p>
        <p className="mt-1 text-xs tracking-widest text-muted">
          {locale === "en" ? "niulai.org" : "牛来许愿池"}
        </p>
      </div>
    </div>
  );
}
