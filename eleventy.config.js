module.exports = function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", mdLib => mdLib.set({ typographer: true, html: true }));
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .filter(p => !p.data.attitude)
      .sort((a, b) => (b.date || 0) - (a.date || 0));
  });
  eleventyConfig.addCollection("marginalPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/marginal/posts/*.md")
      .sort((a, b) => (b.date || 0) - (a.date || 0));
  });
  eleventyConfig.addFilter("excerpt", (content) => {
    const text = content
      .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, "")
      .replace(/<p class="post-date">[\s\S]*?<\/p>/g, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 160 ? text.slice(0, 157) + "…" : text;
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date);
  });
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
