import { Link, useRouterState } from "@tanstack/react-router";
import { CreedMark } from "@/components/creed-mark";
import { KaiGuang } from "@/components/kai-guang";
import { t, useLocale } from "@/lib/i18n";
import { fireShare, homeShare } from "@/lib/share";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const locale = useLocale((s) => s.locale) === "en" ? "en" : "zh";
  const setLocale = useLocale((s) => s.setLocale);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const quizzing = path === "/ce" || path.startsWith("/ce/");
  const showShare = !quizzing;

  return (
    <div className="relative min-h-dvh bg-ink text-paper">
      {quizzing ? null : <CreedMark tone="dark" />}
      {quizzing ? null : <KaiGuang />}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-14 items-center justify-between px-3 sm:px-6">
        <Link
          to="/"
          className="pointer-events-auto flex h-9 items-center gap-2 text-paper no-underline"
        >
          <img
            src="/logo.png"
            alt=""
            className="h-8 w-8 rounded-full object-cover"
            crossOrigin="anonymous"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-widest text-cow">
              {locale === "en" ? "niulai" : "牛来"}
            </span>
            {locale === "en" ? null : (
              <span className="mt-0.5 text-[9px] tracking-[0.2em] text-gold-soft">许愿池</span>
            )}
          </span>
        </Link>
        <div className="pointer-events-auto flex h-9 items-center">
          <div className="flex h-7 items-center overflow-hidden rounded-sm border border-gold-soft/45">
            <button
              type="button"
              onClick={() => setLocale("zh")}
              className={`flex h-7 w-7 items-center justify-center text-[11px] leading-none ${locale === "zh" ? "bg-cow text-ink" : "text-gold-soft"}`}
              aria-pressed={locale === "zh"}
            >
              中
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`flex h-7 w-7 items-center justify-center text-[11px] leading-none ${locale === "en" ? "bg-cow text-ink" : "text-gold-soft"}`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>
          {showShare ? (
            <button
              type="button"
              onClick={() => void fireShare(homeShare())}
              className="flex h-9 items-center px-2.5 font-display text-sm tracking-widest text-gold-soft"
            >
              {t(locale, "navShare")}
            </button>
          ) : null}
          {quizzing ? null : (
            <Link
              to="/ce"
              className="flex h-9 items-center px-2.5 text-xs tracking-widest text-gold-soft/80 no-underline"
            >
              {t(locale, "navNbti")}
            </Link>
          )}
        </div>
      </header>
      {children}
      {quizzing ? null : (
        <footer className="bg-ink px-4 py-5 text-center text-[11px] leading-relaxed text-muted">
          <p className="font-brush text-base text-gold/85">{t(locale, "tagline")}</p>
          <p className="mt-1">
            {locale === "zh" ? "此页已开光 · 非电影官方" : "Consecrated. Not the film."}
          </p>
          <nav className="mt-2 flex flex-wrap items-center justify-center gap-x-4 text-gold-soft">
            <Link to="/xiang" className="inline-flex min-h-9 items-center no-underline">
              {t(locale, "navXiang")}
            </Link>
            <Link to="/about" className="inline-flex min-h-9 items-center no-underline">
              {t(locale, "navAbout")}
            </Link>
            <Link to="/mian" className="inline-flex min-h-9 items-center no-underline">
              {t(locale, "navTerms")}
            </Link>
          </nav>
        </footer>
      )}
    </div>
  );
}
