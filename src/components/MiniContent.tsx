interface MiniContentProps {
    logo: React.ReactElement
    title: string
    color: string
}
export default function MiniContent(props: MiniContentProps) {
    const { logo, title, color } = props

    return <div className="flex justify-start items-center gap-2 cursor-pointer">
        <div className={`${color}`}>{logo}</div>
        <p className="text-white hover:text-amber-300">{title}</p>
    </div>
}