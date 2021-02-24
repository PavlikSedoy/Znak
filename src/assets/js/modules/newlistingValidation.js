import Validation from "../classes/Validation";
import FieldsError from "../classes/FieldsError";
import Preloader from "../classes/Preloader";
import Conditions from "../classes/models/Conditions";
import ConditionsView from "../classes/ConditionsView";

const submit = document.getElementById('sendAd'),
    form = document.getElementById('newAdIphone');

// Inputs
const title = document.getElementById('Title_ct'),
    desc = document.getElementById('Description_ct'),
    price = document.getElementById('Price_ct'),
    imei = document.getElementById('Imei_ct');

// Radios
const conditionItems = document.getElementsByName('condition'),
    romItems = document.getElementsByName('rom'),
    colorItems = document.getElementsByName('color'),
    is_lockItems = document.getElementsByName('is_lock'),
    is_fixedItems = document.getElementsByName('is_fixed'),
    exchangeItems = document.getElementsByName('exchange'),
    sendItems = document.getElementsByName('send');

// Error blocks
const priceError = document.getElementById('priceError'),
    imeiError = document.getElementById('imeiError');

// Errors objects
const imeiErrorsObj = {
    length: document.getElementById('imeiLengthError').value,
    format: document.getElementById('imeiFormatError').value,
    exist: document.getElementById('imeiExistError').value
}

// Conditions
const titleConditions = {
    min: document.getElementById('minTitle').value,
    max: document.getElementById('maxTitle').value
},
    descConditions = {
        min: document.getElementById('minDesc').value,
        max: document.getElementById('maxDesc').value
    },
    priceConditions = {
        min: document.getElementById('minIphonePrice').value,
        max: document.getElementById('maxIphonePrice').value
    }

// Flags
let flags = {
    title: false,
    desc: false,
    price: false,
    condition: false,
    imei: false,
    rom: false,
    color: false,
    is_lock: false,
    is_fixed: false,
    exchange: false,
    send: false,
}

// Events
title.addEventListener('keyup', () => flags.title = titleValidation(title, flags.title, titleConditions) );
desc.addEventListener('keyup', () => flags.desc = titleValidation(desc, flags.desc, descConditions) );
price.addEventListener('keyup', () => flags.price = numberValidation(price, flags.price, priceConditions, priceError) );
imei.addEventListener('keyup', () => flags.imei = imeiValidation(imei));

const preloader = Preloader.showScroll();

const conditionImgEl = document.getElementById('conditionImg'),
    conditionDesc = document.getElementById('conditionDesc');

document.addEventListener('DOMContentLoaded', () => {
    Promise.resolve( Conditions.getConditions() )
        .then( res => {
            ConditionsView.print(res);

            onChangeCondition();
            Preloader.hideScroll();

            flags = Validation.radioValidation(flags);
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

// Validation functions
const titleValidation = (input, flag, condition) => {
    flag = Validation.minMaxLength(input, condition.min, condition.max);
    FieldsError.titlesError(input, flag);
    return flag;
}

const numberValidation = (input, flag, condition, errorBlock) => {
    flag = Validation.minMaxNumber(input, condition.min, condition.max);
    FieldsError.numberError(input, errorBlock, flag);
    return flag;
}

// Condition
const radioValidation = (items, flag) => {
    FieldsError.radiosError(items, flag);
    return flag;
}

const imeiValidation = (imei) => {
    const imeiValidationRes = Validation.imei(imei.value);
    flags.imei = imeiValidationRes.flag;
    FieldsError.imeiError(flags.imei, imeiErrorsObj[imeiValidationRes.error], imei, imeiError);
}

// On click submit button
submit.addEventListener('click', e => {
    e.preventDefault();

    let flagsState = true;

    // console.log('before:');
    // console.log(flags);

    // Check radios
    radioValidation(conditionItems, flags.condition);
    radioValidation(romItems, flags.rom);
    radioValidation(colorItems, flags.color);
    radioValidation(is_lockItems, flags.is_lock);
    radioValidation(is_fixedItems, flags.is_fixed);
    radioValidation(exchangeItems, flags.exchange);
    radioValidation(sendItems, flags.send);

    // Check flags
    Object.values(flags).map(flag => {
        // flagsState = !flag === false;
        if ( !flag ) flagsState = false;
    });

    // console.log('after:');
    // console.log(flags);
    // console.log(flagsState);
    // console.log( document.getElementById('Phone').value )

    if ( !flagsState ) {
        titleValidation(title, flags.title, titleConditions);
        titleValidation(desc, flags.desc, descConditions);
        numberValidation(price, flags.price, priceConditions, priceError);
        imeiValidation(imei);
    } else {
        form.submit();
    }
});