import React from 'react'
import { ArrowUp2,ArrowDown2} from 'iconsax-react';
import Router, { useRouter } from 'next/router';

export default function DropdownButton({ open, onToggle, head,link, ...props }) {
    //open : open DropdownButton
    //onToggle : function
    // head : head of dropdown
    // link :if not dropdown it is just a link
    const router = useRouter();
    return (
        <div className="p-2 md:p-4 mb-4 rounded-lg bg-secondary align-center" onClick={link ? ()=>router.push(link):() => onToggle()}>
            <div className="relative flex justify-center gap-2 cursor-pointer">
                {head}
                {!link ? open? <ArrowUp2 size="20" color="#333333" className="absolute rtl:left-2 rtl:md:left-4 ltr:right-2 ltr:md:left-4" /> : <ArrowDown2 size="20" color="#333333" className="absolute rtl:left-2 rtl:md:left-4 ltr:right-2 ltr:md:left-4" /> : <></>}
            </div>
            {open && <div className="flex justify-center gap-4 mt-5 ">
                {props.children}
            </div>}
        </div>
    )
}