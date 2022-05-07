import React from 'react'
import { LoginBackground } from "public/svg"
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image"
import img1 from "public/images/DefaultImg.png"
import { Autoplay, Navigation, Pagination } from "swiper";
import useTranslation from 'next-translate/useTranslation'
import logo from "public/images/placeholder/logo.png"
import SelectLangs from "@/ui/SelectLangs"
import LoginLinks from "@/ui/short/LoginLinks"
export default function Login({ slider, noLinksButton, noRiskWarning, contactUs, ...props }) {
    //slider props to collect two view for layouts slider & img
    //noLinksButton props to hide LoginLinks
    //noRiskWarning props to hide RiskWarning
    //contactUs props to show contactUs
    const { t, lang } = useTranslation()
    const swipperInfo = [
        { text: t('common:test'), img: { img1 } },
        { text: t('auth:sliderText1'), img: { img1 } },
    ]
    return (
        <div className="grid h-screen grid-cols-12 gap-4 ">
            <div className={`${slider ? "md:col-span-6" : "md:col-span-8"} col-span-12 px-4 sm:px-6 lg:px-20 py-4 md:py-10 flex flex-col justify-between max-w-full m-auto w-[600px] min-h-screen`}>
                <div className='flex justify-between' >
                    <img src={"/images/placeholder/logo.png"} alt="logo" width="100" />
                    <SelectLangs />
                </div>
                <div className={props.className}>
                    {props.children}
                    {!noLinksButton &&
                        <>
                            <LoginLinks />
                            {!noRiskWarning && <p className="text-xs text-gray-500 mt-2">{t('auth:risk_warning_trading_using_financial_lifters_in_the_financial_markets_involved_in_a_very_high_risk_that_does_not_suit_all_types_of_investors_you_must_accommodate_the_size_of_the_risk_that_your_money_may_be_exposed_to')}</p>}
                        </>

                    }
                    {contactUs && <div className="text-center mt-10 ">
                        <h6>{t('auth:if_you_face_any_difficulty_contact_us')}</h6>
                        <a target="_blank" rel="noreferrer" href="mailto:info@hululfx.com" className="text-primary block">info@hululfx.com</a>
                        <a target="_blank" rel="noreferrer" href="tel:0092178945612" className="text-primary block">+92178945612</a>
                    </div>}
                </div>
            </div>
            <div className={`${slider ? "w-1/2" : "w-1/3"} bg-primary  hidden md:block h-screen fixed top-0 rtl:left-0 ltr:right-0`}>
                <LoginBackground className="absolute w-full top-[-10%] right-1/3 transform translate-x-1/2 hidden" />
                {slider ?
                    <>
                        <Swiper
                            style={{
                                "--swiper-pagination-color": "#fff",
                                "--swiper-pagination-bullet-horizontal-gap": "3px"
                            }}
                            dir={lang === 'ar' ? "rtl" : "ltr"}
                            loop="true"
                            autoplay={{
                                delay: 2500
                            }}
                            navigation={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Autoplay, Navigation, Pagination]}
                            className="mySwiper"
                        >
                            {swipperInfo.map((sw, i) => (
                                <SwiperSlide key={i}>
                                    {/* <Image width="300" height="300" src={sw.img.src}/> */}
                                    {/* <span className="absolute text-white right-4 bottom-24">01</span><br/> */}
                                    <p className="absolute bottom-20 right-1/2 w-[90%] transform translate-x-1/2 text-white">
                                        {sw.text}
                                    </p>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </>
                    : <></>}
            </div>
        </div>
    )
}
