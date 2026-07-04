export interface ToolBtnProps{
    title: string,
    logo?: React.ElementType,
    onClick: () => void,
    hoverColor: string,
    grid?: string
}

export default function ToolBtn(props: ToolBtnProps){
    const {title, logo:Logo, onClick, hoverColor, grid} = props
    return <div className={`flex justify-center items-center text-white bg-gray-800 p-2 gap-2 rounded-lg ${hoverColor} cursor-pointer select-none ${grid}`} onClick={onClick}>
        {Logo && <Logo size="sm"/>}
        {title === "Copy" ? <div className="text-sm hidden">{title}</div> : <div className="text-sm hidden sm:block">{title}</div>}
    </div>
}