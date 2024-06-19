"use client"
import { useMemo } from "react"
import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react"
import NavigationItem, { NavigationItemSkeleton } from "./navigation-item"

const Navigation = () => {
    const pathname = usePathname();
    const { user } = useUser();

    const routes = useMemo(() => (
        [
            {
                label: "Stream",
                href: `/u/${user?.username}`,
                icon: Fullscreen
            },
            {
                label: "Keys",
                href: `/u/${user?.username}/keys`,
                icon: KeyRound
            },
            {
                label: "Chat",
                href: `/u/${user?.username}/chat`,
                icon: MessageSquare
            },
            {
                label: "Community",
                href: `/u/${user?.username}/community`,
                icon: Users
            }
        ]
    ), [user]);

    if (!user) {
        return (
            <ul className="pt-4 lg:pt-0 space-y-2">
                {[...Array(4)].map((_, i) => (
                    <NavigationItemSkeleton key={i} />
                ))}
            </ul>
        )
    }

    return (
        <ul className="space-y-2 pt-4 lg:pt-0 px-2">
            {routes.map((route) => (
                <NavigationItem
                    key={route.label}
                    label={route.label}
                    href={route.href}
                    icon={route.icon}
                    isActive={pathname === route.href}
                />
            ))}
        </ul>
    )
}

export default Navigation