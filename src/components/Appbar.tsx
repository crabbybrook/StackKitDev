import { Tools } from "../Icons/allIcons"


export default function Appbar() {
    return <div className="p-5 border-b-2 border-blue-900">
        <div className="flex justify-center items-center">
            <div className="grid md:flex grid-cols-1 justify-center md:justify-between items-center gap-5 w-50 md:w-full">
                <a className="flex justify-center md:justify-start text-blue-600 items-center gap-2 hover:text-white" href="/">
                    <Tools size="md" />
                    <p className="text-white hover:text-blue-600 font-[Geist Sans] font-semibold text-xl flex items-center select-none">StackKitDev
                    </p>
                </a>
            </div>

        </div>
    </div>
}