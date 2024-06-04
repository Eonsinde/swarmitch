import { db } from "@/lib/db"
import { getUser } from "@/actions/auth-service"

export const isFollowingUser = async (id: string) => {
    // check to see if authUser is following user with the params id
    try {
        const self = await getUser();

        const otherUser = await db.user.findUnique({
            where: {
                id
            }
        });

        if (!otherUser)
            throw new Error("User not found");

        if (otherUser.id === self?.id)
            return true;

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self?.id,
                followingId: otherUser.id
            }
        });

        return !!existingFollow;
    } catch {
        return false;
    }
}

export const followUser = async (id: string) => {
    const self = await getUser();

    const otherUser = await db.user.findUnique({
        where: { id }
    });

    if (!otherUser)
        throw new Error("User not found");

    if (otherUser.id === self?.id)
        throw new Error("Cannot follow yourself");

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self?.id,
            followingId: otherUser.id
        }
    });

    if (existingFollow)
        throw new Error("Already following");

    const follow = await db.follow.create({
        data: {
            followerId: self?.id!,
            followingId: otherUser.id,
        },
        include: {
            following: true,
            follower: true
        }
    });

    return follow;
}