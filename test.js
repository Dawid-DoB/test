    var swiper = new Swiper("#swiper", {
      slidesPerView: 5,
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
