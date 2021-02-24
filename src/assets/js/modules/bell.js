document.addEventListener('DOMContentLoaded', e => {
    if ( document.getElementById('bell') ) {
        const bellBtn = document.getElementById('bell'),
            bellDropdown = document.getElementById('bellDropdown');

// bellBtn.onclick = bellClick;
        bellBtn.addEventListener('click', e => bellClick(e));
        document.addEventListener('click', () => bellDropdown.classList.remove('bell__dropdown--active'));
    }

    const bellClick = e => {
        e.stopPropagation();
        bellDropdown.classList.toggle('bell__dropdown--active');
    }
});