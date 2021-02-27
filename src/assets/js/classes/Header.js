export default class Header {
    static header = document.getElementById('header')

    static changeHeaderTheme = ( origin, destination ) => {
        if ( origin.index == 0 ) {
            this.header.classList.add('header--active')
        } else if ( destination.index == 0 ) {
            this.header.classList.remove('header--active')
        }
    }
}