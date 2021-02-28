import Inputmask from "inputmask"
const requestNameField = document.getElementById('requestName'),
    requestPhoneField = document.getElementById('requestPhone'),
    requestSendButton = document.getElementById('requestSend'),
    requestForm = document.getElementById('requestForm')

let flags = {
    name: false,
    phone: false
}

Inputmask({mask: '+38 (099) 999-99-99', showMaskOnFocus: true}).mask(requestPhoneField)

requestNameField.addEventListener('keyup', () => { 
    flags.name = true
    requestNameField.classList.remove('field__input--error')
})

requestPhoneField.addEventListener('keyup', () => {
    flags.phone = true
    requestPhoneField.classList.remove('field__input--error')
})

requestSendButton.addEventListener('click', e => {
    e.preventDefault()

    let phoneNumber = requestPhoneField.value
    phoneNumber = phoneNumber.replace('_', '')

    flags.name = requestNameField.value.length > 2 ? true : false
    flags.phone = phoneNumber.length == 19 ? true : false

    if ( flags.name && flags.phone ) requestForm.submit()
    else {
        if ( !flags.name ) requestNameField.classList.add('field__input--error')
        if ( !flags.phone ) requestPhoneField.classList.add('field__input--error')
    }
})