import { BlessRain } from "@/components/bless-rain";
import { CreedMark } from "@/components/creed-mark";

export function Hall({
  children,
  totem = true,
  wide = false,
  rain = false,
}: {
  children: React.ReactNode;
  totem?: boolean;
  wide?: boolean;
  rain?: boolean;
}) {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden pb-16 pt-20 text-paper">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/art/grass.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/28 to-ink/92" />
      <CreedMark tone="dark" />
      {rain ? <BlessRain /> : null}
      <div className={`relative z-10 mx-auto px-4 ${wide ? "max-w-3xl" : "max-w-md"}`}>
        {totem ? (
          <div className="relative mx-auto mb-5 w-fit">
            <span
              className="halo-ring pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-halo/40 blur-2xl"
              aria-hidden
            />
            <img
              src="/art/totem-god.jpg"
              alt=""
              className="relative z-10 w-24 object-contain"
              crossOrigin="anonymous"
            />
          </div>
        ) : null}
        {children}
      </div>
    </main>
  );
}
