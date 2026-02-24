/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  if (!backToTopButton) return;
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 700) {
      isBackToTopRendered = true;
      alterStyles(isBackToTopRendered);
    } else {
      isBackToTopRendered = false;
      alterStyles(isBackToTopRendered);
    }
  });
}

const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const slides = carousel.querySelectorAll("[data-carousel-slide]");
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");
  const controls = prevBtn?.parentElement;

  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let dots = [];

  if (controls && slides.length > 1) {
    const dotsEl = document.createElement("div");
    dotsEl.className = "carousel__dots";

    dots = Array.from({ length: slides.length }, (_, i) => {
      const dot = document.createElement("span");
      dot.className = "carousel__dot";
      dot.setAttribute("aria-hidden", "true");
      dot.textContent = i === 0 ? "●" : "○";
      dotsEl.appendChild(dot);
      return dot;
    });

    carousel.appendChild(dotsEl);
  }

  const renderSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.textContent = i === index ? "●" : "○";
      dot.classList.toggle("is-active", i === index);
    });
  };

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    renderSlide(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    renderSlide(currentIndex);
  });
});
