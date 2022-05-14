import React , {useState} from 'react'
import Link from "next/link"
import Logo from "@/ui/Logo"
import DropdownButton from "@/ui/DropdownButton"
import useTranslation from 'next-translate/useTranslation'
import { Element, Personalcard, Refresh2, Star1, Setting4, Wallet3, Profile, LogoutCurve, ClipboardClose, ClipboardTick, ClipboardExport } from 'iconsax-react'
export default function Aside() {
  const { t, lang } = useTranslation()
const [openCollabse,setOpenCollabse] = useState(false)
  const roots = [
    { title: t('aside:control_board'), icon: <Element className="text-primary" />, href: "/", },
    { title: t('aside:the_accounts'), icon: <Personalcard className="text-primary" />, href: "/", },
    {
      title: t('aside:record'), icon: <Refresh2 className="text-primary" />, list: [
        { title: t('aside:closed_deals'), icon: <ClipboardClose className="text-inherit" />, href: "/" },
        { title: t('aside:open_deals'), icon: <ClipboardTick className="text-inherit" />, href: "/" },
        { title: t('aside:deposit_and_clouds'), icon: <ClipboardExport className="text-inherit" />, href: "/" }
      ],
    },
    { title: t('aside:promotion'), icon: <Star1 className="text-primary" />, href: "/", },
    { title: t('aside:tools'), icon: <Setting4 className="text-primary" />, href: "/", },
    { title: t('aside:money_management'), icon: <Wallet3 className="text-primary" />, href: "/", },
    { title: t('aside:profile_personly'), icon: <Profile className="text-primary" />, href: "/", },
    { title: t('aside:sign_out'), icon: <LogoutCurve className="text-primary" />, href: "/", },
  ]
  return (
    <div className="bg-white w-72 grid-area-home-aside fixed h-full overflow-auto">
      <div className="flex items-center justify-center p-4 mb-4">
        <Logo big />
      </div>

      {/* start roots */}
      <ul className="p-0 m-0">
        {roots.map((root, index) => (
          <li key={index}>
            {root.href ? <Link href={root.href} >
              <a className={`flex items-center gap-4 py-1 mb-1 md:mb-2 md:py-2 rtl:pr-2 ltr:md:pl-8 ltr:pl-2 rtl:md:pr-8  hover:bg-[#f8f8f8]  ${index === 0 && 'rtl:border-r-8 ltr:border-l-8 border-primary bg-[#E9E9E9]'}`}>
                <div className="icon-container">
                  {root.icon}
                </div>
                <span className="text-lg text-black" >
                  {root.title}
                </span>
              </a>
            </Link>
              :
              <>
              <DropdownButton className={`${openCollabse  && ' bg-[#E9E9E9]'}`} open={openCollabse} onToggle={()=>setOpenCollabse(!openCollabse)} head={
                <div className={`flex items-center gap-4 py-1 mb-1 md:mb-2 md:py-2 rtl:pr-2 ltr:md:pl-8 ltr:pl-2 rtl:md:pr-8  hover:bg-[#f8f8f8] ${openCollabse  && 'rtl:border-r-8 ltr:border-l-8 border-primary '} `}>
                <div className="icon-container">
                  {root.icon}
                </div>
                <span className={`text-lg text-black`} >
                  {root.title}
                </span>
              </div>
              }>
                <ul className="p-4 bg-secondary">
                {root.list.map((li, index) => (
                  <li key={index}>
                    <Link href={li.href} >
                      <a className={`flex items-center gap-4 py-1 mb-1 md:mb-2 md:py-2 rtl:pr-2 ltr:md:pl-8 ltr:pl-2 rtl:md:pr-8  hover:bg-[#635e5e18] ${index === 0 ? 'rtl:border-r-8 ltr:border-l-8 border-primary text-primary' :"text-black"}`}>
                          {li.icon}
                        <span className={`text-lg`}>
                          {li.title}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
                </ul>
              </DropdownButton>
              </>
            }
          </li>
        ))}
      </ul>
      {/* end roots */}
    </div >
  )
}
