# fallible.com

This is the personal weblog of Katy Raymond, fallible.com (active 2000-2012). The original site was managed with Expression Engine. The new version is published with Eleventy.

When the main branch is pushed to Github, 


## Usage

- `npx eleventy` # builds the static site
- `npx eleventy --serve` starts a development server


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
- [] script to actually get all slugs
- [] restore images
- [] handle all old URLs (permanent redirect or nice 404)
  - [x] /fallible/comments/SLUG
- [] modernize markup and metadata
- [] responsive design
- [] search
- [] dad's posts
