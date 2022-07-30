const swiper = new Swiper(".sliders", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination

  // Navigation arrows
  navigation: {
    nextEl: ".slide-block__next",
    prevEl: ".slide-block__prew",
  },
  thumbs: {
    // swiper: swiper2,
  },
  // And if we need scrollbar
});

const swiper2 = new Swiper(".minislider", {
  // Optional parameters
  spaceBetween: 30,
  direction: "horizontal",
  // loop: true,
  slidesPerView: 3,
    navigation: {
    // nextEl: ".slide-block__next",
    // prevEl: ".slide-block__prew",
  },
  // If we need pagination

  // Navigation arrows

  // And if we need scrollbar
});


