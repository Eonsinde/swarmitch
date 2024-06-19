"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import { LucideIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    label: string
    href: string
    icon: LucideIcon
    isActive: boolean
}

export default function NavigationItem({
    label,
    href,
    icon: Icon,
    isActive
}: Props) {
    const { collapsed } = useCreatorSidebar();

    return (
        <Link
            className={buttonVariants({
                className: cn(
                    "h-12 w-full",
                    isActive && "bg-accent"
                ),
                variant: "ghost"
            })}
            href={href}
        >
            <div className={cn(
                "flex items-center w-full gap-x-4",
                collapsed && "justify-center"
            )}>
                <Icon
                    className={cn(
                        "h-4 w-4",
                        collapsed ? "mr-0" : "mr-2"
                    )}
                />
                {!collapsed && (
                    <span>{label}</span>
                )}
            </div>
        </Link>
    )
}

export function NavigationItemSkeleton() {
    const { collapsed } = useCreatorSidebar();

    return (
        <li className={cn(
            "flex items-center py-2 px-3",
            collapsed ? "justify-center" : "justify-start lg:space-x-4"
        )}>
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-md" />
            <div className={cn(
                "flex-1",
                collapsed ? "hidden" : "hidden lg:block"
            )}>
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}