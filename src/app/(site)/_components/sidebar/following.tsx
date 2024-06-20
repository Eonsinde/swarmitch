"use client"
import { Follow, Stream, User } from "@prisma/client"
import { useSidebar } from "@/store/use-sidebar"
import UserItem, { UserItemSkeleton } from "./user-item"

type Props = {
    /* Follow entries */
    entries: (Follow & {
        following: (User & { stream: Stream | null })
    }) []
}

export default  function Following({ entries }: Props) {
    const { collapsed } = useSidebar();

    if (!entries.length)
        return null;

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
                {entries.map((follow) => (
                    <UserItem
                        key={follow.id}
                        username={follow.following.username}
                        imageUrl={follow.following.imageUrl}
                        isLive={follow.following.stream?.isLive}
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