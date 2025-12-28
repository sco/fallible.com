This project manages an archived version of the weblog fallible.com (2000-2012). The original site was managed with Expression Engine. The new version is published with Eleventy.

- `scripts/mirror-fallible.sh` attempts to mirror the full fallible.com site
- `scripts/fetch-post.js` fetches post pages from the live site and saves the HTML
- `generate-markdown.js` processes those files into `src/posts`
- `npx eleventy --serve` builds and serves the new site


## TODO
- [] script to actually get all slugs
- [] restore images
- [x] re-implement design
- [x] render comments, post date, etc
- [] handle all old URLs (permanent redirect or nice 404)
- [] modernize markup and metadata
- [] responsive design
- [] CI to deploy to s3