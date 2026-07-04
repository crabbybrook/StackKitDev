import type { ToolBtnProps } from "./ToolBtn"


export default function TimeStampbtn(props: ToolBtnProps){
    const {title, logo:Logo, onClick, hoverColor, grid} = props
    return  <div className={`flex justify-center items-center text-white p-2 gap-2 rounded-lg ${hoverColor} cursor-pointer select-none ${grid}`} onClick={onClick}>
        {Logo && <Logo size="sm"/>}
        <div className="text-sm hidden md:block">{title}</div>
    </div>
}