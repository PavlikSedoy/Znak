if ( document.getElementById('phoneTelegram') ) {
    const telegramCheck = document.getElementById('phoneTelegram'),
        telegramNick = document.getElementById('telegram-nick');

    telegramCheck.addEventListener('change', () => {
        const telegramCheckOnClick = document.getElementById('phoneTelegram');

        if ( telegramCheckOnClick.checked == true ) {
            telegramNick.parentElement.style.display = 'block';
            telegramNick.parentElement.classList.add('active');
        } else {
            telegramNick.parentElement.style.display = 'none';
            telegramNick.parentElement.classList.remove('active');
        }
    });
}
