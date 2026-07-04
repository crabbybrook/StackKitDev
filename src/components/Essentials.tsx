interface EssText{
    text: string
}

export default function Essentials(props: EssText){
    const {text} = props
    return  <div className="flex-col">
            <div className="text-xs sm:text-sm text-gray-500 cursor-pointer hover:text-blue-500 text-center">
                {text}
            </div>
        </div>
}