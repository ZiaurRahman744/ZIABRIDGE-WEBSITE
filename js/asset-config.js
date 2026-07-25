/**
 * ZIABRIDGE Modular Visual Asset & Branding Manager
 * 
 * Instructions for easy future editing:
 * Simply update any path in the ZIABRIDGE_ASSETS object below to change
 * logos, founder portraits, hero images, or portfolio visuals across the entire website automatically!
 */

window.ZIABRIDGE_ASSETS = {
  // Brand Logos & Favicons (PNG & SVG)
  logo: {
    header: "assets/images/logo/logo-website.png",
    main: "assets/images/logo/logo-main.png",
    footer: "assets/images/logo/logo-white.png",
    favicon: "assets/images/logo/favicon.png"
  },

  // Founder & Leadership Team
  team: {
    founderName: "Mohammad Rahat",
    founderTitle: "Founder & CEO",
    founderPortraitJpg: "assets/images/team/founder-portrait.jpg",
    founderDeskJpg: "assets/images/team/founder-desk.jpg",
    teamInspectionJpg: "assets/images/team/team-inspection.jpg"
  },

  // Homepage Hero Banners
  hero: {
    slide1Jpg: "assets/images/hero/hero-01.jpg",
    slide2Jpg: "assets/images/hero/hero-02.jpg",
    slide3Jpg: "assets/images/hero/hero-03.jpg"
  },

  // Service Visuals
  services: {
    inspectionJpg: "assets/images/services/inspection-service.jpg",
    thirdPartyJpg: "assets/images/services/third-party-inspection.jpg",
    productionJpg: "assets/images/services/production-support.jpg",
    sourcingJpg: "assets/images/services/sourcing-service.jpg",
    developmentJpg: "assets/images/services/apparel-development.jpg",
    digitalJpg: "assets/images/services/digital-solutions.jpg"
  },

  // Section Backgrounds
  sections: {
    aboutBanner: "assets/images/sections/about-banner.jpg",
    contactHero: "assets/images/sections/contact-hero.jpg",
    industriesBg: "assets/images/sections/industries-bg.jpg",
    processBg: "assets/images/sections/process-bg.jpg",
    ctaBg: "assets/images/sections/cta-bg.jpg"
  }
};

// Auto-initialize asset bindings on DOM load
document.addEventListener("DOMContentLoaded", function () {
  const assets = window.ZIABRIDGE_ASSETS;
  if (!assets) return;

  // Bind dynamic header logos
  const headerLogos = document.querySelectorAll(".logo-img");
  headerLogos.forEach(img => {
    if (img.getAttribute("data-auto-bind") !== "false" && assets.logo.header) {
      // Keep relative path adjustment if inside pages/
      const isSubPage = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/services/");
      const prefix = isSubPage ? "../" : "";
      img.src = prefix + assets.logo.header;
    }
  });

  // Bind dynamic footer logos
  const footerLogos = document.querySelectorAll(".footer-logo");
  footerLogos.forEach(img => {
    const isSubPage = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/services/");
    const prefix = isSubPage ? "../" : "";
    img.src = prefix + assets.logo.footer;
  });
});
