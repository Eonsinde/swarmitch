"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import UserAvatar from "@/components/user-avatar"
import LiveBadge from "@/components/live-badge"

type Props = {
    username: string
    imageUrl: string
    isLive?: boolean
}

export default function UserItem({
    username,
    imageUrl,
    isLive
}: Props) {
    const pathname = usePathname();
    const { collapsed } = useSidebar();

    const href = `/${username}`;
    const isActive = pathname === href;

    return (
        <Link
            className={buttonVariants({
                className: cn(
                    "h-12 w-full",
                    collapsed ? "justify-center" : "justify-start",
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
                <UserAvatar
                    username={username}
                    imageUrl={imageUrl}
                    isLive={isLive}
                />
                {!collapsed && (
                    <p className="truncate">
                        {username}
                    </p>
                )}
                {!collapsed && isLive && (
                    <LiveBadge className="ml-auto" />
                )}
            </div>
        </Link>
    )
}

export function UserItemSkeleton() {
    return (
        <li className="flex items-center gap-x-4 py-2 px-3">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}