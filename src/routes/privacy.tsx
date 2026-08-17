import { Link, createFileRoute } from "@tanstack/react-router";
import { PaperPage } from "@/components/paper-page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seoHead({
      title: "隐私 · 牛来图腾",
      desc: "功德和章存在你手机里。许愿只记那一句和编号。",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PaperPage eyebrow="规矩" title="隐私">
      <p>功德、香牌、给神穿的衣服，存在你自己的手机里。清浏览器，就散了。</p>
      <p>许愿会记下：你选的那一句、可选的落款、一个只增不减的号。用来出单、上榜。</p>
      <p>点「落款」登录，才会有一份会话。用来认人，不拿来卖，也不做广告追踪。</p>
      <p>测相结果默认在你这边。你复制发出去，链接里会带上你的类型，别人才能扫码来测。</p>
      <p>站在 Cloudflare 上。我们不把你的单卖给任何人。</p>
      <p>
        不想留，关掉页面、清掉本站数据即可。看
        <Link to="/mian" className="mx-1 text-cinnabar">
          免责
        </Link>
        。
      </p>
      <p className="text-muted">2026-08-17</p>
    </PaperPage>
  );
}
