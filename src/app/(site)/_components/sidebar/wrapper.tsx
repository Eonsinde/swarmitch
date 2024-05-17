"use client"
import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils"

type Props = {
    children: React.ReactNode
}

const Wrapper = ({ children }: Props) => {
    const { collapsed } = useSidebar();

    return (
        <aside className={cn(
            "fixed left-0 z-50 bg-background flex flex-col h-full w-60 border-r border-border transition-all",
            collapsed && "w-[70px]"
        )}>
            {children}
        </aside>
    )
}
 
export default Wrapper