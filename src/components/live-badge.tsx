import { cn } from "@/lib/utils"

type Props = {
    className?: string
}

export default function LiveBadge({ className }: Props) {
    return (
        <div className={cn(
            "bg-pink-500 p-0.5 px-1.5 text-center text-[10px] uppercase border border-background font-semibold tracking-wide rounded-md",
            className
        )}>
            Live
        </div>
    )
}