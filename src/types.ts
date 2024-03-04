export enum FormFields {
    FIRST_NAME,
    LAST_NAME,
    PASSWORD,
    EMAIL,
    PHONE_NUMBER
}

export const AREA_CODES = ['050', '052', '054', '055', '058']

export const FORM_DATA_INITIAL_VALUE = {
    firstName: { data: '', isValid: false, didUserInteract: false },
    lastName: { data: '', isValid: false, didUserInteract: false },
    password: { data: '', isValid: false, didUserInteract: false },
    email: { data: '', isValid: false, didUserInteract: false },
    phoneNumber: { area: '050', data: '', isValid: false, didUserInteract: false }
}

export type form = typeof FORM_DATA_INITIAL_VALUE