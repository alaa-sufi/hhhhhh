import React from 'react'
import {LoginBackground} from "public/svg"
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image"
import img1 from "public/images/DefaultImg.png"
import { Autoplay, Navigation, Pagination } from "swiper";

export default function Login({ slider, ...props }) {
    const swipperInfo = [
        {text:"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص" , img:{img1}},
        {text:"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص" , img:{img1}},
        {text:"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص" , img:{img1}},
        {text:"هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص" , img:{img1}},
    ]
    return (
            <div className="grid h-screen grid-cols-12 gap-4 text-white ">
                <div className={`${slider ? "col-span-6" : "col-span-8"} `}>{props.childrens}</div>
                <div className={`${slider ? "col-span-6" : "col-span-4"} bg-primary relative`}>
                <LoginBackground className="absolute w-full top-[-10%] right-1/3 transform translate-x-1/2"/>
                    {slider ?
                        <>
                            <Swiper
                            style={{
                                "--swiper-pagination-color":"#fff",
                                "--swiper-pagination-bullet-horizontal-gap":"3px"
                            }}
                                dir="rtl"
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
                                {swipperInfo.map((sw , i)=>(
                                <SwiperSlide key={i}>
                                    {/* <Image width="300" height="300" src={sw.img.src}/> */}
                                    <p>
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
