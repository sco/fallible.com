# Fallible.com

This is the source code for [https://fallible.com/](Fallible), the personal weblog of Katy Raymond (active 2000-2012). It also contains Doug Raymond's blog, [https://fallible.com/marginal/](Marginal Comments).

The original site was managed with Expression Engine. In 2026,
it was migrated to this codebase, managed with the static-site generator [Eleventy](https://www.11ty.dev/). When pushed to Github, the site is built and deploy to Cloudflare, which runs `worker.js` to handle legacy redirects, then serves the static build.


## Usage

- `npm i` installs dependencies
- `npm run dev` starts the dev server, with live-reload
- `npm run build` builds the static site in `_site/`

The simplest way to update the content of the site is to use the Github UI to browse the contents of `src/posts/` and modify the Markdown files. To update the site templates, see `src/_includes/base.njk` and `src/_includes/post.njk`. To change the generated pages, see `src/index.njk` anr `src/archive.njk`.


## Contents

- `assets/` contains static resources (images, CSS etc)
- `src/` contains the content and templates for the site
- `eleventy.config.js` is the config for the site builder
- `.github/workflows/main.yml` defines the deployment script


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
- [x] handle all old URLs (permanent redirect or nice 404)
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
- [x] dad's posts
- [x] test handling/redirects, including http/https, www or not, various permalink formats, etc
- [] new comment posting?
- [] GUI editor?
- [] migrate to "Build Awesome"
- [] migrate to .ts templates?
- [] use _redirects instead of worker-based redirs (and thus disable use-worker-first so we can serve from assets?)
- [] use cloudflare worker cache? (maybe not because it charges for assets)
- [] drop https?
- [] bsky support?
- [] threads integration?
- 

## Missing images
- `paper_bottom_shadow.gif` — used in `base.njk`; a corrupted copy (`paper_bottom_shadow.gif".html`) exists in assets but isn't served
- `potofgold.jpg` — referenced in *Irish Valentine* (not captured in Wayback archive)
- `alllison_front_smaller.jpg` missing
- `DiannPhoto.gif` missing
- `secretcover.jpg` missing
- `snow.jpg`, `snow2.jpg` — corrupted `.html` stubs exist in assets but originals not recovered
- `0596527446.01._AA240_SCLZZZZZZZ_V37018616_.jpg` (missing amazon cover)
- `1595541934.01-A2R2RITDJNW1Q6._AA240_SCLZZZZZZZ_V61792386_.jpg` (missing amazon cover)
- `1595542078.01._AA240_SCLZZZZZZZ_V43502523_.jpg` (missing amazon cover)
- `21g9szD9FFL._AA115_.jpg` (missing amazon cover)
- `21YLMpne6qL._AA115_.jpg` (missing amazon cover)




