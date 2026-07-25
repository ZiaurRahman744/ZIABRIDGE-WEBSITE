// ================================================
// ZIABRIDGE - MAIN SCRIPT
// ================================================

document.addEventListener("DOMContentLoaded", function () {

  // Header scroll shadow effect
  const header = document.getElementById("siteHeader");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Mobile Hamburger Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuDrawer = document.getElementById("mobileMenuDrawer");

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = mobileMenuDrawer.classList.contains("open");
      mobileMenuDrawer.classList.toggle("open", !isOpen);
      mobileMenuBtn.classList.toggle("active", !isOpen);
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileMenuDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuDrawer.classList.remove("open");
        mobileMenuBtn.classList.remove("active");
      }
    });

    // Close menu when a navigation link inside is clicked
    const mobileLinks = mobileMenuDrawer.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenuDrawer.classList.remove("open");
        mobileMenuBtn.classList.remove("active");
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", function () {
        item.classList.toggle("open");
      });
    }
  });

  // Back To Top Button
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

// Star Rating Selector
  const starSelect = document.getElementById("starSelect");
  if (starSelect) {
    const stars = starSelect.querySelectorAll("span");
    stars.forEach(function (star) {
      star.addEventListener("click", function () {
        const val = parseInt(star.getAttribute("data-value"));
        stars.forEach(function (s, i) {
          s.classList.toggle("active", i < val);
        });
      });
    });
  }

// Language Dropdown Toggle
  const langToggleBtn = document.getElementById("langToggleBtn");
  const langDropdown = document.getElementById("langDropdown");
  if (langToggleBtn && langDropdown) {
    langToggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      langDropdown.classList.toggle("open");
      langToggleBtn.classList.toggle("active");
    });
    document.addEventListener("click", function (e) {
      if (!langDropdown.contains(e.target) && e.target !== langToggleBtn) {
        langDropdown.classList.remove("open");
        langToggleBtn.classList.remove("active");
      }
    });
  }

// Sign In Modal (Placeholder)
  const signInBtn = document.getElementById("signInBtn");
  const signInModal = document.getElementById("signInModal");
  const signInClose = document.getElementById("signInClose");
  if (signInBtn && signInModal && signInClose) {
    signInBtn.addEventListener("click", function () {
      signInModal.classList.add("open");
    });
    signInClose.addEventListener("click", function () {
      signInModal.classList.remove("open");
    });
    signInModal.addEventListener("click", function (e) {
      if (e.target === signInModal) {
        signInModal.classList.remove("open");
      }
    });
  }

  // Modern Corporate Scroll-Reveal Animation Observer
  const revealElements = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ================================================
  // WEBSITE RATING POPUP (Exit Intent & First Visit - Once Per Session)
  // ================================================
  (function initWebsiteRatingPopup() {
    if (sessionStorage.getItem("ziabridge_rating_popup_done")) return;

    // Create popup HTML dynamically if not present
    if (!document.getElementById("ratingPopupOverlay")) {
      const popupHTML = `
        <div class="rating-popup-overlay" id="ratingPopupOverlay" aria-hidden="true">
          <div class="rating-popup-card">
            <button class="rating-popup-close" id="ratingPopupClose" aria-label="Close Rating Modal">&times;</button>
            <div class="rating-popup-icon-wrap">⭐</div>
            <h3>Thank you for visiting ZIABRIDGE.</h3>
            <p>We'd appreciate your quick rating.</p>
            <div class="popup-stars-wrap" id="popupStarSelect">
              <span data-value="1" class="active">&#9733;</span>
              <span data-value="2" class="active">&#9733;</span>
              <span data-value="3" class="active">&#9733;</span>
              <span data-value="4" class="active">&#9733;</span>
              <span data-value="5" class="active">&#9733;</span>
            </div>
            <button type="button" class="btn-popup-submit" id="popupSubmitBtn">Submit Rating</button>
            <div id="popupSuccessMsg" style="display:none; color: #2ECC71; font-weight:800; font-size:14px; margin-top:12px;">
              Thank you for your rating! ⭐
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", popupHTML);
    }

    const overlay = document.getElementById("ratingPopupOverlay");
    const closeBtn = document.getElementById("ratingPopupClose");
    const starContainer = document.getElementById("popupStarSelect");
    const submitBtn = document.getElementById("popupSubmitBtn");
    const successMsg = document.getElementById("popupSuccessMsg");

    if (!overlay) return;

    let selectedStars = 5;
    let hasPopped = false;

    // Interactive Star Handling
    if (starContainer) {
      const stars = starContainer.querySelectorAll("span");
      stars.forEach(function (star) {
        star.addEventListener("click", function () {
          selectedStars = parseInt(star.getAttribute("data-value"));
          stars.forEach(function (s, idx) {
            s.classList.toggle("active", idx < selectedStars);
          });
        });
      });
    }

    function triggerShowPopup() {
      if (hasPopped || sessionStorage.getItem("ziabridge_rating_popup_done")) return;
      hasPopped = true;
      overlay.classList.add("active");
    }

    function dismissPopup() {
      sessionStorage.setItem("ziabridge_rating_popup_done", "true");
      overlay.classList.remove("active");
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", dismissPopup);
    }

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        dismissPopup();
      }
    });

    if (submitBtn) {
      submitBtn.addEventListener("click", function () {
        submitBtn.style.display = "none";
        if (successMsg) successMsg.style.display = "block";
        setTimeout(dismissPopup, 1200);
      });
    }

    // Trigger A: Automatic 6-second timer after initial visit
    const popupTimer = setTimeout(triggerShowPopup, 6000);

    // Trigger B: Exit Intent (mouse moves to top edge)
    document.addEventListener("mouseleave", function (e) {
      if (e.clientY <= 5) {
        clearTimeout(popupTimer);
        triggerShowPopup();
      }
    });
  })();

});


