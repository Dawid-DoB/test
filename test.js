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
