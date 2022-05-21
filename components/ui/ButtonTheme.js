import Link from 'next/link'
import { Loader } from 'rsuite';

export default function ButtonTheme({color, as, outline, href,big,type,block,disabled,loading, ...props}) {
    const classes=`button  text-center rounded-lg shadow-md  text-white ${outline && 'out-primary' } ${props.className} ${big && 'p-6 text-[1.5rem] md:text-[1.8rem] '} ${block && 'w-full block'} ${disabled ? "bg-[#bebebe] pointer-events-none" :`bg-${color} hover:text-white`}`
    //color : primary ,
    //as    : Link|| button(submit)
    //outline: to change style to outline
    // href : if as== link we need to href
    //big : bigger size for button
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


