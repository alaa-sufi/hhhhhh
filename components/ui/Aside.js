import React , {useState , useEffect} from 'react'
import Link from "next/link"
import Logo from "@/ui/Logo"
import DropdownButton from "@/ui/DropdownButton"
import useTranslation from 'next-translate/useTranslation'
import { Element, Personalcard, Refresh2, Star1, Setting4, Wallet3, Profile, LogoutCurve, ClipboardClose, ClipboardTick, ClipboardExport } from 'iconsax-react'
import { useRouter } from 'next/router'
export default function Aside() {
      const router = useRouter()
  const { t } = useTranslation("aside")
const [openCollapse,setOpenCollapse] = useState(false)
useEffect(()=>{
  setOpenCollapse(false)
},[router])
  const roots = [
    { title: t('control_board'), icon: <Element size="18"  className="text-primary" />, href: "/dashboard", },
    { title: t('the_accounts'), icon: <Personalcard  size="18" className="text-primary" />, href: "/", },
    {
      title: t('record'), icon: <Refresh2 size="18"  className="text-primary" />, collapse:"/dashboard/record",
       list: [
        { title: t('closed_deals'), icon: <ClipboardClose  size="18" className="text-inherit" />, href: "/dashboard/record/closed-deals" },
        { title: t('open_deals'), icon: <ClipboardTick  size="18" className="text-inherit" />, href: "/dashboard/record/open-deals" },
        { title: t('deposit_and_clouds'), icon: <ClipboardExport size="18"  className="text-inherit" />, href: "/dashboard/record/deposit-and-clouds" }
      ],
    },
    { title: t('promotion'), icon: <Star1 size="18"  className="text-primary" />, href: "/", },
    { title: t('tools'), icon: <Setting4 size="18"  className="text-primary" />, href: "/", },
    { title: t('money_management'), icon: <Wallet3 size="18"  className="text-primary" />, href: "/", },
    { title: t('profile_personly'), icon: <Profile size="18"  className="text-primary" />, href: "/dashboard/profile/personal/profile-personally", },
    { title: t('sign_out'), icon: <LogoutCurve size="18"  className="text-primary" />, href: "/", },
  ]
  return (
    <div className="bg-white dark:bg-dark-white w-72 grid-area-home-aside fixed h-full overflow-auto ">
      <div className="flex items-center justify-center p-4 mb-4">
        <Logo big />
      </div>

      {/* start roots */}
      <ul className="p-0 m-0">
        {roots.map((root, index) => (
          <li key={index}>
            {root.href ? <Link href={root.href} >
              <a className={`flex items-center gap-4 py-1 mb-1 md:mb-2 md:py-2 rtl:pr-2 ltr:md:pl-8 ltr:pl-2 rtl:md:pr-8  hover:bg-secondary/80 dark:hover:bg-dark-secondary  ${router.pathname.split("/").splice(0,4).join("/") === root.href.split("/").splice(0,4).join("/")  && 'rtl:border-r-8 ltr:border-l-8 border-primary bg-secondary dark:bg-dark-secondary'}`}>
                <div className="icon-container">
                  {root.icon}
                </div>
                <span className="text-lg text-black dark:text-white" >
                  {root.title}
                </span>
              </a>
            </Link>
              :
              <>
              <DropdownButton className={`hover:bg-secondary/80 dark:hover:bg-dark-secondary ${(openCollapse || (router.pathname.split("/").splice(0,3).join("/") === root.collapse.split("/").splice(0,3).join("/") )) && ' bg-secondary dark:bg-dark-secondary'}`} open={openCollapse || (router.pathname.split("/").splice(0,3).join("/") === root.collapse.split("/").splice(0,3).join("/") )} onToggle={()=>setOpenCollapse(!openCollapse)} head={
                <div className={`flex items-center gap-4 py-1 mb-1 md:mb-2 md:py-2 rtl:pr-2 ltr:md:pl-8 ltr:pl-2 rtl:md:pr-8   ${(openCollapse || (router.pathname.split("/").splice(0,3).join("/") === root.collapse.split("/").splice(0,3).join("/") ))  && 'rtl:border-r-8 ltr:border-l-8 border-primary '} `}>
                <div className="icon-container">
                  {root.icon}
                </div>
                <span className={`text-lg text-black dark:text-white`} >
                  {root.title}
                </span>
              </div>
              }>
                <ul className="p-4 bg-secondary dark:bg-dark-secondary ">
                {root.list.map((li, index) => (
                  <li key={index}>
                    <Link href={li.href} >
                      <a className={`flex items-center gap-4 py-1 mb-1 md:mb-2 md:py-2 rtl:pr-2 ltr:md:pl-8 ltr:pl-2 rtl:md:pr-8  hover:bg-[#635e5e18] ${router.pathname === li.href  ? 'rtl:border-r-8 ltr:border-l-8 border-primary text-primary' :"text-black dark:text-white"}`}>
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
