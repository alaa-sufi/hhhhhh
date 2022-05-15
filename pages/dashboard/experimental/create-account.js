import React , {useState} from 'react'
import useTranslation from 'next-translate/useTranslation'
import {  MoneyRecive,  Add, ArrowLeft } from 'iconsax-react';
import Link from "next/link"
import ButtonTheme from "@/ui/ButtonTheme"
import {Correct} from "public/svg"

export default function CreateDemo() {
  const { t, lang } = useTranslation()
const [steps , setSteps] = useState(1)
  return (
    <div className="p-8 bg-white rounded-lg md:rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <div className=" icon-container">
            <Add size="25" className="text-primary-400" />
          </div>
          <h1 className="font-bold text-black text-3xl block">{t("dashboard:create_an_experimental_account")}</h1>
        </div>
        <Link href="/dashboard" >
          <a className="border border-primary rounded-xl p-2">
            <ArrowLeft size="25" className="text-primary " />
          </a>
        </Link>
      </div>
      <div className="mx-auto py-4 w-[700px] max-w-full">
        {/* start steps */}
        <div className={`mb-8 flex justify-center items-center text-center gap-12 text-black relative after:top-[calc(50%-1rem)] after:right-1/2 after:w-[5.5rem] after:transform after:translate-x-1/2 after:-translate-y-1/2  ${steps === 1 ? "after:bg-gray-200" : "after:bg-primary"} after:h-1 after:absolute`}>
        <button className={`mb-4 z-2 `} onClick={()=>setSteps(1)}>
          <span className={`${steps ===1 ? "bg-primary" : "bg-primary-400"} bg-primary rounded-full text-white w-16  h-16 text-3xl font-bold flex justify-center items-center mx-auto`}>
            {steps === 1 ? "1" : <Correct/>}
            </span>
            {t("dashboard:basic_information")}
        </button>
        <button className={`mb-4 z-2`} onClick={()=>setSteps(2)}>
          <span className={`${steps ===2 ? "bg-primary" : "bg-primary-400"}  rounded-full text-white w-16  h-16 text-3xl font-bold flex justify-center items-center mx-auto`}>2</span>
        {t("dashboard:safety_and_appearance")}
        </button>
        </div>
        {/* end steps */}
        <div className="mb-4">
          <h2 className="text-lg text-gray-500  mb-4">{t("dashboard:platform")}</h2>
         
        </div>
        <h2 className="text-lg mb-4 text-gray-500 ">{t("dashboard:fast_deposit")}</h2>
        <div className="w-max">
          <ul className="flex gap-4 mb-8">
            <li><button className="border-2 border-primary px-8 py-1 rounded-lg text-primary text-lg font-bold ">$1,000</button></li>
            <li><button className="border-2 border-primary px-8 py-1 rounded-lg text-primary text-lg font-bold ">$3,000</button></li>
            <li><button className="border-2 border-primary px-8 py-1 rounded-lg text-primary text-lg font-bold ">$5,000</button></li>
          </ul>
          <ButtonTheme color="primary" block>{t("dashboard:deposit_now")}</ButtonTheme>
        </div>
      </div>
    </div>
  )
}
