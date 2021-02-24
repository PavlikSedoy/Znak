import Preloader from "../classes/Preloader";
import Conditions from "../classes/models/Conditions";
import ConditionsView from "../classes/ConditionsView";
import Validation from "../classes/Validation";

const preloader = Preloader.showScroll();

const conditionImgEl = document.getElementById('conditionImg'),
    conditionDesc = document.getElementById('conditionDesc');

document.addEventListener('DOMContentLoaded', () => {
    Promise.resolve( Conditions.getConditions() )
        .then( res => {
            ConditionsView.print(res);

            onChangeCondition();
            Preloader.hideScroll();

            // flags = Validation.radioValidation(flags);
        })
        .catch( err => console.log(err))
});

const onChangeCondition = () => {
    const conditionInputsALl = document.querySelectorAll('input[name=condition]');

    Array.from( conditionInputsALl).forEach( conditionInput => {
        conditionInput.addEventListener( 'change', () => {
            const conditionVal = conditionInput.value;

            const conditionItem = ConditionsView.conditionsItems[conditionVal];

            conditionImgEl.src = conditionItem.photo;
            conditionDesc.innerHTML = conditionItem.description;
        });
    });
}