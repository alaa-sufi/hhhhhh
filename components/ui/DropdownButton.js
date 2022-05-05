import React from 'react'
import { ArrowUp2,ArrowDown2} from 'iconsax-react';

export default function DropdownButton({ open, onToggle, head, ...props }) {
    return (
        <div className="p-2 md:p-4 mb-4 rounded-lg bg-secondary align-center" onClick={() => onToggle()}>
            <div className="relative flex justify-center gap-2 cursor-pointer">
                {head}
                {open ? <ArrowUp2 size="20" color="#333333" className="absolute rtl:left-2 rtl:md:left-4 ltr:right-2 ltr:md:left-4" /> : <ArrowDown2 size="20" color="#333333" className="absolute rtl:left-2 rtl:md:left-4 ltr:right-2 ltr:md:left-4" />}
            </div>
            {open && <div className="flex justify-center gap-4 mt-5 ">
                {props.children}
            </div>}
        </div>
    )
}