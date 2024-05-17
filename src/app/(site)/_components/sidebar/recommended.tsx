"use client"
import { useSidebar } from "@/store/use-sidebar"
import { User } from "@prisma/client"
import UserItem from "./user-item"

type Props = {
    users: User []
}

const Recommended = ({ users }: Props) => {
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
                        isLive={true}
                    />
                ))}
            </ul>
        </div>
    )
}
 
export default Recommended