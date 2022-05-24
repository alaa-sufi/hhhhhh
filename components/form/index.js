import React, { useState, useEffect } from 'react'
import { Field, ErrorMessage, useField } from "formik";
import PhoneInput from 'react-phone-input-2'
import { SelectPicker } from 'rsuite';
import useTranslation from 'next-translate/useTranslation'
import { Checkbox, CheckboxGroup } from 'rsuite';
import { getCurrentCountry } from "apiHandle"
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
            <div className="absolute rtl:right-4 ltr:left-4 top-4 z-1 w-5">
                {props.icon}
            </div>
            {props.children}
        </div>
    )
}

function InputCheck({ name, text }) {
    const [field, meta, helpers] = useField(name);

    const handleCheckAll = (value, checked) => { helpers.setValue(checked); };
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
function CustumnCheckbox({ name, text, value, type, color, number }) {
    // name : name input
    // text : text inside (label)
    // value : value input
    // type : type input 
    // color : if input is color
    // number : if input is number
    return (
        <div className={`relative ${color && "aspect-square"}`}>
            <Field name={name} type={type} value={value} className="absolute top-0 right-0 w-full h-full opacity-0 peer" />
            <div className={`${color ? `bg-[${color}]` : !number && 'bg-secondary'}  rounded-xl flex items-center justify-center  font-bold border-2  ${color ? "peer-checked:ring-offset-2 peer-checked:ring-2 peer-checked:ring-primary" : number ? "border-primary border  text-primary peer-checked:bg-primary peer-checked:text-white px-4 py-2" : "peer-checked:border-2 peer-checked:border-primary peer-checked:text-primary"} ${!number && "h-full p-6 border-transparent"}  `}>
                {text ? text : number ? `${value}$` : ""}
            </div>
        </div >
    )
}
function SelectWIthHead({ name, head, options }) {
    return (
        <>
            <div className="flex justify-between p-4 mb-4 bg-secondary rounded-xl">
                {head}
                <Field name={name} component="select" className="font-bold bg-transparent text-primary">
                    {options}
                </Field>
            </div>
            <ErrorMessage name={name} component="span" className="text-red-500 block mb-4 " />
        </>

    )
}
function InputPhone(props) {
    const { t, lang } = useTranslation()
    const [field, meta, helpers] = useField(props.name);
    const [initialCountryCode, setInitialCountryCode] = useState("")

    useEffect(() => {
        console.log("in Input phone")
        getCurrentCountry({
            success: (response) => { setInitialCountryCode(response.data.CurrentCountry.countryCode); },
            error: () => { setInitialCountryCode("")}
        })
    }, [initialCountryCode])
    const [phone, setPhone] = useState()
    return (
        <div className="mb-3 md:mb-6">
            <PhoneInput
                className={`block w-full md:p-4 px-4 py-4   rounded-md bg-secondary ${props.className}`}
                country={initialCountryCode.toLowerCase()}
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
function InputCity(props) {
    const { t, lang } = useTranslation()
    const [phone, setPhone] = useState()
    const [country, setCountry] = useState("")
    const [cityName, setCityName] = useState("")
    const [initialCountryCode, setInitialCountryCode] = useState("")
    const [field, meta, helpers] = useField(props.name);
    useEffect(() => {
        getCurrentCountry({
            success: (response) => { setInitialCountryCode(response.data.CurrentCountry.countryCode); },
            error: () => {setInitialCountryCode("") }
        })
    }, [])
    const handleOnChange = (value, data, event, formattedValue) => {
        setPhone(value.slice(data.dialCode.length));
        setCityName(data.name);
        setLastValue()
    }
    const setLastValue=()=> {
        helpers.setValue(`${cityName} , ${country}`);
    }
    return (
        <div className="mb-3 md:mb-6">
            <PhoneInput
                // className={`block w-full md:p-4 px-4 py-4   rounded-md bg-secondary ${props.className}`}
                country={initialCountryCode.toLowerCase()}
                enableSearch={true}
                containerClass={'block w-full md:p-4 px-4 py-4  rounded-md bg-secondary flex justify-between city'}
                placeholder={props.placeholder}
                countryCodeEditable={false}
                searchPlaceholder={t('auth:write_the_name_of_the_state')}
                value={phone}
                onChange={handleOnChange}

            />
            <input {...props} className={`absolute bg-transparent top-4 width-city`} value={country} onChange={(e) =>{ setCountry(e.target.value);setLastValue()}} >
                {props.children}
            </input>
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-red-500 md:mt-4 md:text-md" />
        </div>

    )
}
export { Input, InputIcon, InputPhone, InputCity, InputCheck, CustumnCheckbox, SelectWIthHead }