interface BtnProps{
    text: string,
    symbol: React.ReactElement,
    color: string,
    where: string,
}

export default function Button(props: BtnProps){
    const {text, symbol, color, where} = props
    return <a className={`${color} flex justify-center items-center p-2 bg-transparent gap-2 cursor-pointer hover:text-blue-400 w-full text-xs`} href={`${where}`}>
            {text}
            {symbol}
    </a>
}
