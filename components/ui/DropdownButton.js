import React from 'react'
import { ArrowUp2,ArrowDown2} from 'iconsax-react';
import Router, { useRouter } from 'next/router';

export default function DropdownButton({ open, onToggle, head,link,center, ...props }) {
    //open : open DropdownButton
    //onToggle : function
    // head : head of dropdown
    // link :if not dropdown it is just a link
    // center :center head text
    const router = useRouter();
    return (
        <div className={props.className} onClick={link ? ()=>router.push(link):() => onToggle()}>
            <div className={`relative flex gap-2 cursor-pointer ${center && "justify-center"}`}>
                {head}
                {!link ? open? 
                <ArrowUp2 size="20" color="#333333" className="absolute rtl:left-2 rtl:md:left-4 ltr:right-2 ltr:md:left-4 top-1/2 transform -translate-y-1/2" /> :
                 <ArrowDown2 size="20" color="#333333" className="absolute rtl:left-2 rtl:md:left-4 ltr:right-2 ltr:md:left-4 top-1/2 transform -translate-y-1/2" /> : <></>}
            </div>
            {open && props.children}
        </div>
    )
}