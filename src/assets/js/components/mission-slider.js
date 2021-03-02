import Swiper from 'swiper/bundle'

const missionSlider = new Swiper('#missionSlider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        prevEl: '#missionSliderPrev',
        nextEl: '#missionSliderNext',
    },
    pagination: {
        el: '#missionSliderNavigation',
        type: 'custom',
        renderCustom: ( swiper, current, total ) => {   
            const showedCurrent = current < 10 ? '0' + current : current
            const showedTotal = total < 10 ? '0' + total : total

            const progressPrecentage = 1 / total * 100
            const progressLeft = 100 * current - 100

            const currentEl = '<div class="img-pagination__number img-pagination__number--current">' + showedCurrent + '</div>'
            const totalEl = '<div class="img-pagination__number img-pagination__number--total">' + showedTotal + '</div>'

            const progress = '<div class="img-pagination__progress-block"><div class="img-pagination__proggress-line" style="width: ' + progressPrecentage + '%; transform: translateX(' + progressLeft + '%)"></div></div>'

            const html = currentEl + progress + totalEl
            
            return html
        }
    },
})