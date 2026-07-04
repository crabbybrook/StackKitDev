import { ChevonDown, ChevonUp } from "../Icons/allIcons"

interface MenuProps {
    title: string,
    open: boolean
}

export default function MenuItems(props: MenuProps) {
    const {title, open} = props
    return <div className="flex justify-center items-center gap-2 cursor-pointer">
        <p className="text-white font-[Geist Sans] font-bold hover:text-blue-600">{title}</p>
        {open ? <ChevonDown size="sm"/> : <ChevonUp size="sm"/>}
    </div>
}