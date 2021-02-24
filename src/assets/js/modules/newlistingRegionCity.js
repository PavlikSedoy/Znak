import RegionsInView from "../classes/RegionsInView";

const regionId = document.getElementById('SelectRegion_nad');

// document.addEventListener('DOMContentLoaded', () => {
//     pushCities(regionId);
// });

regionId.addEventListener('change', () => {
    pushCities(regionId);
});

const pushCities = (regionId) => {
    RegionsInView.printCitiesOptions(regionId.value);
}