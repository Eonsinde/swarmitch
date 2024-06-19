"use client"
import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"

type Props = {
    children: React.ReactNode
}

const Wrapper = ({ children }: Props) => {
    const { collapsed } = useCreatorSidebar();

    return (
        <aside className={cn(
            "fixed left-0 z-50 bg-background flex flex-col h-full w-[70px] lg:w-60 border-r border-border transition-all",
            collapsed && "lg:w-[70px]"
        )}>
            {children}
        </aside>
    )
}
 
export default Wrapper