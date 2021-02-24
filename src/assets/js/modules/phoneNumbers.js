import PhoneNumbers from "@js/classes/PhoneNumbers";
import Preloader from "@js/classes/Preloader";
import SensorDetecting from "@js-modules/detectSensor";

const SERVER_DOMAIN = 'http://u.7enov.com.ua:4000';
const MESSENGER_COLORS = {
    viber: '#8251A2',
    telegram: 'blue',
    whatsapp: 'green'
}

let phonesLoadingState = false;

const phoneListBlock = document.querySelector('.saller-number__dropdown-list'),
    sallerOperatorBlock = document.getElementById('sallerOperator'),
    numberChangerDropdown = document.getElementById('numberChangerDropdown');

let operatorItems;
let phonesClick = false;

const token = document.getElementById('csrfToken').value,
    authorId = document.getElementById('authorId').value;

document.addEventListener('DOMContentLoaded', () => {
    const phoneNumbers = new PhoneNumbers(SERVER_DOMAIN, token, authorId, MESSENGER_COLORS, phoneListBlock);

    phoneNumbers.getPhonesNumbers() === checkFunc();
    phoneNumbers.getDomain();
    // getPhonesNumbers();
});

// Check when data loaded
const checkFunc = () => {
    phonesLoadingState = true;
    setTimeout(() => phonesDo(), 100);
}

sallerOperatorBlock.addEventListener('click', () => {
    phonesClick = true;
    phonesDo();
});

// What js can do when phone list load.
const phonesDo = () => {
    if ( phonesLoadingState ) {
        Preloader.hide();
        if ( phonesClick ) numberChangerDropdown.style.display = numberChangerDropdown.style.display == 'none' || numberChangerDropdown.style.display == '' ? 'block' : 'none';
        operatorItems = document.getElementsByClassName('saller-number__propdown-item');

        Array.from( operatorItems ).forEach( operatorItem => {
            operatorItem.addEventListener('click', e => {
                let clickedOperator = {};
                const eOperator = e.target;

                // Get data from clicked operator
                getClickedOperator(eOperator, clickedOperator);

                // Show clicked operator number and color and icon
                phoneChangerPush(clickedOperator);

                numberChangerDropdown.style.display = 'none';
            });
        });
    } else {
        Preloader.show();
    }
}

// Get data from clicked operator
const getClickedOperator = (eOperator, clickedOperator) => {
    let toWho = eOperator.closest('.saller-number__propdown-item');

    clickedOperator.img = toWho.children[0].getAttribute('src');
    clickedOperator.alt = toWho.children[0].getAttribute('alt');
    clickedOperator.name = toWho.children[1].innerHTML;
    clickedOperator.canal = toWho.getAttribute('data-canal');
    clickedOperator.number = toWho.getAttribute('data-number');
    clickedOperator.showNumber = toWho.getAttribute('data-shownumber');
    clickedOperator.color = toWho.getAttribute('data-color');

    if ( toWho.getAttribute('data-messenger') ) clickedOperator.messenger = toWho.getAttribute('data-messenger');

    return clickedOperator;
}

// Show clicked operator number and color and icon
const phoneChangerPush = clickedOperator => {
    let pushNumberHtml

    // Operator
    if ( clickedOperator.canal == 'number' ) {
        pushNumberHtml = SensorDetecting.sensorDetecting() ? '<a href="tel:' + clickedOperator.number + '" target="_blank">' + clickedOperator.showNumber + '</a>' : '<span class="saller-number__number-text">' + clickedOperator.showNumber + '</span>'
    }
    // Whatsap
    else if ( clickedOperator.canal == 'messenger' && clickedOperator.messenger == 'Whatsapp' ) {
        pushNumberHtml = SensorDetecting.sensorDetecting() ? '<a href="whatsapp://send?phone=' + clickedOperator.number + '">' + clickedOperator.messenger + '</a>' : '<a class="saller-number__number-text" href="https://web.whatsapp.com/send?phone=' + clickedOperator.number + '&text&source&data" target="_blank">' + clickedOperator.messenger + '</span>'
    }
    // Other messenger
    else if ( clickedOperator.canal == 'messenger' ) {
        let messengerLink
        if ( clickedOperator.messenger == 'Viber' ) messengerLink = 'viber://chat?number=:'
        else if ( clickedOperator.messenger == 'Telegram' ) messengerLink = 'https://t.me/'

        pushNumberHtml = '<a href="' + messengerLink + clickedOperator.number + '" target="_blank">' + clickedOperator.messenger + '</a>'
    }

    // Push
    phoneChangerShowNumber.innerHTML = pushNumberHtml;
    currentOperator.setAttribute('src', clickedOperator.img);
    currentOperator.setAttribute('alt', clickedOperator.alt);
    sallerNumberBlock.style.borderColor = clickedOperator.color;
    sallerOperatorBlock.style.borderColor = clickedOperator.color;
}