import Inputmask from "inputmask";
// import Regions from "../classes/models/Regions";
import RegionsInView from "../classes/RegionsInView";
if ( document.getElementById('Phone') ) {
    Inputmask({ "mask": "380999999999",showMaskOnHover: false, showMaskOnFocus: true }).mask(document.querySelectorAll('.phone'));

    const settingAddNumberBtn = document.getElementById('settingAddNumber'),
        secondNumberInput = document.getElementById('Phone2'),
        thirdNumberInput = document.getElementById('Phone3'),
        phoneDel2Btn = document.getElementById('phoneDel2'),
        phoneDel3Btn = document.getElementById('phoneDel3');

    settingAddNumberBtn.addEventListener('click', () => {
        if ( !secondNumberInput.parentElement.classList.contains('active') ) {
            secondNumberInput.parentElement.style.display = 'block';
            secondNumberInput.parentElement.classList.add('active');
        }
        else if ( !thirdNumberInput.parentElement.classList.contains('active') ) {
            thirdNumberInput.parentElement.style.display = 'block';
            thirdNumberInput.parentElement.classList.add('active');
        }
    })

    phoneDel2Btn.addEventListener('click', () => {
        phoneDel2Btn.parentElement.classList.remove('active');
        phoneDel2Btn.parentElement.style.display = 'none';
        settingAddNumberBtn.style.display = 'block';
    });

    phoneDel3Btn.addEventListener('click', () => {
        phoneDel3Btn.parentElement.classList.remove('active');
        phoneDel3Btn.parentElement.style.display = 'none';
        settingAddNumberBtn.style.display = 'block';
    });

// Load city when it not selected
    document.addEventListener('DOMContentLoaded', () => {
        const cityId = document.getElementById('SelectCity_ct').value,
            regionId = document.getElementById('SelectRegion_nad').value;
        // if (cityId == '') RegionsInView.printCitiesOptions(regionId);
    });

    document.getElementById('SelectRegion_nad').addEventListener('change', () => {
        const regionId = document.getElementById('SelectRegion_nad').value;
        // RegionsInView.printCitiesOptions(regionId);
    });
}