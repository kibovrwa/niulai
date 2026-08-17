import { Link, createFileRoute } from "@tanstack/react-router";
import { PaperPage } from "@/components/paper-page";
import { useLocale } from "@/lib/i18n";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/mian")({
  head: () =>
    seoHead({
      title: "免责 · 牛来许愿池",
      desc: "玩的。不是投资建议。不是电影官方。",
      path: "/mian",
    }),
  component: MianPage,
});

function MianPage() {
  const en = useLocale((s) => s.locale) === "en";
  return (
    <PaperPage eyebrow={en ? "Rules" : "规矩"} title={en ? "Disclaimer" : "免责"}>
      {en ? (
        <>
          <p>This is a game. The index, the types, the lots, the merit — all play.</p>
          <p>Not investment advice. Not a stock pick. Wins and losses are yours.</p>
          <p>Not the official Niulai film. Not a broker. Not a fund.</p>
          <p>No fees. No real donation box. Nobody places a trade for you.</p>
          <p>The number is serious: once issued, it stays. The jokes are jokes. Don't treat them as prophecy.</p>
          <p>
            About this shrine:
            <Link to="/about" className="mx-1 text-cinnabar">
              About
            </Link>
            . How we keep data:
            <Link to="/privacy" className="mx-1 text-cinnabar">
              Privacy
            </Link>
            .
          </p>
        </>
      ) : (
        <>
          <p>这里是戏。指数、牛相、签、功德，都是玩的。</p>
          <p>不是投资建议。不是荐股。赚了亏了，都跟这座庙无关。</p>
          <p>不是电影《牛来》官方，也不属于任何券商、基金、平台。</p>
          <p>不收费。没有功德箱真收钱。没有人代你下单。</p>
          <p>号是认真的：编出去就不改、不删。内容是戏谑的，别当预言。</p>
          <p>
            关于这座庙，看
            <Link to="/about" className="mx-1 text-cinnabar">
              关于牛来
            </Link>
            。数据怎么放，看
            <Link to="/privacy" className="mx-1 text-cinnabar">
              隐私
            </Link>
            。
          </p>
        </>
      )}
    </PaperPage>
  );
}
