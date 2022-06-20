import React from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'
export default function SmallAside({roots , ...props}) {
    const router = useRouter()
  return (
    <ul className={`p-0 m-0 ${props.className}`}>
    {roots.length && roots.map((root, index) => (
      <li key={index}>
        {<Link href={root.href} >
          <a className={`flex items-center gap-4 py-1 mb-1 md:mb-2 md:py-2 rtl:pr-2 ltr:md:pl-8 ltr:pl-2 rtl:md:pr-8  hover:bg-[#f8f8f8] rtl:rounded-l-xl ltr:rounded-r-xl  ${router.pathname === root.href && 'rtl:border-r-8 ltr:border-l-8 border-primary bg-[#E9E9E9]'}`}>
            <div className="icon-container">
              {root.icon}
            </div>
            <span className="text-lg text-black" >
              {root.title}
            </span>
          </a>
        </Link>
        }
      </li>
    ))}
  </ul>
  )
}
