import { ChevonDown, ChevonUp } from "../Icons/allIcons"

interface MiniProps{
    title: string
    changeChevon: boolean
}

export default function MiniSidebar(props: MiniProps){
    const {title, changeChevon} = props
    return <div>
        <div className="cursor-pointer flex justify-between items-center text-white">
            <div className="font-semibold">{title}</div>
            <div>{changeChevon ? <ChevonDown size="sm"/> :<ChevonUp size="sm"/>}</div>
        </div>
    </div>
}