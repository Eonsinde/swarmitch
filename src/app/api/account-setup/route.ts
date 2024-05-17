import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export const GET = async (req: Request) => {
    try {
        const clerkUser = await currentUser();

        if (!clerkUser || !clerkUser.username)
            return new NextResponse("Unauthorized", { status: 401 });

        const existingUser = await db.user.findUnique({
            where: {
                clerkUserId: clerkUser.id
            }
        });

        if (existingUser)
            return NextResponse.json(existingUser, { status: 200 });

        const newUser = await db.user.create({
            data: {
                clerkUserId: clerkUser.id,
                username: clerkUser.username,
                imageUrl: clerkUser.imageUrl
            }
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (err) {
        console.log("[ACCOUNT_SETUP]:", err);
        return new NextResponse("Server Error", { status: 500 });
    }
}