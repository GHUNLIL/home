const notFoundPage = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex,follow" />
    <title>页面不存在 · UNLIL</title>
    <style>
      :root { color-scheme: dark; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; background: #000; color: #faf7f1; }
      body { min-height: 100vh; margin: 0; display: grid; place-content: center; gap: 1rem; padding: 2rem; text-align: center; }
      h1, p { margin: 0; }
      h1 { font-size: clamp(3rem, 12vw, 6rem); }
      a { color: #faf7f1; }
    </style>
  </head>
  <body>
    <h1>404</h1>
    <p>这个页面不存在。</p>
    <p><a href="https://unlil.com/">返回 UNLIL 主页</a></p>
  </body>
</html>`;

const staticPrefixes = [
  "/assets/",
  "/font/",
  "/images/",
  "/speechlocal/",
  "/workbox-",
];
const rootFiles = new Set([
  "/404.html",
  "/favicon.ico",
  "/manifest.webmanifest",
  "/registerSW.js",
  "/robots.txt",
  "/sitemap.xml",
  "/sw.js",
]);

export function middleware({ request, next, redirect }) {
  const url = new URL(request.url);

  if (url.protocol === "http:" || url.hostname === "www.unlil.com") {
    url.protocol = "https:";
    url.hostname = "unlil.com";
    return redirect(url.toString(), 301);
  }

  if (url.pathname === "/index.html") {
    url.pathname = "/";
    return redirect(url.toString(), 301);
  }

  if (
    url.pathname === "/" ||
    rootFiles.has(url.pathname) ||
    staticPrefixes.some((prefix) => url.pathname.startsWith(prefix))
  ) {
    return next();
  }

  return new Response(notFoundPage, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex, follow",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export const config = {
  matcher: "/:path*",
};
