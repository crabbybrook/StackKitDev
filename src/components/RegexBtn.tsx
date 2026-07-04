import type { ToolBtnProps } from "./ToolBtn"


export default function RegexBtn(props: ToolBtnProps){
    const {title, logo:Logo, onClick, hoverColor, grid} = props
    return <div className={`flex justify-center items-center text-white gap-2  p-2 rounded-lg w-full ${hoverColor} cursor-pointer select-none ${grid}`} onClick={onClick}>
        {Logo && <Logo size="sm"/>}
        <div className="text-xs block">{title}</div>
    </div>
}