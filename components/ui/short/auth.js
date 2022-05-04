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
export default function Login({ slider, ...props }) {
    //slider props to collect two view for layouts slider & img
    const { t, lang } = useTranslation()
    const swipperInfo = [
        { text: t('common:test'), img: { img1 } },
        { text: t('auth:sliderText1'), img: { img1 } },
    ]
    return (
        <div className="grid h-screen grid-cols-12 gap-4 ">
            <div className={`${slider ? "col-span-6" : "col-span-8"} px-20 py-10 flex flex-col justify-between`}>
                <div className='flex justify-between' >
                    <img src={"/images/placeholder/logo.png"} alt="logo" width="100"  />
                    <SelectLangs />
                </div>
                <div>
                    {props.children}
                    <LoginLinks />
                </div>
            </div>
            <div className={`${slider ? "col-span-6" : "col-span-4"} bg-primary relative`}>
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
                    : <>without slider</>}
            </div>
        </div>
    )
}
