import fullpage from "fullpage.js/dist/fullpage"

const header = document.getElementById('header'),
    totalSections = document.getElementsByClassName('section').length
const currentScroll = document.getElementById('currentScroll'),
    totalScrolls = document.getElementById('totalScrolls'),
    scrollVizual = document.getElementById('scrollVizual')

const scrollHeight = scrollVizual.parentElement.offsetHeight  / totalSections

new fullpage('#fullpage', {
    licenseKey: '643A8C2B-18D047C0-845E464B-28BFE23E',
    anchors:['home', 'acquaintance', 'portfolio', 'why-us', 'your-object', 'vizualization', 'design-project', 'clients-and-reviews', 'request-form', 'footer'],
    onLeave: (origin, destination, direction) => {
        if ( origin.index == 0 ) {
            header.classList.add('header--active')
        } else if ( destination.index == 0 ) {
            header.classList.remove('header--active')
        }

        const currentIndex = destination.index < 9 ? '0' + (destination.index + 1) : destination.index + 1

        currentScroll.innerHTML = currentIndex
        scrollVizual.style.top =  scrollHeight * destination.index + 'px'

    },
    afterRender: () => {
        totalScrolls.innerHTML = totalSections < 10 ? '0' + totalSections : totalSections

        scrollVizual.style.height = scrollHeight + 'px'
    }
})

// Scroll height