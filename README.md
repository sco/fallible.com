# fallible.com

This is fallible.com, the personal weblog of Katy Raymond (active 2000-2012). It also contains Doug Raymond's archived blog, Marginal Comments, at `/marginal`.

The original site was managed with Expression Engine. In 2026,
it was migrated to this codebase, managed with [Eleventy](https://www.11ty.dev/). When pushed to Github, it will automatically build and deploy to Cloudflare. `worker.js` handles legacy redirects, then serves the static build.


## Usage

- `npm i` installs dependencies
- `npm run dev` starts the dev server
- `npm run build` builds the static site in `_site/`

The simplest way to update the content of the site is to use the Github UI to browse the contents of `src/posts/` and modify the Markdown files.


## Contents

- `assets/` contains static resources (CSS etc)
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


## Missing images

These filenames are referenced in `src/` posts or templates but have no file in `assets/`.
Most were images embedded in the original blog that were never committed to this repo.

### Layout / template images (affects all pages)
- `paper_bottom_shadow.gif` — used in `base.njk`; a corrupted copy (`paper_bottom_shadow.gif".html`) exists in assets but isn't served

### Marginal posts
- `potofgold.jpg` — referenced in *Irish Valentine* (not captured in Wayback archive)

### Fallible post images (photo/inline images from original blog)
- `alllison_front_smaller.jpg`
- `DiannPhoto.gif`
- `secretcover.jpg`
- `snow.jpg`, `snow2.jpg` — corrupted `.html` stubs exist in assets but originals not recovered

### Amazon book cover images (linked from old posts)
- `0596527446.01._AA240_SCLZZZZZZZ_V37018616_.jpg`
- `1595541934.01-A2R2RITDJNW1Q6._AA240_SCLZZZZZZZ_V61792386_.jpg`
- `1595542078.01._AA240_SCLZZZZZZZ_V43502523_.jpg`
- `21g9szD9FFL._AA115_.jpg`
- `21YLMpne6qL._AA115_.jpg`


## Nice to have
- [] modernize markup and metadata
- [x] responsive design
- [] more refined mobile design
- [x] favicon
- [x] social posting tags
- [x] search
- [x] dad's posts
- [] test handling/redirects, including http/https, www or not, various permalink formats, etc
- [] comment posting?
- [] GUI editor?
- [] migrate to "Build Awesome"
- [] migrate to .ts templates?
- [] use _redirects instead of worker-based redirs (and thus disable use-worker-first so we can serve from assets?)


