import React from 'react'
import Link from "next/Link"
export default function LoginLinks() {
    const links = [
        { title: "أتفاقية العمل", href: "/" },
        { title: "تحذير المخاطر", href: "/" },
        { title: "وثائق قانونية", href: "/" },
    ]
    return (
        <ul className="flex justify-center gap-4 mt-24">
            {links.map((link, index)=>(
                <li key={index} className="text-sm underline">
                    <Link href={link.href}>
                        <a className="text-inherit">{link.title}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
