import React, { useState, useEffect } from 'react'
import { Field, ErrorMessage, useField } from "formik";
import PhoneInput from 'react-phone-input-2'
import useTranslation from 'next-translate/useTranslation'
import { Checkbox, CheckboxGroup, SelectPicker, Uploader, Loader, Avatar, DatePicker } from 'rsuite';
import { getCurrentCountry } from "apiHandle"
import { ArrowDown2, ArrowUp2, GalleryAdd, Calendar, DocumentUpload, Gallery } from 'iconsax-react';
import Image from "next/image"
import toast from "react-hot-toast";
import { dateFns } from "date-fns"
import { isAfter, format } from 'date-fns'
function Input(props) {
    const { t, lang } = useTranslation("")
    const [dir, setDir] = useState(props.dir ? props.dir : lang === "ar" ? "rtl" : "ltr")
    const autoDir = (e) => {
        if (e.target.value.charCodeAt(0) < 200) {
            //above 200 start english charackter
            if(!props.dir){
                setDir("ltr")
            }
        } else {
            if(!props.dir){
                setDir("rtl")
            }
            // this.style.direction = "rtl";
        }
    };
    return (
        <div className={`${!props.noMarginBottom && "mb-3 md:mb-6"} ${props.className}`} onKeyUp={autoDir}>
            <Field {...props} className={`block w-full  px-4 py-4  rounded-md bg-secondary dark:bg-dark-secondary  focus:outline-0 ${props.className}`} dir={dir}>
                {props.children}
            </Field>
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-danger md:mt-4 md:text-md" />
        </div>
    )
}
function InputIcon(props) {
    return (
        <div className={`relative input-with-icon ${props.className}`}>
            <div className="absolute w-5 rtl:right-4 ltr:left-4 top-4 z-1">
                {props.icon}
            </div>
            {props.children}
        </div>
    )
}
function InputDate(props) {
    const { t, lang } = useTranslation("dashboard");
    const [field, meta, helpers] = useField(props.name);

    return (
        <div className="relative input-with-icon">
            <div className="absolute w-5 rtl:right-4 ltr:left-4 top-4 z-1">
                {props.icon}
            </div>
            <div className={`mb-3 md:mb-6`}>
                <div className="relative flex items-center gap-2 p-2 rounded-lg bg-secondary dark:bg-dark-secondary  ">
                    <DatePicker oneTap disabledDate={date => isAfter(date, new Date())} caretAs={"l"} appearance="subtle" cleanable={false} isoWeek={true} showWeekNumbers={true} locale={{ today: t("the_today"), yesterday: t("yesterday"), last7Days: t("last7Days"), ok: t("ok") }} placement={lang === "ar" ? "bottomEnd" : "bottomStart"} onChange={(date) => { helpers.setValue(format(date, 'yyyy-MM-dd')) }} defaultValue={props.defaultValue} />
                    <div className="p-2 rounded-lg pointer-events-none bg-primary z-5">
                        <Calendar className="text-white" size="30" />
                    </div>
                </div>
                <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-danger md:mt-4 md:text-md" />
            </div>
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
function CustumnCheckbox({ name, text, value, type, color, number, ...props }) {
    // name : name input
    // text : text inside (label)
    // value : value input
    // type : type input 
    // color : if input is color
    // number : if input is number
    return (
        <div className={`relative ${color && "aspect-square"} ${props.className}`}>
            <Field name={name} type={type} value={value} className="absolute top-0 right-0 w-full h-full opacity-0 peer text-black dark:text-white" />
            <div className={`${color ? "bg-color" : !number && 'bg-secondary dark:bg-dark-secondary '} text-black dark:text-white  rounded-lg flex items-center justify-center  font-bold border-2  ${color ? "peer-checked:ring-offset-2 peer-checked:ring-2 peer-checked:ring-primary" : number ? "border-primary border  text-primary peer-checked:bg-primary peer-checked:text-white px-4 py-2" : "peer-checked:border-2 peer-checked:border-primary peer-checked:text-primary"} ${!number && "h-full p-6 border-transparent"}  `} style={{ "--color": color }}>
                {text ? text : number ? `${value}$` : ""}
            </div>
        </div >
    )
}
function SelectWIthHead({ name, head, options, defaultValue, optionsOutside, ...props }) {
    const [field, meta, helpers] = useField(name);
    const [defaultValueAfter, setDefaultValueAfter] = useState(defaultValue)
    useEffect(() => {
        setDefaultValueAfter(defaultValue);
        console.log("defaultValue", defaultValue)
    }, [name])
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
        if (role === "representative_position") {
            return [

                {
                    "value": "owner",
                    "label": t("profile:owner"),
                },
                {
                    "value": "Higher administration",
                    "label": t("profile:higher_administration"),
                },

                {
                    "value": "Medium management / head of the department",
                    "label": t("profile:medium_management_head_of_the_department"),
                },
                {
                    "value": "Executive Director / Deputy Director",
                    "label": t("profile:executive_director_deputy_director"),
                },
                {
                    "value": "employee",
                    "label": t("profile:employee"),
                },


            ]
        }
        if (role === "select-study") {
            return [...optionsOutside]
        }
        if (role === "select-study-level") {
            return [
                {
                    "label": t("profile:initials"),
                    "value": `initials`,
                },
                {
                    "label": t("profile:preparatory"),
                    "value": `preparatory`,
                },
                {
                    "label": t("profile:fetal"),
                    "value": `fetal`,
                },
                {
                    "label": t("profile:university"),
                    "value": `university`,
                },
                {
                    "label": t("profile:masters"),
                    "value": `masters`,
                },
                {
                    "label": t("profile:doctorate"),
                    "value": `doctorate`,
                },
                {
                    "label": t("profile:no_certificate"),
                    "value": `no_certificate`,
                },


            ]
        }


    }
    return (
        <>
            <div className={`relative flex justify-between py-3 mb-4 bg-secondary dark:bg-dark-secondary  rounded-xl ${props.className}`}>
                {head && <span className="absolute font-bold transform -translate-y-1/2 pointer-events-none select-none z-6 top-1/2 right-4 text-black dark:text-white">{head}</span>}
                <SelectPicker name={name} data={detectData(options)} appearance="subtle" searchable={props.searchable ? true : false} cleanable={false} className="w-full" onSelect={(value) => helpers.setValue(value)} defaultValue={defaultValueAfter} />
            </div>
            <ErrorMessage name={name} component="span" className="block mb-4 text-danger " />
        </>

    )
}
function CustomnCheckColors({ name , more}) {
    const { t } = useTranslation("dashboard");
    const [openMore, setOpenMore] = useState(more || false );
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
                    <span tabIndex="-1" className={` rounded-xl  items-center justify-center border-2 h-full flex flex-col gap-2 w-full select-none cursor-pointer text-black dark:text-white`} onClick={() => setOpenMore(!openMore)}>
                        {openMore ? t("less") : t("more")}
                        {openMore ? <ArrowUp2 size="20" className="text-gray-600" /> : <ArrowDown2 size="20" className="text-gray-600" />}
                    </span>
                </div >
                {openMore && colors2.map((color, index) => (
                    <CustumnCheckbox name={name} value={color} color={color} type="radio" key={index} />
                ))}

            </div>
            <ErrorMessage name={name} component="span" className="text-danger" />
        </>

    )
}
function InputPhone(props) {
    const { t } = useTranslation("common")
    const [field, meta, helpers] = useField(props.name);
    const [initialCountryCode, setInitialCountryCode] = useState("")

    useEffect(() => {
        if (!props.defaultValue) {
            getCurrentCountry({
                success: (response) => {
                    setInitialCountryCode(response.data.CurrentCountry.countryCode);
                },
                error: () => { setInitialCountryCode("") }
            })
        }
    }, [])
    const [phone, setPhone] = useState(props.defaultValue)
    return (
        <div className="mb-3 md:mb-6">
            <PhoneInput
                className={`block w-full md:p-4 px-4 py-4   rounded-md bg-secondary dark:bg-dark-secondary  ${props.className}`}
                country={initialCountryCode.toLowerCase()}
                enableSearch={true}
                containerClass={'block w-full md:p-4 px-4 py-4  rounded-md bg-secondary dark:bg-dark-secondary  flex justify-between'}
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
    const { t } = useTranslation("common")
    const [phone, setPhone] = useState()
    const [country, setCountry] = useState("")
    const [cityName, setCityName] = useState("")
    const [initialCountryCode, setInitialCountryCode] = useState("")
    const [field, meta, helpers] = useField(props.name);
    useEffect(() => {
        if (!props.defaultValue) {
            if (props.notGetApi) {
                getCurrentCountry({
                    success: (response) => {
                        const countryCode = response.data.CurrentCountry.countryCode
                        const countryName = response.data.CurrentCountry.countryName
                        setInitialCountryCode(countryCode);
                        setCountry(countryName);
                        helpers.setValue(`${countryName}-${countryCode.toLowerCase()}`)
                    },
                    error: () => { setInitialCountryCode() }
                })
            }
        } else {
            setCountry(props.defaultValue.split("-")[0]);
        }
    }, [])
    const handleOnChange = (value, data, event, formattedValue) => {
        console.log(data)
        setPhone(value.slice(data.dialCode.length));
        // setCityName(data.name);
        // setLastValue(data.name)
        helpers.setValue(`${data.name}-${data.countryCode}`)
        setCountry(data.name)
    }
    const setLastValue = () => {
        helpers.setValue(`${cityName} , ${country}`);
    }
    return (
        <div className="mb-3 md:mb-6">
            <PhoneInput
                country={props.defaultValue ? props.defaultValue.split("-")[1] : initialCountryCode && initialCountryCode.toLowerCase()}
                enableSearch={true}
                containerClass={'block w-full md:p-4 px-4 py-4  rounded-md bg-secondary dark:bg-dark-secondary  flex justify-between city'}
                placeholder={props.placeholder}
                countryCodeEditable={false}
                searchPlaceholder={t('write_the_name_of_the_state')}
                value={phone}
                onChange={handleOnChange}
                disableCountryCode={true}

            />
            <input {...props} className={`absolute bg-transparent top-4 width-city focus:outline-0 rtl:right-0 ltr:left-0`} value={country} readOnly dir="auto" onClick={(e) => e.target.parentElement.parentElement.querySelector(".selected-flag").click()}>
                {props.children}
            </input>
            <ErrorMessage name={props.name} component="span" className="mt-2 text-sm text-danger md:mt-4 md:text-md" />
        </div>

    )
}
const CustomnBalance = ({ name }) => {
    const { t } = useTranslation("dashboard")
    const [field, meta, helpers] = useField(name);
    const [input, setInput] = useState()
    const [check, setCheck] = useState()
    const values = [
        '1000', '3000', '5000', '10000', '25000', '50000'
    ]
    const handleChange = (e) => {
        console.log(e.target.value)
        helpers.setValue(e.target.value);
        setInput(e.target.value)
        setCheck("")

    }
    const handleChangeCheck = (e) => {
        setInput("")
        setCheck(e.target.value)
        helpers.setValue(e.target.value);
    }
    return (
        <>
            <div className="p-4 border">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {values.map((value, index) => (
                        <div className={`relative `} key={index}>
                            <input name={name} type="radio" value={value} className="absolute top-0 right-0 w-full h-full opacity-0 peer" onChange={handleChangeCheck} checked={check === value} />
                            <div className={`rounded-lg flex items-center justify-center  font-bold border-2  border-primary   text-primary peer-checked:bg-primary peer-checked:text-white px-4 py-2 `}>
                                {`${value}$`}
                            </div>
                        </div >
                        // <CustumnCheckbox name={name} key={index} value={value} type="radio" number onChange={handleChangeCheck} />
                    ))}
                </div>
                <input className={`block w-full  px-4 py-4  rounded-md bg-secondary dark:bg-dark-secondary  `} placeholder={t("another_sum")} name="Balance" type="number" onChange={handleChange} value={input} />

            </div>
            <ErrorMessage name={name} component="span" className="text-danger" />
        </>
    )
}
const UploadImage = ({ name, defaultImg }) => {
    const { t } = useTranslation("dashboard")
    const [field, meta, helpers] = useField(name);
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);
    function previewFile(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }
    return (
        <div className="relative mx-auto upload-image w-max mb-16">
            <Uploader
                fileListVisible={false}
                draggable
                maxPreviewFileSize={5242880}
                listType="picture"
                action={`${process.env.host}/uploading-file-api`}
                onUpload={file => {
                    setUploading(true);
                    previewFile(file.blobFile, value => {
                        setFileInfo(value);
                    });
                }}
                onSuccess={(response) => {
                    setUploading(false);
                    helpers.setValue(response.file);

                }}
                onError={() => {
                    setFileInfo(null);
                    setUploading(false);
                    toast.error(t("errToast:sorry_a_problem_has_occurred_in_downloading_the_image"))
                }}
                accept="image/*"
            >
                <span >
                    {uploading && <Loader backdrop center />}
                    {fileInfo ? (
                        <Image src={fileInfo} layout="fill" className="object-cover w-full h-full " />
                    ) : (

                        defaultImg ?
                            <Image src={`${process.env.hostImage}/${defaultImg}`} layout="fill" />
                            :
                            <div className="bg-[#c4c4c4] rounded w-full h-full"></div>

                    )}
                </span>
            </Uploader>
            <div className="absolute p-3 border-4 border-white -bottom-4 -right-4 bg-primary rounded-xl">
                <GalleryAdd className="text-white" size="20" />
            </div>
        </div>
    )
}
const UploadDraggableImage = ({ name, fileName, dirty }) => {
    const { t } = useTranslation("common")
    const [field, meta, helpers] = useField(name);
    const [once, setOnce] = useState(false)
    return (
        <div className={`draggable-upload ${once && "pointer-events-none-upload"}`}>

            <Uploader
                action={`${process.env.host}/uploading-file-api`}
                draggable
                accept="image/*"
                maxPreviewFileSize={10485760} //10Mb
                onRemove={() => {
                    helpers.setValue("");
                    setOnce(false)

                }}
                onUpload={() => {
                    setOnce(true)
                }}
                onSuccess={(response) => {
                    console.log(response)
                    helpers.setValue(response.file);
                }}
                renderFileInfo={(file, fileElement) => {
                    return (
                        <div className="flex gap-2">
                            <Gallery className="text-primary" />
                            <span>{file.name}</span>
                        </div>
                    );
                }}
                locale={{ error: t("the_lifting_is_not_complete"), complete: t("the_lifting_is_completed") }}
            >
                <div>
                    <h2 className="font-bold mb-4 text-xl">{fileName}</h2>
                    <DocumentUpload size="75" className="text-primary mb-6" />
                    <p className="text-xs" >{t("drag_the_file_and_see_it_here_or")}</p>
                    <p className="text-xs" >{t("review_a_search_for_a_file_for_download")}</p>
                </div>
            </Uploader>
        </div>
    )
}
export { Input, InputIcon, InputPhone, InputCity, InputCheck, CustumnCheckbox, SelectWIthHead, CustomnCheckColors, CustomnBalance, UploadImage, InputDate, UploadDraggableImage }