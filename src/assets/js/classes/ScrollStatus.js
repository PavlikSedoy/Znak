export default class ScrollStatus {
    static scrollStatusEl = document.getElementById('scrollStatus')
    static totalScrolls = document.getElementById('totalScrolls')
    static currentScroll = document.getElementById('currentScroll')
    static scrollVizual = document.getElementById('scrollVizual')

    static totalSections = document.getElementsByClassName('section').length
    static scrollHeight = scrollVizual.parentElement.offsetHeight  / this.totalSections

    static firstLoad = () => {
        totalScrolls.innerHTML = this.totalSections < 10 ? '0' + this.totalSections : this.totalSections
        currentScroll.innerHTML = '01'
        scrollVizual.style.height = this.scrollHeight + 'px'
    }

    static sectionChanged = destination => {
        const currentIndex = destination.index < 9 ? '0' + (destination.index + 1) : destination.index + 1
        
        currentScroll.innerHTML = currentIndex
        scrollVizual.style.top =  this.scrollHeight * destination.index + 'px'

        this.checkSrollTheme( destination )
    }

    static checkSrollTheme = destination => {
        if ( destination.item.classList.contains("section--light") || destination.item.classList.contains("section--white") ) this.scrollStatusEl.classList.add('scroll-status--dark')
        else this.scrollStatusEl.classList.remove('scroll-status--dark')
    }
}