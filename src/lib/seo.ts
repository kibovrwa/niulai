import { SITE } from "@/lib/share";

export function seoHead({
  title,
  desc,
  path = "/",
}: {
  title: string;
  desc: string;
  path?: string;
}) {
  const url = path.startsWith("http") ? path : `${SITE}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "牛来图腾" },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:image", content: `${SITE}/og.jpg` },
      { property: "og:image:alt", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}