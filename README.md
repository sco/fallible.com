# Fallible.com

[Fallible.com](https://fallible.com/) is a personal weblog archive for Katy Raymond (active 2000–2012), which also hosts Doug Raymond's blog, [Marginal Comments](https://fallible.com/marginal/). The stack:

- **Eleventy** static site generator, building from `src/` into `_site/`
- **Cloudflare** for hosting, with a `worker.js` that handles legacy URL redirects
- **GitHub Actions** for CI/CD — push triggers a build and deploy

The content lives in `src/posts/` as Markdown files, with Nunjucks templates (`base.njk`, `post.njk`) and generated pages for the home, archive, and 404. Originally managed with Expression Engine, the site was migrated to this codebase in 2026.


## Usage

- `npm i` installs dependencies
- `npm run dev` starts the dev server, with live-reload
- `npm run build` builds the static site in `_site/`

The simplest way to update the content of the site is to use the Github UI to browse the contents of `src/posts/` and modify the Markdown files. To update the site templates, see `src/_includes/base.njk` and `src/_includes/post.njk`. To change the generated pages, see `src/index.njk` and `src/archive.njk`.


## Editing posts with Typora

[Typora](https://typora.io) is a clean visual Markdown editor that works well for browsing and editing the posts in `src/posts/`.

**Install:** Download and install Typora from typora.io, then open the `src/posts/` folder via File → Open Folder.

**Fix the file limit:** Typora's Article view defaults to showing only 500 files. Since this archive has 1200+ posts, increase the limit by editing `~/.config/Typora/conf/conf.user.json` (Linux) or `~/Library/Application Support/abnerworks.Typora/conf/conf.user.json` (Mac) and setting:

```json
"maxFetchCountOnFileList": 2000
```

Restart Typora after saving.

**Auto-sync to GitHub:** The script `sync.sh` at the root of this repo commits and pushes any changes automatically. It only runs if there are actual edits — no changes, no commit.

To run it hourly on **Mac**, create `~/Library/LaunchAgents/com.fallible.sync.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.fallible.sync</string>
    <key>ProgramArguments</key>
    <array>
        <string>/path/to/your/clone/sync.sh</string>
    </array>
    <key>StartInterval</key>
    <integer>3600</integer>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
```

Then load it: `launchctl load ~/Library/LaunchAgents/com.fallible.sync.plist`

To unload/disable: `launchctl unload ~/Library/LaunchAgents/com.fallible.sync.plist`

On **Linux** (systemd), two unit files are included in `.config/systemd/user/` — `fallible-sync.service` and `fallible-sync.timer`. Enable and start with:

```
systemctl --user enable --now fallible-sync.timer
```

Disable with:

```
systemctl --user disable --now fallible-sync.timer
```

Run a one-off sync at any time with:

```
systemctl --user start fallible-sync.service
```


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




