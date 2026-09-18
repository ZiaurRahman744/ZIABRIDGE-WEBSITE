module.exports = function (eleventyConfig) {
  // Copy static assets straight through untouched (mirrors the existing
  // site's own asset folders once merged into the real repo).
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("pages");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("services/third-party-inspection.html");

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    },
    // Markdown files keep their own explicit permalink (set per file via
    // frontmatter), so the URL structure matches the existing site exactly:
    // services/<category>/<slug>.html
  };
};
