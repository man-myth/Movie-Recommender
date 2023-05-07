import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

var swiper = new Swiper(".mySwiper", {
    modules: [Navigation, Pagination, Autoplay],
    speed: 500,
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
    },

});