import React from 'react'
import Link from "next/link"
import { DashedBorder } from "public/svg"
import {  Add } from 'iconsax-react';


export default  function CreatAccount({text , href}){
    return (
      <div className="relative flex items-center justify-center mb-14">
      <DashedBorder />
      <Link href={href}>
        <a className="relative flex flex-col items-center w-full p-4 text-xl rounded-xl text-primary">
          <Add
            size="50"
            className="text-primary"
          />
          <span>
            {text}
          </span>
        </a>
      </Link>
    </div>
    )
  }