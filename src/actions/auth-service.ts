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