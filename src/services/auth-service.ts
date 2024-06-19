import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export const getUser = async (activeSessionExpected=true) => {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.username) {
        if (!activeSessionExpected) 
            // to prevent function from throwing exception
            return null;
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: clerkUser.id
        }
    });

    if (!user)
        // if you're logged in with clerk and no registered User account in our DB
        redirect("/account-setup");

    return user;
}

export const getUserByUsername = async (username: string) => {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.username)
        throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { username }
    });

    if (!user)
        throw new Error("User not found");

    if (clerkUser.username !== user.username) 
        // to prevent you from viewing another person's creator dashboard
        throw new Error("Unauthorized");

    return user;
}