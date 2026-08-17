import { useLocale } from "@/lib/i18n";

export function CreedMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const locale = useLocale((s) => s.locale) === "en" ? "en" : "zh";
  const unit = locale === "en" ? "BELIEVE · THE BULL WILL COME   " : "信牛来　牛市一定来　　";
  const row = unit.repeat(8);
  const field = Array.from({ length: 16 }, () => row).join("\n");

  return (
    <div className={`creed-mark creed-mark-${tone}`} aria-hidden>
      <p>{field}</p>
    </div>
  );
}
