module.exports = function (eleventyConfig) {
  // Copy the ENTIRE existing static site straight through, untouched.
  // This was previously only copying a hand-picked few paths (a leftover
  // from local testing), which meant most of the real site — every other
  // service page, and all 48 Knowledge topic pages — never made it into
  // the deployed build. Fixed: everything real now passes through as-is.
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("pages");
  eleventyConfig.addPassthroughCopy("seo");
  eleventyConfig.addPassthroughCopy("google-apps-script");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("services");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("CNAME");

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site"
    },
    // New CMS-published articles (content/knowledge/*.md) get generated
    // into services/<category>/<slug>.html automatically, landing right
    // alongside the passthrough-copied existing pages above — nothing
    // overwrites or conflicts, since these are new filenames.
  };
};
