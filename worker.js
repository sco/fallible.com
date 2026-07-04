// Redirect table for old ExpressionEngine URL patterns.
// Add entries here as 404 logs reveal broken incoming links.
const REDIRECTS = [
  // /fallible/comments/SLUG  →  /posts/SLUG/
  [/^\/fallible\/comments\/([^/]+)\/?$/, (m) => `/posts/${m[1]}/`],
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    for (const [pattern, dest] of REDIRECTS) {
      const match = url.pathname.match(pattern);
      if (match) {
        return Response.redirect(new URL(dest(match), url).href, 301);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
