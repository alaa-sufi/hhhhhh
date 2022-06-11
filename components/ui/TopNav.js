import React , {useState , useEffect} from 'react'
import useTranslation from 'next-translate/useTranslation'
import { SearchNormal1, Notification, Translate, Sun1, Moon } from 'iconsax-react'
import Image from "next/image"
import profile from "public/images/placeholder/profile.png"
import Link from "next/link"
import usePersistLocaleCookie from "hooks/use-persist-locale-cookie"
export default function TopNav() {
  const { t } = useTranslation("aside")
    usePersistLocaleCookie()
  const [dark , setDark] = useState(false);
  const [dir , setDir] = useState('rtl');
  useEffect(()=>{
    if(typeof window !== 'undefined'){
      if(localStorage.getItem("theme") === "dark" ){
        setDark(true);
        document.documentElement.classList.add("dark") ;
      }
    } 
  },[])
  const handleChangeLang = async () => {
    if (dir === "ltr") {
      await setDir('rtl'); document.documentElement.dir = "rtl"
    } else {
      await setDir('ltr'); document.documentElement.dir = "ltr"

    }
  }
  const handleChangeDark = ()=>{
       setDark(!dark);
        document.documentElement.classList.toggle("dark") ;
        localStorage.setItem("theme" , dark);
  }
  return (
    <div className="flex-grow bg-white dark:bg-gray-800 dark:text-white grid-area-home-top">
      <div className="container2 p-4  mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-grow">

          <form>
          <div className="flex gap-2">
            <button type="submit">
            <SearchNormal1 className="text-gray-400" />
            </button>
            <input placeholder={t('i_am_looking_for_something')} type="search" className="w-full bg-transparent"/>
          </div>
          </form>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <div className={`${!dark ? 'bg-black-important' : ""} icon-container `}>
                <button onClick={handleChangeDark}>
                  {dark ? 
                  <Sun1 className="text-primary" />
                  :
                  <Moon className="text-white" />
                  }
                </button>
              </div>
            </li>
            <li>
              <div className="icon-container ">

              <button onClick={handleChangeLang}>
                
                  <Translate className="text-primary" />
               
              </button>
              </div>
            </li>
            <li>
              <Link href="/">
                <a className="icon-container">
                  <Notification className="text-primary" />
                </a>
              </Link>
            </li>
            <li className="leading-none">
              <Image src={profile} width="40" height="40" alt="profile" className="rounded" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
