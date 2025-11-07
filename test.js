    var swiper = new Swiper("#swiper", {
      slidesPerView: 6,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
