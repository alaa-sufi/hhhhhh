import React , {useState} from 'react'
import Link from "next/link"
import Logo from "@/ui/Logo"
import DropdownButton from "@/ui/DropdownButton"
import useTranslation from 'next-translate/useTranslation'
import { Element, Personalcard, Refresh2, Star1, Setting4, Wallet3, Profile, LogoutCurve, ClipboardClose, ClipboardTick, ClipboardExport } from 'iconsax-react'
export default function Aside() {
  const { t } = useTranslation("aside")
const [openCollabse,setOpenCollabse] = useState(false)
  const roots = [
    { title: t('control_board'), icon: <Element size="18"  className="text-primary" />, href: "/dashboard", },
    { title: t('the_accounts'), icon: <Personalcard  size="18" className="text-primary" />, href: "/", },
    {
      title: t('record'), icon: <Refresh2 size="18"  className="text-primary" />, list: [
        { title: t('closed_deals'), icon: <ClipboardClose  size="18" className="text-inherit" />, href: "/" },
        { title: t('open_deals'), icon: <ClipboardTick  size="18" className="text-inherit" />, href: "/" },
        { title: t('deposit_and_clouds'), icon: <ClipboardExport size="18"  className="text-inherit" />, href: "/" }
      ],
    },
    { title: t('promotion'), icon: <Star1 size="18"  className="text-primary" />, href: "/", },
    { title: t('tools'), icon: <Setting4 size="18"  className="text-primary" />, href: "/", },
    { title: t('money_management'), icon: <Wallet3 size="18"  className="text-primary" />, href: "/", },
    { title: t('profile_personly'), icon: <Profile size="18"  className="text-primary" />, href: "/dashboard/profile/personal/profile-personly", },
    { title: t('sign_out'), icon: <LogoutCurve size="18"  className="text-primary" />, href: "/", },
  ]
  return (
    <div className="bg-white w-72 grid-area-home-aside fixed h-full overflow-auto ">
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
                <div className={`flex items-center gap-4 py-1 mb-1 md:mb-2 md:py-2 rtl:pr-2 ltr:md:pl-8 ltr:pl-2 rtl:md:pr-8   ${openCollabse  && 'rtl:border-r-8 ltr:border-l-8 border-primary '} `}>
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
