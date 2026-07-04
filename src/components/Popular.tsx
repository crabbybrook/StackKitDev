import { Arrow } from "../Icons/allIcons"
import Button from "./Button"

interface PopProps {
    logo: React.ElementType,
    title: string,
    desc: string,
    color: string,
    btn: boolean,
    where?: string
}

export default function Popular(props: PopProps) {
    const { logo:Logo, title, desc, color, btn, where } = props
    return <div className="w-full">
        <div className="bg-gray-900 flex justify-between items-center p-3 border border-gray-800">
            <div className="flex gap-3 w-70">
                <div className={`${color} flex justify-center items-center`}><Logo size="lg"/></div>
                <div className="flex flex-col">
                    <div className="text-white font-bold text-xs sm:text-md flex">{title}</div>
                    <div className="text-gray-500 font-semibold text-xs text-left">{desc}</div>
                </div>
            </div>

            {(btn && where) && <div className="flex select-none">
                <Button text="Try Now" symbol={<Arrow size="sm" />} color="text-blue-600" where={where}/>
            </div>}
        </div>
    </div>
}