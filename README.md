# fallible.com

This is the personal weblog of Katy Raymond, fallible.com (active 2000-2012). The original site was managed with Expression Engine. The new version is published with Eleventy.

When the main branch is pushed to Github, the deploy action will automatically build the static site and sync it to S3.


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
- [] update Amplify app on deploy
- [] fix special characters
  - eg https://main.d13xg7pv9e0jn3.amplifyapp.com/posts/because-im-so-fallible-you-might-win-a-free-book/
- [] modernize markup and metadata
- [] responsive design
- [] script to actually get all slugs
- [] restore images
- [] favicon
- [] social posting tags
- [] handle all old URLs (permanent redirect or nice 404)
  - [x] /fallible/comments/SLUG
- [] search
- [] dad's posts
- [] migrate fallible.com domain
- [] test handling/redirects, including http/https, www or not, various permalink formats, etc
