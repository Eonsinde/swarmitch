"use client"
import { useSidebar } from "@/store/use-sidebar"
import { Stream, User } from "@prisma/client"
import UserItem, { UserItemSkeleton } from "./user-item"

type Props = {
    users: (User & { stream: Stream | null }) []
}

export default function Recommended({ users }: Props) {
    const { collapsed } = useSidebar();

    const showLabel = !collapsed && users.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className="text sm text-muted-foreground">
                        Recommended
                    </p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {users.map((user) => (
                    <UserItem
                        key={user.id}
                        username={user.username}
                        imageUrl={user.imageUrl}
                        isLive={user.stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    )
}

export function RecommendedSkeleton() {
    return (
        <ul className="px-2">
            {new Array(3).fill(1).map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}