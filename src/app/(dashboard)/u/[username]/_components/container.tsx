"use client"
import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"

type Props = {
    children: React.ReactNode
}

const Container = ({ children }: Props) => {
    const matches = useMediaQuery(`(max-width: 1024px)`);
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar();

    useEffect(() => {
        if (matches)
            onCollapse();
        else
            onExpand();
    }, [matches, onCollapse, onExpand]);

    return (
        <div className={cn(
            "flex-1",
            collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60" // might just leave it as ml:60 since we intend upon using a topbar to render channels on mobile
        )}>
            {children}
        </div>
    )
}
 
export default Container