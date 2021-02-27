import fullpage from "fullpage.js/dist/fullpage"
import ScrollStatus from "@js/classes/ScrollStatus"
import Header from "@js/classes/Header"

new fullpage('#fullpage', {
    licenseKey: '643A8C2B-18D047C0-845E464B-28BFE23E',
    anchors:['home', 'acquaintance', 'portfolio', 'why-us', 'your-object', 'vizualization', 'design-project', 'clients-and-reviews', 'request-form', 'footer'],
    onLeave: (origin, destination, direction) => {
        Header.changeHeaderTheme( origin, destination )
        ScrollStatus.sectionChanged( destination )
    },
    afterRender: () => {
        ScrollStatus.firstLoad()
    }
})

// Language
const langBtn = document.getElementById('lngBtn'),
    langList = document.getElementById('lngList')

langBtn.addEventListener('click', e => {
    e.stopPropagation()
    openLangList()
})

const openLangList = () => {
    langList.classList.toggle('list--visible')
}
// End lnaguage

document.addEventListener('click', () => {
    langList.classList.remove('list--visible')
})