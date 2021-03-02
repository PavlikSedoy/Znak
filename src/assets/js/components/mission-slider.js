import Swiper from 'swiper/bundle'

const missionSlider = new Swiper('#missionSlider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        prevEl: '#missionSliderPrev',
        nextEl: '#missionSliderPrev',
    },
})