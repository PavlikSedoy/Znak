import Swiper from 'swiper/bundle'

new Swiper('#reviewSlider', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        prevEl: '#reviewsSlider-prev',
        nextEl: '#reviewsSlider-next',
    },
})