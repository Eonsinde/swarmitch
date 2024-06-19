import { notFound } from "next/navigation"
import { getUserByUsername } from "@/services/user-service"
import { isFollowingUser } from "@/services/follow-service"
import { isBlockedByUser } from "@/services/block-service"
import Actions from "./_components/actions"

type Props = {
    params: {
        username: string
    }
}

const UserDetails = async ({ params: { username } }: Props) => {
    // fetch the requested user's page
    const user = await getUserByUsername(username);

    if (!user)
        notFound();

    // check to see if you're following the requested user
    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked)
        notFound();

    return (
        <div>
            <p>
                {user.username}
            </p>
            Following user: {`${isFollowing}`}
            <Actions
                userId={user.id}
                isFollowing={isFollowing}
            />
        </div>
    )
}

export default UserDetails