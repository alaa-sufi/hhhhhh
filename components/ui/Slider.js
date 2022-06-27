import React, { useState } from 'react'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { CardAccountTop } from "@/ui"

export default function Slider({ data, type, chooseSlide:slide ,handleChooseIndexSlide }) {
  const [chooseSlide, setChooseSlide] = useState(+slide)
  const handleCLickSlider = (i) => {
    setChooseSlide(i)
    handleChooseIndexSlide(i)
  }
  const prev = "-right-52 z-1 left-0";
  const next = "-left-52 z-1 right-0";
  const active = "opacity-100 z-2 transform scale-100 ";
  return (
    <div className="mb-6 relative h-52">
      <div className=" h-full absolute left-0 right-0 w-full mx-auto t-0">

        <div className="relative mx-auto w-[320px] top-1/2 -translate-y-1/2 z-3">
          <div className={`w-8 h-8 bg-primary rounded-full absolute  cursor-pointer flex items-center justify-center top-1/2 text-white -left-8 z-3 pointer-events-none ${chooseSlide === 0 && "opacity-50"}`} >
            <ArrowLeft2 />
          </div>
          <div className={`w-8 h-8 bg-primary rounded-full absolute cursor-pointer flex items-center justify-center top-1/2 text-white -right-8 z-3 pointer-events-none ${chooseSlide === 3 && "opacity-50"}`} >
            <ArrowRight2 />
          </div>
        </div>
        {data.map((account, i) => (
          <div className={` ${chooseSlide === i ? active : "opacity-70 transform scale-75  "} ${chooseSlide === i + 1 ? next : chooseSlide === i - 1 ? prev : "left-0 right-0 "} absolute 	 mx-auto h-full w-[320px] transition duration-75	  `} onClick={() => handleCLickSlider(i)} key={i}>
            <CardAccountTop data={account} type={type} />
          </div>
        ))}
      </div>
    </div>
  )
}
