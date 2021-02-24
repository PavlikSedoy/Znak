import LocationBlock from '@js/classes/LocationBlock';

const locationInput = document.getElementById('filters-location'),
    regionsBlock = document.getElementById('regionList'),
    selectAllRegions = document.getElementById('selectAllRegion');

let regionList = [];

const Location = new LocationBlock();

document.addEventListener('DOMContentLoaded', () => {
    // Print regions in block, if location input is empty
    locationInput.value == '' === Location.printRegions();
});

locationInput.addEventListener('focus', e => {
    Location.showLocationBlock(e);
});

locationInput.addEventListener('click', e => {
    e.stopPropagation();
    Location.showLocationBlock(e);
});

regionsBlock.addEventListener('click', e => e.stopPropagation());

document.addEventListener('click', () => {
    Location.hideLocationBlock();
});