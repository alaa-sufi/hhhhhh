import React from 'react'
import { DashedBorder } from "public/svg"
import {  Add } from 'iconsax-react';
import {useRouter} from 'next/router'

export default  function CreateAccount({text , href , type ,allTrue, handleOpenModal}){
  const router = useRouter();
  const handleChangeRoute=()=>{
    if(type === "demo" || allTrue){
      router.push(href) 
    }else{
      handleOpenModal()
    }
   
  }
    return (
      <div className="relative flex items-center justify-center mb-14">
      <DashedBorder />
      <button onClick={handleChangeRoute} >
        <a className="relative flex flex-col items-center w-full p-4 text-xl rounded-xl text-primary">
          <Add
            size="50"
            className="text-primary"
          />
          <span>
            {text}
          </span>
        </a>
      </button>
    </div>
    )
  }