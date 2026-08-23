export function middleware({ request, next, redirect }) {
  const url = new URL(request.url);

  if (url.protocol === "http:" || url.hostname === "www.unlil.com") {
    url.protocol = "https:";
    url.hostname = "unlil.com";
    return redirect(url.toString(), 301);
  }

  return next();
}

export const config = {
  matcher: "/:path*",
};
