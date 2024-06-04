import { db } from "@/lib/db"
import { getUser } from "@/actions/auth-service"

export const getRecommended = async () => {
    await new Promise((res) => setTimeout(res, 5000));

    let userId;

    try {
        const self = await getUser();
        userId = self?.id;
    } catch {
        userId = null;
    }

    let users = [];

    if (userId) {
        users = await db.user.findMany({
            where: {
                NOT: {
                    id: userId
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    } else {
        // if not authenticated, return all users
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    return users;
}