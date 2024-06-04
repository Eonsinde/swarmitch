"use server"
import { revalidatePath } from "next/cache"
import { followUser } from "./follow-service"

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