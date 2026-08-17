import { Link, createFileRoute } from "@tanstack/react-router";
import { PaperPage } from "@/components/paper-page";
import { useLocale } from "@/lib/i18n";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seoHead({
      title: "关于牛来",
      desc: "路边一座庙。测相、许愿、抽签。不是电影官方。",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  const en = useLocale((s) => s.locale) === "en";
  return (
    <PaperPage eyebrow={en ? "About" : "关于"} title={en ? "NIULAI" : "牛来庙"}>
      {en ? (
        <>
          <p>This is a folk shrine. The god is that janky movie cow. Also the word Come.</p>
          <p>Take a test. Make a wish. Draw a lot. Dress the god. Numbers start at 8888. They only go up.</p>
          <p>Not the official film. No fees. No stock tips. No one trades for you.</p>
          <p>
            The story is on
            <Link to="/shi" className="mx-1 text-cinnabar">
              Story
            </Link>
            . The rules are
            <Link to="/mian" className="mx-1 text-cinnabar">
              Disclaimer
            </Link>
            and
            <Link to="/privacy" className="mx-1 text-cinnabar">
              Privacy
            </Link>
            .
          </p>
          <p>No help desk. If you need something, make a wish.</p>
          <p className="text-muted">niulai.org</p>
        </>
      ) : (
        <>
          <p>这是路边一座庙。神是电影里那头糙牛，也是「来」这个字。</p>
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
        </>
      )}
    </PaperPage>
  );
}
