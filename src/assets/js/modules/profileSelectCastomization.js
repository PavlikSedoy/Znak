import Selectr from 'mobius1-selectr';

const sortingSelect = document.getElementById('profileSort');

document.addEventListener('DOMContentLoaded', () => {
    new Selectr(sortingSelect, {
        searchable: false
    });
});