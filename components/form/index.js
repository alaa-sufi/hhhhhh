import React, { useState, useEffect } from 'react'
import { Field, ErrorMessage, useField } from "formik";
import PhoneInput from 'react-phone-input-2'
import useTranslation from 'next-translate/useTranslation'
import { Checkbox, CheckboxGroup, SelectPicker } from 'rsuite';
import { getCurrentCountry } from "apiHandle"
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

function Input(props) {
    return (
        <div className={`${!props.noMarginBottom && "mb-3 md:mb-6"}`}>
            <Field {...props} className={`block w-full  px-4 py-4  rounded-md bg-secondary focus:outline-0 ${props.className}`} dir={props.dir ? props.dir : "auto"}>
                {props.children}
            </Field>
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-danger md:mt-4 md:text-md" />
        </div>
    )
}
function InputIcon(props) {
    return (
        <div className="relative input-with-icon">
            <div className="absolute w-5 rtl:right-4 ltr:left-4 top-4 z-1">
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
            <ErrorMessage name={name} component="span" className="mt-2 text-sm text-danger md:mt-4 md:text-md" />
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
            <div className={`${color ? `bg-[${color}]` : !number && 'bg-secondary'}  rounded-lg flex items-center justify-center  font-bold border-2  ${color ? "peer-checked:ring-offset-2 peer-checked:ring-2 peer-checked:ring-primary" : number ? "border-primary border  text-primary peer-checked:bg-primary peer-checked:text-white px-4 py-2" : "peer-checked:border-2 peer-checked:border-primary peer-checked:text-primary"} ${!number && "h-full p-6 border-transparent"}  `}>
                {text ? text : number ? `${value}$` : ""}
            </div>
        </div >
    )
}
function SelectWIthHead({ name, head, options, value }) {
    const [field, meta, helpers] = useField(name);
    const { t } = useTranslation("dashboard");
    const detectData = (role) => {
        if (role === "currency") {
            return [{
                "value": "USD",
                "label": `${t("american_dollar")} (USD)`,
            }
            ]
        }
        if (role === "leverage") {
            return [
                {
                    "value": "100",
                    "label": `1:100`,
                },
                {
                    "value": "200",
                    "label": `1:200`,
                },
                {
                    "value": "300",
                    "label": `1:300`,
                },
                {
                    "value": "400",
                    "label": `1:400`,
                },
                {
                    "value": "500",
                    "label": `1:500`,
                },

            ]
        }

    }
    return (
        <>
            <div className="flex justify-between  mb-4 bg-secondary rounded-xl relative py-3">
                <span className="absolute z-6 top-1/2 transform -translate-y-1/2  right-4 select-none pointer-events-none font-bold">{head}</span>
                <SelectPicker name={name} data={detectData(options)} appearance="subtle" searchable={false} cleanable={false} className="w-full" onSelect={(value) => helpers.setValue(value)} defaultValue={value} />
            </div>
            <ErrorMessage name={name} component="span" className="block mb-4 text-danger " />
        </>

    )
}
function CustomnCheckColors({ name }) {
    const { t } = useTranslation("dashboard");
    const [openMore, setOpenMore] = useState(false);
    const colors1 = [
        "#3498DB",
        "#8E44AD",
        "#2980B9",
        "#2ECC71",
        "#F1C40F"
    ]
    const colors2 = [
        "#290009",
        "#34495e",
        "#ff7675",
        "#e84393",
        "#00b894",
        "#6c5ce7"
    ]

    return (
        <>
            <h2 className="mb-2 text-lg text-gray-500">{t("choose_the_account_color")}</h2>
            <div className="grid items-center justify-between grid-cols-6 gap-4 mb-4">
                {colors1.map((color, index) => (
                    <CustumnCheckbox name={name} value={color} color={color} type="radio" key={index} />
                ))}
                <div className={`relative aspect-square`}>
                    <span tabIndex="-1" className={` rounded-xl  items-center justify-center border-2 h-full flex flex-col gap-1 w-full select-none cursor-pointer `} onClick={() => setOpenMore(!openMore)}>
                        {openMore ? t("less") : t("more")}
                        {openMore ? <ArrowUp2 size="20" className="text-gray-600" /> : <ArrowDown2 size="20" className="text-gray-600" />}
                    </span>
                </div >
                {openMore && colors2.map((color, index) => (
                    <CustumnCheckbox name={name} value={color} color={color} type="radio" key={index} />
                ))}

            </div>
            <span className="bg-[#3498DB] bg-[#8E44AD] bg-[#2980B9] bg-[#2ECC71] bg-[#F1C40F] bg-[#290009] hidden  bg-[#290009] bg-[#34495e] bg-[#ff7675] bg-[#e84393] bg-[#00b894] bg-[#6c5ce7] "></span>
            <ErrorMessage name={name} component="span" className="text-danger" />
        </>

    )
}
function InputPhone(props) {
    const { t } = useTranslation("auth")
    const [field, meta, helpers] = useField(props.name);
    const [initialCountryCode, setInitialCountryCode] = useState("")

    useEffect(() => {
        getCurrentCountry({
            success: (response) => { setInitialCountryCode(response.data.CurrentCountry.countryCode); },
            error: () => { setInitialCountryCode("") }
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
                searchPlaceholder={t('write_the_name_of_the_state')}
                value={phone}
                onChange={phone => helpers.setValue(phone)}
            />
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-danger md:mt-4 md:text-md" />
        </div>
    )
}
function InputCity(props) {
    const { t } = useTranslation("auth")
    const [phone, setPhone] = useState()
    const [country, setCountry] = useState("")
    const [cityName, setCityName] = useState("")
    const [initialCountryCode, setInitialCountryCode] = useState("")
    const [field, meta, helpers] = useField(props.name);
    useEffect(() => {
        getCurrentCountry({
            success: (response) => { setInitialCountryCode(response.data.CurrentCountry.countryCode); setCountry(response.data.CurrentCountry.countryName) },
            error: () => { setInitialCountryCode("") }
        })
    }, [])
    const handleOnChange = (value, data, event, formattedValue) => {
        setPhone(value.slice(data.dialCode.length));
        // setCityName(data.name);
        // setLastValue(data.name)
        helpers.setValue(data.name)
        setCountry(data.name)
    }
    const setLastValue = () => {
        helpers.setValue(`${cityName} , ${country}`);
    }
    return (
        <div className="mb-3 md:mb-6">
            <PhoneInput
                country={initialCountryCode.toLowerCase()}
                enableSearch={true}
                containerClass={'block w-full md:p-4 px-4 py-4  rounded-md bg-secondary flex justify-between city'}
                placeholder={props.placeholder}
                countryCodeEditable={false}
                searchPlaceholder={t('write_the_name_of_the_state')}
                value={phone}
                onChange={handleOnChange}
                disableCountryCode={true}

            />
            <input {...props} className={`absolute bg-transparent top-4 width-city focus:outline-0`} value={country} readOnly dir="auto" onClick={(e) => e.target.parentElement.parentElement.querySelector(".selected-flag").click()}>
                {props.children}
            </input>
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-danger md:mt-4 md:text-md" />
        </div>

    )
}
const CustomnBalance = ({name}) => {
    const { t } = useTranslation("dashboard")
    const [field, meta, helpers] = useField(name);
    const [input , setInput]= useState()
    const [check , setCheck]= useState()
const values = [
    '1000','3000','5000','10000','25000','50000'
]
    const handleChange = (e) => {
        console.log(e.target.value)
        helpers.setValue(e.target.value);
        setInput(e.target.value)
        setCheck("")

    }
    const handleChangeCheck = (e)=>{
        setInput("")
        setCheck(e.target.value)
        helpers.setValue(e.target.value);
    }
    return (
        <>
            <div className="p-4 border">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {values.map((value, index)=>(
                          <div className={`relative `} key={index}>
                          <input name={name} type="radio" value={value} className="absolute top-0 right-0 w-full h-full opacity-0 peer" onChange={handleChangeCheck} checked={check === value} />
                          <div className={`rounded-lg flex items-center justify-center  font-bold border-2  border-primary   text-primary peer-checked:bg-primary peer-checked:text-white px-4 py-2 `}>
                              {`${value}$`}
                          </div>
                      </div >
                        // <CustumnCheckbox name={name} key={index} value={value} type="radio" number onChange={handleChangeCheck} />
                    ))}
                </div>
                <input className={`block w-full  px-4 py-4  rounded-md bg-secondary `} placeholder={t("another_sum")} name="Balance" type="number" onChange={handleChange} value={input} />

            </div>
            <ErrorMessage name={name}component="span" className="text-danger" />
        </>
    )
}
export { Input, InputIcon, InputPhone, InputCity, InputCheck, CustumnCheckbox, SelectWIthHead, CustomnCheckColors, CustomnBalance }