import { Hall } from "@/components/hall";
import { SiteChrome } from "@/components/site-chrome";

export function PaperPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SiteChrome>
      <Hall>
        <p className="text-center font-brush text-gold-soft">{eyebrow}</p>
        <h1 className="text-center font-display text-4xl tracking-widest">{title}</h1>
        <div className="mt-6 space-y-4 rounded-sm bg-paper px-5 py-5 text-sm leading-relaxed text-ink">
          {children}
        </div>
      </Hall>
    </SiteChrome>
  );
}
