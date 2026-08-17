import { SITE } from "@/lib/share";

export const BRAND = "牛来庙";
export const KEYWORDS = [
  "niulai",
  "niulai.org",
  "NIULAI",
  "牛来",
  "牛来庙",
  "牛来许愿池",
  "牛来图腾",
  "牛来电影",
  "NBTI",
  "niulai NBTI",
  "牛来指数",
  "测你是哪种牛",
  "核动力牛",
  "美牛牛",
  "套死牛",
  "牛跃亭",
  "牛蛛侠",
  "牛斯克",
  "牵牛花",
  "牛大腿",
  "吸牛",
  "牛来本牛",
  "许愿",
  "抽签",
].join(",");

function withBrand(title: string) {
  const cleaned = title.replaceAll("牛来图腾", BRAND);
  if (/niulai/i.test(cleaned)) return cleaned;
  return `${cleaned} · niulai`;
}

export function seoHead({
  title,
  desc,
  path = "/",
}: {
  title: string;
  desc: string;
  path?: string;
}) {
  const named = withBrand(title);
  const namedDesc = /牛来/.test(desc) ? desc.replaceAll("牛来图腾", BRAND) : `${BRAND}。${desc}`;
  const url = path.startsWith("http") ? path : `${SITE}${path}`;
  return {
    meta: [
      { title: named },
      { name: "description", content: namedDesc },
      { name: "keywords", content: KEYWORDS },
      { name: "author", content: BRAND },
      { name: "application-name", content: "niulai" },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: named },
      { property: "og:description", content: namedDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "niulai" },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:image", content: `${SITE}/og-card.jpg` },
      { property: "og:image:width", content: "800" },
      { property: "og:image:height", content: "800" },
      { property: "og:image:alt", content: named },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: named },
      { name: "twitter:description", content: namedDesc },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "sitemap", type: "application/xml", href: `${SITE}/sitemap.xml` },
    ],
  };
}
