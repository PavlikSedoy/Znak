import '@styles/about.scss'

import '@js/utils/general'
import '@js/components/portfolio'
import '@js/components/mission-slider'

import fullpage from "fullpage.js/dist/fullpage"
import ScrollStatus from "@js/classes/ScrollStatus"
import Header from "@js/classes/Header"

new fullpage('#fullpage', {
    licenseKey: '643A8C2B-18D047C0-845E464B-28BFE23E',
    anchors:['home', 'mission', 'portfolio', 'request-form', 'footer'],
    onLeave: (origin, destination, direction) => {
        Header.changeHeaderTheme( origin, destination )
        ScrollStatus.sectionChanged( destination )
    },
    afterRender: () => {
        ScrollStatus.firstLoad()
    }
})