import '@styles/team.scss'

import '@js/utils/general'
import '@js/components/portfolio'

import fullpage from "fullpage.js/dist/fullpage"
import "fullpage.js/vendors/scrolloverflow"
import ScrollStatus from "@js/classes/ScrollStatus"
import Header from "@js/classes/Header"

new fullpage('#fullpage', {
    licenseKey: '643A8C2B-18D047C0-845E464B-28BFE23E',
    // anchors:['home', 'portfolio', 'request-form', 'footer'],
    scrollOverflow: true,
    onLeave: (origin, destination, direction) => {
        Header.changeHeaderTheme( origin, destination )
        ScrollStatus.sectionChanged( destination )
    },
    afterRender: () => {
        ScrollStatus.firstLoad()
    }
})