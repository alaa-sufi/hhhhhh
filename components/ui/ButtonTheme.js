import Link from 'next/link'

export default function ButtonTheme({color, as, outline, href,big, ...props}) {
    //color : primary ,
    //as    : Link button(submit)
    //outline: to change style to outline
    // href : if as== link we nwwd to href
    //big : bigger size for button
    return (
        <Link href={"/"} >
            <a className={`button ${outline ? 'out-primary' : color} ${props.className} ${big && 'p-6 text-3xl'}`} >
                {props.children}
            </a>
        </Link>

    )
}


