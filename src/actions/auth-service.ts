import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export const getUser = async () => {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.username)
        throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: clerkUser.id
        }
    });

    if (!user)
        redirect("/account-setup");

    return user;
}