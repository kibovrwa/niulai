import { Link, createFileRoute } from "@tanstack/react-router";
import { PaperPage } from "@/components/paper-page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seoHead({
      title: "关于牛来",
      desc: "民间图腾站。测相、挂号、抽签。非电影官方。",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PaperPage eyebrow="关于" title="牛来图腾">
      <p>这是一座民间庙。神是电影里那头糙牛，也是「来」这个字。</p>
      <p>在这里可以测你是哪种牛、许一句贪、抽一支签、给神披红。号从 8888 起，只加不减。</p>
      <p>不是《牛来》电影官方。不收钱。不荐股。不代客理财。</p>
      <p>
        故事在
        <Link to="/shi" className="mx-1 text-cinnabar">
          前生今世
        </Link>
        。规矩在
        <Link to="/mian" className="mx-1 text-cinnabar">
          免责
        </Link>
        和
        <Link to="/privacy" className="mx-1 text-cinnabar">
          隐私
        </Link>
        。
      </p>
      <p>没有客服电话。有事，就在神前挂号。</p>
      <p className="text-muted">niulai.org</p>
    </PaperPage>
  );
}
