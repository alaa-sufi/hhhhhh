import Link from 'next/link'
import { Loader } from 'rsuite';

export default function ButtonTheme({color, as, outline, href,size,type,block,disabled,loading,fontSize, ...props}) {
    const classes=`button  text-center rounded-lg ${fontSize === "md" ? "text-xl" : "text-base"} text-white leading-none ${outline ? 'out-primary hover:bg-primary hover:text-white' :"hover:bg-[#441C63] transition"} ${props.className}  ${block && 'w-full block'} ${size === "xs" ? "py-3 px-6":"py-6 px-6"} ${disabled ? "bg-[#bebebe] pointer-events-none" :`bg-${color} hover:text-white `}`
    //color : primary ,
    //as    : Link|| button(submit)
    //outline: to change style to outline
    // href : if as== link we need to href
    //size : sm md lg
    //type : type button
    //block : add full width and block (w-full block)
    //loading : loading when send api
    return (
        as == "link" ?
        <Link href={href} >
            <a className={classes} >
                {props.children}
            </a>
        </Link>
        :
        <button  className={`${classes} ${loading ? "pointer-events-none" :""}`} type={type} onClick={props.onClick}>
            {loading ? <Loader /> : props.children}
        </button>

    )
}


