import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { seoHead } from "@/lib/seo";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => {
    const seo = seoHead({
      title: "测你是哪种牛",
      desc: "牛来许愿池。八题出美牛牛、牛跃亭、核动力牛。许愿、抽签。",
      path: "/",
    });
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#1a1610" },
        { name: "apple-mobile-web-app-title", content: "牛来许愿池" },
        ...seo.meta,
      ],
      links: [
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
        { rel: "icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/__grok/manifest.webmanifest" },
        { rel: "preload", href: "/logo.png", as: "image" },
        { rel: "preload", href: "/art/totem-god.jpg", as: "image" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+XiaoWei&display=swap",
        },
        { rel: "stylesheet", href: appCss },
        ...seo.links,
      ],
    };
  },
  component: () => (
    <html lang="zh-CN" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "牛来许愿池",
              alternateName: [
                "牛来",
                "牛来庙",
                "牛来图腾",
                "niulai",
                "NIULAI",
                "niulai.org",
              ],
              url: "https://niulai.org",
              inLanguage: "zh-CN",
              description: "牛来许愿池。测你是哪种牛。许愿、抽签。不是电影官方。",
              keywords: "牛来许愿池,牛来,测你是哪种牛,NBTI,许愿,niulai",
              publisher: {
                "@type": "Organization",
                name: "牛来许愿池",
                alternateName: "niulai",
                url: "https://niulai.org",
                logo: "https://niulai.org/logo.png",
              },
            }),
          }}
        />
      </head>
      <body className="bg-ink text-paper">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
