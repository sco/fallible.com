# fallible.com

This is fallible.com, the personal weblog of Katy Raymond (active 2000-2012). The site will automatically update when changes are pushed to the main branch on [Github](https://github.com/sco/fallible.com).

The original site was managed with Expression Engine. In 2026,
it was migrated to this codebase, managed with [Eleventy](https://www.11ty.dev/). 


## Usage

- `npm i` installs dependencies
- `npm run dev` starts the dev server
- `npm run build` builds the static site in `_site/`

The simplest way to update the content of the site is to use the Github UI to browse the contents of `src/posts/` and modify the Markdown files.


## Contents

- `original-site-mirror/` is an (intended) mirror of the original site, crawled in December 2025
- `assets/` contains static resources (CSS etc)
- `src/` contains the content and templates for the site
- `.eleventy.js` is the config for the site builder
- `.github/workflows/main.yml` defines the deployment script
- `scripts/mirror-fallible.sh` attempts to mirror the full fallible.com site
- `scripts/fetch-post.js` fetches post pages from the live site and saves the HTML
- `scripts/generate-markdown.js` processes those files into `src/posts`


## TODO
- [x] render comments, post date, etc
- [x] re-implement design
- [x] CI to deploy to s3
- [x] posts on home page
- [x] formatted dates everywhere
- [x] archive page
- [x] restore images
- [x] auto deployment
- [x] fix special characters
- [] handle all old URLs (permanent redirect or nice 404)
  - [x] /fallible/comments/SLUG
- [x] migrate fallible.com domain
- [x] fix broken images (eg /posts/the-partys-over/)


## Nice to have
- [] modernize markup and metadata
- [x] responsive design
- [] more refined mobile design
- [x] favicon
- [x] social posting tags
- [x] search
- [] dad's posts
- [] test handling/redirects, including http/https, www or not, various permalink formats, etc
- [] comments?
- [] recommended GUI editor?
- [] migrate to "Build Awesome"
- [] migrate to .ts templates?
- [] use _redirects instead of worker-based redirs (and thus disable use-worker-first so we can serve from assets?)
- 


