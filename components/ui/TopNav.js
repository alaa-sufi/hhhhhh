import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { SearchNormal1 ,Notification ,Translate,Sun1 ,Moon } from 'iconsax-react'
import Image from "next/image"
import profile from "public/images/placeholder/profile.png"
import Link from "next/link"
export default function TopNav() {
  const { t, lang } = useTranslation()
  return (
    <div className="flex justify-between bg-white">
      <div className="flex">
    <SearchNormal1 className="text-primary"/>
    <div>{t('aside:i_am_looking_for_something')}</div>

      </div>
    <ul className="flex items-center gap-4">
      <li>
        <div className="bg-black-important icon-container">

        <Moon className="text-white"/>
        </div>
        {/* <Sun1/> */}
      </li>
      <li>
        <Link href="/">
        <a className="icon-container">
          <Translate className="text-primary"/>
        </a>
        </Link>
        
      </li>
      <li>
        <Link href="/">
        <a className="icon-container">
          <Notification className="text-primary"/>
        </a>
        </Link>
      </li>
      <li className="leading-none">
        <Image src={profile} width="40" height="40" alt="profile" className="rounded"/>
      </li>
    </ul>
    </div>
  )
}
