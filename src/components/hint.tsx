import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    label: string
    children: React.ReactNode
    asChild?: boolean
    side: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
}

const Hint = ({
    label,
    children,
    asChild,
    side,
    align
}: Props) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className=""
                    side={side}
                    align={align}
                >
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
 
export default Hint