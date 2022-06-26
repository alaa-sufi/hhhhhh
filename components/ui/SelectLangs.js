import React, { useState } from 'react'
import { Global, ArrowDown2 } from 'iconsax-react';
import { SelectPicker, InputGroup } from 'rsuite';
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'
import usePersistLocaleCookie from "hooks/use-persist-locale-cookie"

export default function SelectLangs() {
  const { t, lang } = useTranslation("auth")
  const [langSelect, setLangSelect] = useState(lang || "ar")
  usePersistLocaleCookie()
  const data = [
    {
      "label": t('arabia'),
      "value": "ar",
    },
    {
      "label": t('english'),
      "value": "en",
    }
  ]
  const handleChange = async (e) => {
    setLangSelect(e.target.value)
    if (e.target.value === "ar") {
      await setLanguage('ar'); document.documentElement.dir = "rtl"
    } else {
      await setLanguage('en'); document.documentElement.dir = "ltr"

    }
  }
  return (
    <div className="flex justify-center">
      <div className="relative my-3 xl:w-40">
        <select className="form-select appearance-none
block
w-full
rtl:pr-12
rtl:pl-3
ltr:pr-3
ltr:pl-12
py-1.5
text-base
text-gray-700
bg-white dark:bg-dark-white bg-clip-padding bg-no-repeat
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white dark:bg-dark-white focus:border-primary focus:outline-none" onChange={handleChange} aria-label="Default select example" value={langSelect}>
          {data.map((d, index) => (
            <option key={index} value={d.value}>{d.label}</option>
          ))}
        </select>
        <span className="absolute top-0 flex items-center justify-start h-full gap-2 rtl:left-4 ltr:right-4">
          <ArrowDown2 size="18" />
        </span>
        <span className="absolute top-0 flex items-center justify-start h-full gap-2 rtl:right-4 ltr:left-4">
          <Global />
        </span>
      </div>
    </div>

    // <select className="p-4 border rounded-lg border-secondary" onChange={handleChange}>
    //   {data.map((d, index) => (
    //     <option key={index} value={d.value}>{d.label}</option>
    //   ))}
    // </select>

    // <>
    //     <button onClick={async () => {await setLanguage('en');document.documentElement.dir = "ltr"}}>EN</button>
    //   <button onClick={async () => {await setLanguage('ar');document.documentElement.dir = "rtl"}}>Ar</button>
    //     </>
  )
}
//  <>
//     <button onClick={async () => {await setLanguage('en');document.documentElement.dir = "ltr"}}>EN</button>
//     <button onClick={async () => {await setLanguage('ar');document.documentElement.dir = "rtl"}}>Ar</button>
//     </>
// if (document.documentElement.dir === "rtl") {
//   document.documentElement.dir = "ltr";
// } else {
//   document.documentElement.dir = "rtl";
// }