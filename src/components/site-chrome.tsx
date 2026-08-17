import { Link } from "@tanstack/react-router";
import { t, useLocale } from "@/lib/i18n";
import { fireShare, homeShare } from "@/lib/share";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const locale = useLocale((s) => s.locale) === "en" ? "en" : "zh";
  const setLocale = useLocale((s) => s.setLocale);

  return (
    <div className="relative min-h-dvh bg-ink text-paper">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="pointer-events-auto flex items-center gap-2 text-paper no-underline"
        >
          <img
            src="/logo.png"
            alt=""
            className="h-9 w-9 rounded-full object-cover"
            crossOrigin="anonymous"
          />
          <span className="font-display text-xl tracking-widest text-cow">
            {locale === "zh" ? "牛来" : "NIULAI"}
          </span>
        </Link>
        <div className="pointer-events-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => void fireShare(homeShare())}
            className="min-h-11 px-3 py-2 font-display tracking-widest text-gold-soft"
          >
            {t(locale, "navShare")}
          </button>
          <Link
            to="/ce"
            className="min-h-11 px-3 py-2 font-display tracking-widest text-cow no-underline"
          >
            {t(locale, "navNbti")}
          </Link>
        </div>
      </header>
      {children}
      <footer className="bg-ink px-4 py-10 text-center text-xs leading-relaxed text-muted">
        <p className="font-brush text-lg text-gold/85">{t(locale, "tagline")}</p>
        <p className="mt-2">{t(locale, "footerLine")}</p>
        <p className="mt-1">自立像第八千八百八十八号起 · 号不回零</p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-4 text-gold-soft">
          <Link to="/yi" className="min-h-11 py-2 no-underline">
            {t(locale, "navOffer")}
          </Link>
          <Link to="/qian" className="min-h-11 py-2 no-underline">
            {t(locale, "navLot")}
          </Link>
          <Link to="/pai" className="min-h-11 py-2 no-underline">
            {t(locale, "navSeal")}
          </Link>
          <Link to="/shi" className="min-h-11 py-2 no-underline">
            {t(locale, "navStory")}
          </Link>
          <Link to="/bang" className="min-h-11 py-2 no-underline">
            {t(locale, "navBoard")}
          </Link>
          <Link to="/wall" className="min-h-11 py-2 no-underline">
            {t(locale, "navBook")}
          </Link>
          <button
            type="button"
            onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
            className="min-h-11 py-2 tracking-widest"
          >
            {locale === "zh" ? "EN" : "中"}
          </button>
        </nav>
        <nav className="mt-3 flex flex-wrap items-center justify-center gap-4 text-paper/50">
          <Link to="/about" className="min-h-11 py-2 no-underline">
            {t(locale, "navAbout")}
          </Link>
          <Link to="/privacy" className="min-h-11 py-2 no-underline">
            {t(locale, "navPrivacy")}
          </Link>
          <Link to="/mian" className="min-h-11 py-2 no-underline">
            {t(locale, "navTerms")}
          </Link>
        </nav>
        <p className="mt-3">{t(locale, "footerSub")}</p>
      </footer>
    </div>
  );
}