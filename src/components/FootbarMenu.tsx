
interface FootbarProps {
    logo: React.ReactElement,
    title: string,
    color: string,
}

export default function FootbarMenu(props: FootbarProps) {
    const { logo, title, color } = props
    return <div>
        <div className="mt-2">
            <div className="flex-col flex gap-1 justify-between items-center">
                <div className={`${color} flex justify-center items-center`}>{logo}</div>
                <div className="text-white text-xs sm:text-sm">{title}</div>
            </div>
        </div>
    </div>
}