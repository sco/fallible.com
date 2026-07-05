const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({"original-site-mirror/images": "images"});
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => (b.date || 0) - (a.date || 0));
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

