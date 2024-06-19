"use client"
import { Follow, User } from "@prisma/client"
import { useSidebar } from "@/store/use-sidebar"
import UserItem, { UserItemSkeleton } from "./user-item"


type Props = {
    following: (Follow & { following: User }) []
}

export default  function Following({ following }: Props) {
    const { collapsed } = useSidebar();

    if (!following.length)
        return null

    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4">
                <p className="text sm text-muted-foreground">
                    Following
                </p>
             </div>
            )}
            <ul className="px-2 space-y-2">
                {following.map((follow) => (
                    <UserItem
                        key={follow.id}
                        username={follow.following.username}
                        imageUrl={follow.following.imageUrl}
                    />
                ))}
            </ul>
        </div>
    )
}


export function FollowingSkeleton() {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...new Array(3).fill(1).map((_, i) => (
                <UserItemSkeleton key={i} />
            ))]}
        </ul>
    )
}