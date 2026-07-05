const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", markdownIt({ typographer: true }));
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({"original-site-mirror/images": "images"});
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => (b.date || 0) - (a.date || 0));
  });
  eleventyConfig.addCollection("mainPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .filter(p => !p.data.attitude)
      .sort((a, b) => (b.date || 0) - (a.date || 0));
  });
  eleventyConfig.addFilter("olderPost", (collection, url) => {
    const i = collection.findIndex(p => p.url === url);
    return i < collection.length - 1 ? collection[i + 1] : null;
  });
  eleventyConfig.addFilter("newerPost", (collection, url) => {
    const i = collection.findIndex(p => p.url === url);
    return i > 0 ? collection[i - 1] : null;
  });
  eleventyConfig.addFilter("excerpt", (content) => {
    const text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return text.length > 160 ? text.slice(0, 157) + "…" : text;
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
    const dt = dateObj instanceof Date
      ? DateTime.fromJSDate(dateObj, { zone: "utc" })
      : DateTime.fromISO(dateObj, { zone: "utc" });
    return dt.toLocaleString(DateTime.DATE_FULL);
  });
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};

