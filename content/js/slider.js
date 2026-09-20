// ================================================
// ZIABRIDGE - HERO SLIDER
// ================================================

document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".hero-slide");
  const dotsContainer = document.getElementById("heroDots");

  if (!slides.length) return;

  let currentIndex = 0;

  slides.forEach(function (slide, i) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", function () {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function goToSlide(index) {
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");
    currentIndex = index;
    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  function nextSlide() {
    let next = (currentIndex + 1) % slides.length;
    goToSlide(next);
  }

  // Faster auto-rotate (was 6000ms)
  setInterval(nextSlide, 3500);

});
