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
    
    function animateCounter(el, target, duration = 3000) {
        let start = 0;
        const targetValue = parseInt(target, 10);
        
        if (targetValue === 0) {
            el.innerText = '0';
            return;
        }

        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            
            const progress = timestamp - startTimestamp;
            const easeOutProgress = 1 - Math.pow(1 - (progress / duration), 3);
            let currentValue = Math.floor(easeOutProgress * targetValue);
            currentValue = Math.min(currentValue, targetValue);

            el.innerText = currentValue.toLocaleString('pl-PL');

            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                el.innerText = targetValue.toLocaleString('pl-PL');
            }
        };
        window.requestAnimationFrame(step);
    }

    const options = {
        root: null,
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const licznikEl = entry.target;
                const targetValue = licznikEl.getAttribute('data-target');
                
                animateCounter(licznikEl, targetValue);
                observer.unobserve(licznikEl);
            }
        });
    }, options);

    const liczniki = document.querySelectorAll('[data-target]');
    liczniki.forEach(licznik => {
        observer.observe(licznik);
    });

});
