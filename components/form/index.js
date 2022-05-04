import React, {useState} from 'react'
import { Field, ErrorMessage, useField } from "formik";
import PhoneInput from 'react-phone-input-2'
import { SelectPicker } from 'rsuite';

function Input(props) {
    return (
        <div className={`${!props.noMarginBottom && "mb-3 md:mb-6"}`}>
            <Field {...props} className={`block w-full md:p-4 p-4  rounded-md bg-secondary ${props.className}`} >
                {props.children}
            </Field>
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-red-500 md:mt-4 md:text-md" />
        </div>
    )
}
function InputIcon(props) {
    return (
        <div className="relative input-with-icon">
            <div className="absolute right-4 top-4 z-[1]">
                {props.icon}
            </div>
            {props.children}
        </div>
    )
}
function InputPhone(props) {
    const [phone , setPhone] = useState()
    return (
        <div className="mb-3 md:mb-6">
            <PhoneInput
            className={`block w-full md:p-4 p-4  rounded-md bg-secondary ${props.className}`}
                country={'jordan'}
                enableSearch={true}
                containerClass={'block w-full md:p-4 p-4  rounded-md bg-secondary flex  justify-between'}
                placeholder={props.placeholder}
    
                // value={phone}
                // onChange={phone => setPhone({ phone })}
            />
        </div>
    )
}
function InputCity(props) {
    return (
        <SelectPicker  block />
        // <PhoneInput
        // className={`block w-full md:p-4 p-4  rounded-md bg-secondary ${props.className}`}
        //     // country={'us'}
        //     // value={phone}
        //     // onChange={phone => setPhone({ phone })}
        // />
    )
}
export { Input, InputIcon ,InputPhone,InputCity }