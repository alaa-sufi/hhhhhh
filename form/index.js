import React, { useState } from 'react'
import { Field, ErrorMessage, useField } from "formik";
import PhoneInput from 'react-phone-input-2'
import { SelectPicker } from 'rsuite';
import useTranslation from 'next-translate/useTranslation'
import { Checkbox, CheckboxGroup } from 'rsuite';
function Input(props) {
    return (
        <div className={`${!props.noMarginBottom && "mb-3 md:mb-6"}`}>
            <Field {...props} className={`block w-full  px-4 py-4  rounded-md bg-secondary ${props.className}`} >
                {props.children}
            </Field>
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-red-500 md:mt-4 md:text-md" />
        </div>
    )
}
function InputIcon(props) {
    return (
        <div className="relative input-with-icon">
            <div className="absolute rtl:right-4 ltr:left-4 top-4 z-1">
                {props.icon}
            </div>
            {props.children}
        </div>
    )
}
function InputPhone(props) {
    const { t, lang } = useTranslation()
    const [field, meta, helpers] = useField(props.name);

    const [phone, setPhone] = useState()
    return (
        <div className="mb-3 md:mb-6">
            <PhoneInput
                className={`block w-full md:p-4 px-4 py-4   rounded-md bg-secondary ${props.className}`}
                country={'jo'}
                enableSearch={true}
                containerClass={'block w-full md:p-4 px-4 py-4  rounded-md bg-secondary flex justify-between'}
                placeholder={props.placeholder}
                searchPlaceholder={t('auth:write_the_name_of_the_state')}
                value={phone}
                onChange={phone => helpers.setValue(phone)}
            />
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-red-500 md:mt-4 md:text-md" />
        </div>
    )
}
function InputCheck({ name, text }) {
    const [field, meta, helpers] = useField(name);

    const handleCheckAll = (value, checked) => {helpers.setValue(checked);};
    return (
        <>
            <label className="flex gap-2">
            <Checkbox onChange={handleCheckAll}> {text}</Checkbox>
                {/* <Field type="checkbox" name={name} />
                <span className="text-xs">{text}</span> */}
            </label>
            <ErrorMessage name={name} component="span" className="mt-2 text-sm text-red-500 md:mt-4 md:text-md" />
        </>
    )
}
function InputCity(props) {
    const { t, lang } = useTranslation()
    const [phone, setPhone] = useState()
    const [field, meta, helpers] = useField(props.name);

    const handleOnChange = (value, data, event, formattedValue) => {
        helpers.setValue(value.slice(data.dialCode.length));
        setPhone(value.slice(data.dialCode.length));
        console.log(value.slice(data.dialCode.length))
    }
    return (
        <div className="mb-3 md:mb-6">
            <PhoneInput
                // className={`block w-full md:p-4 px-4 py-4   rounded-md bg-secondary ${props.className}`}
                country={'jo'}
                enableSearch={true}
                containerClass={'block w-full md:p-4 px-4 py-4  rounded-md bg-secondary flex justify-between city'}
                placeholder={props.placeholder}
                countryCodeEditable={false}
                searchPlaceholder={t('auth:write_the_name_of_the_state')}
                value={phone}
                onChange={handleOnChange}
            />
            <Field {...props} className={`absolute bg-transparent top-4 width-city`} >
                {props.children}
            </Field>
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-red-500 md:mt-4 md:text-md" />
        </div>

    )
}
export { Input, InputIcon, InputPhone, InputCity, InputCheck }