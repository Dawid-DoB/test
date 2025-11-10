var swiper = new Swiper("#swiper", {
  slidesPerView: 5,
  spaceBetween: 0,
  centeredSlides: true,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

document.addEventListener("DOMContentLoaded", () => {
  function animateCounter(el, target, duration = 2000) {
    const targetValue = parseInt(target, 10);

    if (targetValue === 0) {
      el.innerText = "0";
      return;
    }

    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = timestamp - startTimestamp;

      let currentValue = Math.floor((progress / duration) * targetValue);

      currentValue = Math.min(currentValue, targetValue);

      el.innerText = currentValue;

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        el.innerText = targetValue;
      }
    };

    window.requestAnimationFrame(step);
  }

  const options = {
    root: null,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counterEl = entry.target;
        const targetValue = counterEl.getAttribute("data-target");

        animateCounter(counterEl, targetValue);
        observer.unobserve(counterEl);
      }
    });
  }, options);

  const counters = document.querySelectorAll("[data-target]");
  counters.forEach((counter) => {
    observer.observe(counter);
  });
});
