import Swiper from 'swiper';
require('lightgallery.js');
require('lg-video.js/dist/lg-video');

// Lightgallery
lightGallery(document.getElementById('itemGallery'))

if ( window.innerWidth < 991 ) {
    // Slider for mobile devices
    new Swiper ('#itemMobileGallery', {
        pagination: {
            el: '.item-mobile-gallery__pagination',
        },
        navigation: {
            nextEl: '.item-mobile-gallery__btn-next',
            prevEl: '.item-mobile-gallery__btn-prev',
        },
    })
    // End slider for mobile devices

    // Lightgallery for mobile devices
    lightGallery(document.getElementById('itemMobileThumb'))
    // End lightgallery for mobile devices
}