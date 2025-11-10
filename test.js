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
  /**
   * Animates a single counter element
   * @param {HTMLElement} el - The element to animate
   * @param {number} target - The target value
   * @param {number} duration - Duration of the animation (in ms)
   */
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const targetValue = parseInt(target, 10);

    // If target value is 0, just set it and return
    if (targetValue === 0) {
      el.innerText = "0";
      return;
    }

    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = timestamp - startTimestamp;

      // Calculate current value using an ease-out function (smoother finish)
      const easeOutProgress = 1 - Math.pow(1 - progress / duration, 3);
      let currentValue = Math.floor(easeOutProgress * targetValue);

      // Ensure we don't exceed the target
      currentValue = Math.min(currentValue, targetValue);

      // Update the text (no locale formatting)
      el.innerText = currentValue;

      // Continue animation if time hasn't elapsed
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        // Ensure the final value is exactly the target
        el.innerText = targetValue;
      }
    };

    // Start the animation
    window.requestAnimationFrame(step);
  }

  // --- Using IntersectionObserver to trigger on scroll ---

  const options = {
    root: null, // observe in relation to the viewport
    threshold: 0.5, // trigger when 50% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Check if the element is intersecting (visible)
      if (entry.isIntersecting) {
        const counterEl = entry.target;
        const targetValue = counterEl.getAttribute("data-target");

        // Start the animation
        animateCounter(counterEl, targetValue);

        // Stop observing this element to prevent re-animation
        observer.unobserve(counterEl);
      }
    });
  }, options);

  // Find all elements with [data-target] attribute and start observing them
  const counters = document.querySelectorAll("[data-target]");
  counters.forEach((counter) => {
    observer.observe(counter);
  });
});
