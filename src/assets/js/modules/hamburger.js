const hamburger = document.getElementById('hamburger'),
    mobileNav = document.getElementById('mobileNav'),
    mobileNavIn = document.querySelector('.mobile-nav__in'),
    mobileNavBtns = document.getElementsByClassName('mobile-nav__btn');

hamburger.addEventListener('click', e => toggleHamburger(e));

// Change hamburger status (active/disactive)
const toggleHamburger = e => {
    e.stopPropagation()
    hamburger.classList.toggle('is-active');
    mobileNav.classList.toggle('is-active');
}

Array.from(mobileNavBtns).forEach( mobileNavBtn => {
    mobileNavBtn.addEventListener( 'click', e => handleMenuDropdown(e));
});

const handleMenuDropdown = e => {
    const dropdownMenuBtn = e.target;
    dropdownMenuBtn.parentElement.classList.toggle('is-active');
}