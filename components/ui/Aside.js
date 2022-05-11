import React from 'react'
import Link from "next/link"
import Logo from "@/ui/Logo"
import useTranslation from 'next-translate/useTranslation'
import { Element, Personalcard, Refresh2, Star1, Setting4, Wallet3, Profile, LogoutCurve } from 'iconsax-react'
export default function Aside() {
  const { t, lang } = useTranslation()

  const roots = [
    { title: t('aside:control_board'), icon: <Element className="text-primary" />, href: "/", },
    { title: t('aside:the_accounts'), icon: <Personalcard className="text-primary" />, href: "/", },
    { title: t('aside:record'), icon: <Refresh2 className="text-primary" />, href: "/", },
    { title: t('aside:promotion'), icon: <Star1 className="text-primary" />, href: "/", },
    { title: t('aside:tools'), icon: <Setting4 className="text-primary" />, href: "/", },
    { title: t('aside:money_management'), icon: <Wallet3 className="text-primary" />, href: "/", },
    { title: t('aside:profile_personly'), icon: <Profile className="text-primary" />, href: "/", },
    { title: t('aside:sign_out'), icon: <LogoutCurve className="text-primary" />, href: "/", },
  ]
  return (
    <div className="bg-white w-72 grid-area-home-aside fixed">
      <div className="flex items-center justify-center p-4 mb-4">
        <Logo big />

      </div>

      {/* start roots */}
      <ul className="p-0 m-0">
        {roots.map((root, index) => (
          <li key={index}>
            <Link href={root.href} >
              <a className={`flex items-center gap-4 py-1 mb-1 md:mb-2 md:py-2 rtl:pr-2 ltr:md:pl-8 ltr:pl-2 rtl:md:pr-8  hover:bg-[#f8f8f8]  ${index === 0 && 'rtl:border-r-8 ltr:border-l-8 border-primary bg-[#E9E9E9]'}`}>
                <div className="icon-container">
                  {root.icon}
                </div>
                <span className="text-lg text-black" >
                  {root.title}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {/* end roots */}
    </div >
  )
}
