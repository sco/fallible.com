module.exports = {
  layout: "marginal-post.njk",
  tags: ["marginalPost"],
  eleventyComputed: {
    permalink: data => `/marginal/${data.page.fileSlug}/`
  }
};
