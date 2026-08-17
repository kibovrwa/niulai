import { Link, createFileRoute } from "@tanstack/react-router";
import { PaperPage } from "@/components/paper-page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/mian")({
  head: () =>
    seoHead({
      title: "免责 · 牛来图腾",
      desc: "玩的。不是投资建议。不是电影官方。",
      path: "/mian",
    }),
  component: MianPage,
});

function MianPage() {
  return (
    <PaperPage eyebrow="规矩" title="免责">
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
    </PaperPage>
  );
}
