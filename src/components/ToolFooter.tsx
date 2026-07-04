interface ToolFooterProps{
    logo: React.ElementType,
    title: string,
    color: string
}

export default function ToolFooter(props: ToolFooterProps){
    const {logo: Logo, title, color} = props
    return <div className={`flex ${color} gap-2 justify-center items-center text-lg`}>
        <Logo size='md'/>
        {title}
    </div>
}