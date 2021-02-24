const businessSwitcher = document.getElementById('businessSwitcher');

businessSwitcher.addEventListener('click', () => {
    console.log('Change business/personal');

    const companyName = document.getElementById('settingCompanyName'),
        nameOrCompany = document.getElementById('name-or-company');

    businessSwitcher.parentElement.classList.toggle('active')

    if ( businessSwitcher.parentElement.classList.contains('active') ) {
        companyName.innerText = 'Название компании';
        nameOrCompany.setAttribute.placeholder = 'Название компании';
    } else {
        companyName.innerText = 'Имя';
        nameOrCompany.setAttribute.placeholder = 'Имя';
    }
});