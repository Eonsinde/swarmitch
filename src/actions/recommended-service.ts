import { db } from "@/lib/db"
import { getUser } from "@/actions/auth-service"

export const getRecommended = async () => {
    await new Promise((res) => setTimeout(res, 5000));

    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return users;
}