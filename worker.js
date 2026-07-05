// Redirect table for old ExpressionEngine URL patterns.
// Add entries here as 404 logs reveal broken incoming links.
const REDIRECTS = [
  // /fallible/comments/SLUG  →  /posts/SLUG/
  [/^\/fallible\/comments\/([^/]+)\/?$/, (m) => `/posts/${m[1]}/`],
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // www → bare domain
    if (url.hostname === 'www.fallible.com') {
      url.hostname = 'fallible.com';
      return Response.redirect(url.href, 301);
    }

    // Old URL pattern redirects
    for (const [pattern, dest] of REDIRECTS) {
      const match = url.pathname.match(pattern);
      if (match) {
        return Response.redirect(new URL(dest(match), url).href, 301);
      }
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set('Content-Security-Policy', 'upgrade-insecure-requests');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
