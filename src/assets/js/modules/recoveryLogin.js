const loginBlock = document.getElementById('loginBlock'),
    recoveryBlock = document.getElementById('recoveryBlock');
const goToRecoveryBtn = document.getElementById('goToRecovery'),
    goToLoginBtn = document.getElementById('goToLogin');

// Open recovery block
goToRecoveryBtn.addEventListener('click', () => {
    loginBlock.style.display = 'none';
    recoveryBlock.style.display = 'block';
});

// Back to login block
goToLoginBtn.addEventListener('click', () => {
    recoveryBlock.style.display = 'none';
    loginBlock.style.display = 'block';
});