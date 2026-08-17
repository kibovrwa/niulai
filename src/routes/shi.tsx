import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site-chrome";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/shi")({
  head: () =>
    seoHead({
      title: "前生今世 · 牛来图腾",
      desc: "牛来不是一只牛。是「来」成了神。从前生的路边塑像，到今世的民间挂号。",
      path: "/shi",
    }),
  component: ShiPage,
});

function ShiPage() {
  return (
    <SiteChrome>
      <main className="bg-paper px-4 pb-16 pt-24 text-ink sm:px-6">
        <article className="mx-auto max-w-lg">
          <p className="font-brush text-cinnabar">前生今世</p>
          <h1 className="mt-1 font-display text-4xl tracking-widest">不是牛。是「来」。</h1>
          <img
            src="/art/totem-god.jpg"
            alt="牛来图腾"
            className="mt-6 w-full rounded-sm object-cover"
            width={800}
            height={1200}
          />
          <div className="mt-8 space-y-5 text-sm leading-relaxed">
            <p>
              前生，它是路边一尊很糙的塑像。绊倒过。被人笑过。泥是黄的，眼神是正面的。没有庙产，没有香火账。
            </p>
            <p>
              有人从电影院走出来，把它认成了神。不是因为它灵，是因为它像他们：倒过，还站着；丑，但不让。
            </p>
            <p>
              今世，它不再是一只动物。牛和股票同音，来是一个动词。两件事叠在同一张脸上，民间就开始挂号。号从八千八百八十八起，只增不减。
            </p>
            <p>
              不收钱。不代客理财。不官方。若干年后，人走了，号还在。像一座没人看管的庙，过年还是有人来贴一张。
            </p>
            <p>
              测 NBTI，是问你前生像哪种牛，今世又在哪一盘里。解读是戏谑的。号是认真的。
            </p>
          </div>
          <div className="mt-8 grid gap-2">
            <Link
              to="/ce"
              className="flex min-h-12 items-center justify-center rounded-sm bg-cinnabar font-display tracking-widest text-paper no-underline"
            >
              测你的前生今世
            </Link>
            <Link
              to="/"
              className="flex min-h-11 items-center justify-center text-sm text-muted no-underline"
            >
              回去看神
            </Link>
          </div>
        </article>
      </main>
    </SiteChrome>
  );
}
