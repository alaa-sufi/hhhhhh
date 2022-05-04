import Link from 'next/link'

export default function ButtonTheme({color, as, outline, href,big,type,block, ...props}) {
    const classes=`button ${outline ? 'out-primary' : color} ${props.className} ${big && 'p-6 text-3xl'} ${block && 'w-full block'}`
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
        <button  className={classes} type={type} >
                {props.children}
        </button>

    )
}


