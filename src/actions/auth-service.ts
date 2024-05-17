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

    if (!user && activeSessionExpected)
        // if you're expected to be logged in and you're not
        redirect("/account-setup");
    else
        return null;

    return user;
}