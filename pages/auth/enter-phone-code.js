import { useState, useEffect } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon, InputCity, InputPhone } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, ArrowLeft, ArrowRight } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { enterCodeNumber, getPhoneCode } from "apiHandle"
import toast from "react-hot-toast";
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function EnterPhoneCode() {
  const router = useRouter()
  const [time, setTime] = useState("01:15");
  const [duration, setDuration] = useState(60 * 1.5);
  const [allCode, setAllCode] = useState("");


  function startTimer(duration) {
    var timer = duration, minutes, seconds;
    const counnter = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setTime(minutes + ":" + seconds);

      if (--timer < 0) {
        timer = 0;
        clearInterval(counnter)
      }
    }, 1000);
  }
  const [loadingButton, setLoadingButton] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const onSubmit = (e) => {
    setDisabledButton(true)
    setLoadingButton(true)
    e.preventDefault();
    if(allCode.length === 5){
      const values = {
        verification_code: allCode,
        phone_number: `${router.query.phone}`
      }
      enterCodeNumber({
        values: values,
        success: () => { 
          setLoadingButton(false); 
          if(router.query.verify){
            router.push(`/auth/login-user`); 
          }else{
            router.push(`/auth/return-password`); 
          }},
        error: () => setLoadingButton(false)
      })
    }else{
      toast.error(t("errToast:please_write_the_code"))
    }
  }
  const otpKeyDown =(e)=>{
    if(!isFinite(e.key) || e.target.innerText.length > 1){
      // e.target.innerText = e.target.innerText.slice(-1);
      e.target.innerText = "";
    }}
  const otpFunc = (e) => {
    var current = Number.parseInt(e.target.dataset.tab);
      //delete number when click Backspace
      if(isFinite(e.key) || e.key === "Backspace"){
        if(e.key === "Backspace"){
          if (current > 0 ) {
            e.target.innerText = "";
            if(current > 1){
              e.target.parentElement.querySelector(`#numb${current - 1 }`).focus()
            }
          }
        }else if (current < 5 && e.target.innerText != "" && e.target.innerText.length === 1) {
          e.target.parentElement.querySelector(`#numb${current + 1}`).focus()
        } 
        setAllCode(`${document.getElementById("numb1").innerText}${document.getElementById("numb2").innerText}${document.getElementById("numb3").innerText}${document.getElementById("numb4").innerText}${document.getElementById("numb5").innerText} `)
      }else{
      // e.target.innerText = e.target.innerText.slice(-1);
      e.target.innerText = "";

      }
    }
  useEffect(() => {
    document.querySelector(`#numb1`).focus()
    startTimer(duration);
  }, [])
  const { t , lang } = useTranslation("auth")
  const handleGetPhoneCode = () => {
    setDisabledButton(false) 
    startTimer(duration); 
    getPhoneCode({
      success: () => { },
      error: () => { () => toast.error(t("errToast:sorry_there_was_an_error_in_sending_the_code_please_return_later")) },
      phone: `${router.query.phone}`
    })
  }

  return (
    <>
       <Head>
        <title>{t("enter_the_code")} | {t("common:website_name")}</title>
      </Head>
    <Login noLinksButton contactUs>
      <h1 className="block mb-0 font-bold text-h2 mt-14">{t('enter_the_code')}</h1>
      <span className="block mb-0 text-gray-400 text-md">{t('you_will_receive_an_sms_containing_5_numbers_enter_them_in_the_field_to_confirm_the_operation')}</span>

      <form onSubmit={onSubmit}>
        <div className="w-full mb-12">
          <div className="py-3 text-center rounded ">
            <div id="otp" className="flex flex-row justify-center mt-5 text-center">
              <span onKeyUp={otpFunc} onKeyDown={otpKeyDown} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14 flex items-center justify-center focus:outline-primary focus:outline p-4"  id="numb5"  data-tab="5" contentEditable="true"  ></span>
              <span onKeyUp={otpFunc} onKeyDown={otpKeyDown} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14 flex items-center justify-center focus:outline-primary focus:outline p-4"  id="numb4"  data-tab="4" contentEditable="true"  ></span>
              <span onKeyUp={otpFunc} onKeyDown={otpKeyDown} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14 flex items-center justify-center focus:outline-primary focus:outline p-4"  id="numb3"  data-tab="3" contentEditable="true"  ></span>
              <span onKeyUp={otpFunc} onKeyDown={otpKeyDown} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14 flex items-center justify-center focus:outline-primary focus:outline p-4"  id="numb2"  data-tab="2" contentEditable="true"  ></span>
              <span onKeyUp={otpFunc} onKeyDown={otpKeyDown} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14 flex items-center justify-center focus:outline-primary focus:outline p-4"  id="numb1"  data-tab="1" contentEditable="true"  ></span>
            </div>
          </div>
        </div>
        <span className="flex justify-between mx-auto text-center ">
          <span className={`${time == "00:00" ? "text-primary cursor-pointer" : "font-bold pointer-events-none"}`} onClick={() => { handleGetPhoneCode();}}>{t('i_havent_received_the_code_yet')} </span>
          <span>{t('re_send_through')} {time}</span>
        </span>
        <input type="number" value={allCode} className="hidden" />
        <ButtonTheme color="primary" as="button" type="submit"  block size="md" className="my-4 text-center xs:my-2" loading={loadingButton} disabled={disabledButton}>
          {t('confirm_code')}
        </ButtonTheme>

      </form>
      <ButtonTheme color="primary" onClick={() => router.back()} outline size="xs" className="flex items-center gap-2 mx-auto my-4 text-center xs:my-2 w-max">
        {t('back')}{lang == "ar" ? <ArrowLeft size="15" className="text-inherit" /> : <ArrowRight size="15" className="text-inherit" />}
      </ButtonTheme>


    </Login>
    </>
  )
}
EnterPhoneCode.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

