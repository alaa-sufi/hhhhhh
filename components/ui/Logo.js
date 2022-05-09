import React from 'react'
import Image from "next/image"
import logo from "public/images/placeholder/logo.png"

export default function Logo({big}) {
  return (
    <Image src={logo} alt="logo" width={big ? "200" : "100"}  height={big ? "70" : "50"} />
  )
}
