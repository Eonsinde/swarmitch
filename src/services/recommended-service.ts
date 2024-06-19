import { db } from "@/lib/db"
import { getUser } from "@/services/auth-service"

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
        // returns user that are not the auth user, not followed by auth user and not in blocking list of any of the user instance
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId
                        }
                    },
                    {
                        NOT: {
                            followingBy: { // followedBy
                                some: {
                                    followerId: userId
                                }
                            }
                        }
                    },
                    {
                        NOT: {
                            blocking: { // blockingList
                                some: {
                                    blockedId: userId
                                }
                            }
                        }
                    }
                ]
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