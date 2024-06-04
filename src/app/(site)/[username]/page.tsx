import { notFound } from "next/navigation"
import { getUserByUsername } from "@/actions/user-service"
import { isFollowingUser } from "@/actions/follow-service"
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