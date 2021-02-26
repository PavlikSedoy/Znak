import fullpage from "fullpage.js/dist/fullpage"

const header = document.getElementById('header')

new fullpage('#fullpage', {
    licenseKey: '643A8C2B-18D047C0-845E464B-28BFE23E',
    anchors:['home', 'acquaintance', 'portfolio', 'why-us', 'your-object', 'vizualization', 'design-project', 'clients-and-reviews', 'request-form', 'footer'],
    onLeave: (origin, destination, direction) => {
        if ( origin.index == 0 ) {
            header.classList.add('header--active')
        } else if ( destination.index == 0 ) {
            header.classList.remove('header--active')
        }
    }
})