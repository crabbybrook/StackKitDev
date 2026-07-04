import { Arrow } from "../Icons/allIcons"
import Button from "./Button"

interface ToolProps{
    logo: React.ElementType,
    title: string,
    desc: string,
    logoColor: string
    where: string
}

export default function ToolBox(props: ToolProps){
    const {logo: Logo, title, desc, logoColor, where} = props
    return <div className="w-full">
        <div className="flex items-center p-3 gap-3 flex-col w-full h-50 lg:h-65 border border-gray-800 bg-gray-900 overflow-hidden">
            <div className={`${logoColor}  w-full flex justify-center items-center`}>
                <Logo size='xl'/>
            </div>

            <div className="text-white text-center text-sm font-bold w-full">
                {title}
            </div>

            <div className="text-gray-500 hidden sm:block text-center text-xs font-semibold">
                {desc}
            </div>

            <div className="mt-auto flex justify-center w-full select-none">
                <Button text="Open Tool" symbol={<Arrow size="sm"/>} color="text-blue-600" where={where}/>
            </div>
        </div>
    </div>
}