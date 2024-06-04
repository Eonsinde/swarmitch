"use server"
import { revalidatePath } from "next/cache"
import { followUser, unfollowUser } from "./follow-service"

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id);

        revalidatePath("/");

        if (followedUser)
            revalidatePath(`/${followedUser.following.username}`);

        return followedUser;
    } catch (error: any) {
        throw new Error("Server error");
    }
}

export const onUnfollow = async (id: string) => {
    try {
        const unfollowedUser = await unfollowUser(id);

        revalidatePath("/");

        if (unfollowedUser)
            revalidatePath(`/${unfollowedUser.following.username}`);
        
        return unfollowedUser;
    } catch {
        throw new Error("Server error")
    }
}