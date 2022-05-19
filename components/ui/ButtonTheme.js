import Link from 'next/link'

export default function ButtonTheme({color, as, outline, href,big,type,block,disabled, ...props}) {
    const classes=`button  text-center rounded-lg shadow-md  text-white ${outline && 'out-primary' } ${props.className} ${big && 'p-6 text-[1.5rem] md:text-[1.8rem] '} ${block && 'w-full block'} ${disabled ? "bg-[#bebebe] pointer-events-none" :`bg-${color}`}`
    //color : primary ,
    //as    : Link|| button(submit)
    //outline: to change style to outline
    // href : if as== link we nwwd to href
    //big : bigger size for button
    //type : type button
    //block : add full width and block (w-full block)
    return (
        as == "link" ?
        <Link href={href} >
            <a className={classes} >
                {props.children}
            </a>
        </Link>
        :
        <button  className={classes} type={type} onClick={props.onClick}>
                {props.children}
        </button>

    )
}


