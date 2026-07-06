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


## Missing images

These filenames are referenced in `src/` posts or templates but have no file in `assets/`.
Most were images embedded in the original blog that were never committed to this repo.

### Layout / template images (affects all pages)
- `paper_bottom_shadow.gif` — used in `base.njk`; a corrupted copy (`paper_bottom_shadow.gif".html`) exists in assets but isn't served

### Marginal posts
- `potofgold.jpg` — referenced in *Irish Valentine* (not captured in Wayback archive)

### Fallible post images (photo/inline images from original blog)
- `2clowns.jpg`, `2clowns2.jpg`, `8clowns.jpg`, `8clowns2.jpg`, `8ladies.jpg`
- `3rdGradeClass1.jpg`, `3rdGradeClass2.jpg`, `8thGradeKaty+Patty.jpg`
- `alllison_front_smaller.jpg`
- `backyard.jpg`, `backyard2.jpg`
- `bandage.jpg`, `bedside.jpg`, `beth.jpg`
- `belongsto1.jpg`, `belongsto2.jpg`
- `Carol_For_Christmas.jpg`, `Carol_For_Christmas2.jpg`
- `carrie-marc.jpg`, `carrie-marc2.jpg`
- `club.jpg`, `computer.jpg`, `computer2.jpg`, `cousins.jpg`
- `davebarrycard1.jpg`, `davebarrycard2.jpg`
- `dave-laughing1.jpg`, `dave-laughing2.jpg`
- `desk.jpg`, `desk2.jpg`
- `DiannPhoto.gif`
- `doug-carrie1.jpg`, `doug-kevin-katy1.jpg`, `doug-kevin-katy2.jpg`
- `Dun-Aengus-Ireland.jpg`, `Dun-Aengus-Ireland2.jpg`
- `fallible-bahrain-blocked_thumb.jpg`, `fallible-bahrain-arabic_thumb.jpg`
- `fireplace.jpg`
- `garden092_thumb.jpg`, `garden093_thumb.jpg`, `garden094_thumb.jpg`, `garden096_thumb.jpg`
- `grand-houseT.jpg`, `grand-house.jpg`
- `grandpas_house.jpg`, `grandpas_house2.jpg`
- `grass.jpg`
- `hail-damge_thumb.jpg`, `large-hail_thumb.jpg`
- `john_mckenna_th.jpg`
- `katy-beth.jpg`, `katyCarrie.jpg`
- `katy-catherine.jpg`, `katy-catherine2.jpg`
- `katy-dave1.jpg`, `katy-dave2.jpg`
- `katy+doug1.jpg`, `katy+doug2.jpg`
- `KatyMcKenna1959T.jpg`, `KatyMcKenna1959.jpg`, `katy1959.jpg`
- `katy-night.jpg`
- `katy-patty-boat1.jpg`, `katy-patty-boat2.jpg`
- `katy-podge.jpg`, `katy-podge2.jpg`
- `katy-rocks.jpg`, `katy-rocks2.jpg`
- `katyruns.jpg`
- `kellams.jpg`
- `kevvie.jpg`, `kevvie2.jpg`
- `kiss.jpg`, `knot.jpg`
- `lisaandkaty.jpg`, `list.gif`
- `loft1.jpg`, `loft2.jpg`
- `lowlands.jpg`
- `MarcCarrieDoug.jpg`
- `Marydemuth.jpg`, `marylaugh.jpg`
- `medal.jpg`, `mom1.jpg`, `mom2.jpg`
- `my-name-is-russell-fink.jpg`
- `nest.jpg`, `notebook.jpg`
- `passport1.jpg`, `passport2.jpg`
- `penneys2.jpg`, `phoneboothbank.jpg`, `place.jpg`
- `quinns1.jpg`, `quinns2.jpg`
- `raymond1_thumb.jpg`, `raymond5_thumb.JPG`
- `Robin_Lee_Hatcher.jpg`, `Robin_Lee_Hatcher2.jpg`
- `school-treeT.jpg`, `school-tree.jpg`
- `scott+brooke2.jpg`, `scott+brooke.jpg`
- `scottishlass.jpg`
- `secretcover.jpg`
- `shelves.jpg`, `shelves2.jpg`
- `shoes-bags.jpg`
- `sisters1.jpg`, `sisters2.jpg`
- `snyder.jpg`, `stairs-top.jpg`
- `sticker.gif`
- `tag1.jpg`, `tag3.jpg`, `tag6.jpg`
- `tennisballs.jpg`
- `victory.jpg`
- `wedding-large.jpg`, `wedding-small.jpg`
- `snow.jpg`, `snow2.jpg`

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
- [] dad's posts
- [] test handling/redirects, including http/https, www or not, various permalink formats, etc
- [] comments?
- [] recommended GUI editor?
- [] migrate to "Build Awesome"
- [] migrate to .ts templates?
- [] use _redirects instead of worker-based redirs (and thus disable use-worker-first so we can serve from assets?)
- 


