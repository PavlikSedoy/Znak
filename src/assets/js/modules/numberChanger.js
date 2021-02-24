import SensorDetecting from '@js/modules/detectSensor';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const sallerOperatorBlock = document.getElementById('sallerOperator'),
            sallerNumberBlock = document.getElementById('sallerNumberBlock'),
            currentOperator = document.getElementById('currentOperator'),
            operatorItems = document.getElementsByClassName('saller-number__propdown-item'),
            phoneChangerShowNumber = document.getElementById('phoneChangerShowNumber'),
            numberChangerDropdown = document.getElementById('numberChangerDropdown');

// Open/close dropdown;
        sallerOperatorBlock.addEventListener('click', e => {
            e.stopPropagation();
            numberChangerDropdown.style.display = numberChangerDropdown.style.display == 'none' || numberChangerDropdown.style.display == '' ? 'block' : 'none';
        });

// Click outside
        document.addEventListener('click', () => {
            numberChangerDropdown.style.display = 'none';
        });

// Select operator
        Array.from( document.getElementsByClassName('saller-number__propdown-item') ).forEach( operatorItem => {
            operatorItem.addEventListener('click', e => {
                let clickedOperator = {};
                const eOperator = e.target;

                // Get data from clicked operator
                getClickedOperator(eOperator, clickedOperator)

                // Show clicked operator number and color and icon
                phoneChangerPush(clickedOperator)
            });
        });

// Show clicked operator number and color and icon
        const phoneChangerPush = clickedOperator => {
            let pushNumberHtml

            // Operator
            if ( clickedOperator.canal == 'number' ) {
                pushNumberHtml = SensorDetecting.sensorDetecting() ? '<a href="tell:' + clickedOperator.number + '" target="_blank">' + clickedOperator.showNumber + '</a>' : '<span class="saller-number__number-text">' + clickedOperator.showNumber + '</span>'
            }
            // Whatsap
            else if ( clickedOperator.canal == 'messenger' && clickedOperator.messenger == 'Whatsapp' ) {
                pushNumberHtml = SensorDetecting.sensorDetecting() ? '<a href="whatsapp://send?phone=' + clickedOperator.number + '">' + clickedOperator.messenger + '</a>' : '<a class="saller-number__number-text" href="https://web.whatsapp.com/send?phone=' + clickedOperator.number + '&text&source&data" target="_blank">' + clickedOperator.messenger + '</span>'
            }
            // Other messenger
            else if ( clickedOperator.canal == 'messenger' ) {
                let messengerLink
                if ( clickedOperator.messenger == 'Viber' ) messengerLink = 'viber://chat?number=:'
                else if ( clickedOperator.messenger == 'Telegram' ) messengerLink = 'tg://resolve?domain='

                pushNumberHtml = '<a href="' + messengerLink + clickedOperator.number + '" target="_blank">' + clickedOperator.messenger + '</a>'
            }

            // Push
            phoneChangerShowNumber.innerHTML = pushNumberHtml;
            currentOperator.setAttribute('src', clickedOperator.img);
            currentOperator.setAttribute('alt', clickedOperator.alt);
            sallerNumberBlock.style.borderColor = clickedOperator.color;
            sallerOperatorBlock.style.borderColor = clickedOperator.color;
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

            return clickedOperator
        }

// End number changer
// ******************
    }, 500)
});