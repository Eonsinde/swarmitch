"use server"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { getUser } from "@/services/auth-service"
import { Stream } from "@prisma/client"

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getUser();
        const selfStream = await db.stream.findUnique({
            where: {
                userId: self?.id
            }
        });

        if (!selfStream)
            throw new Error("Stream not found");

        const validData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatDelayed: values.isChatDelayed,
            isChatFollowersOnly: values.isChatFollowersOnly,
        };

        const stream = await db.stream.update({
            where: {
                id: selfStream.id
            },
            data: {
                ...validData
            }
        });

        revalidatePath(`/u/${self?.username}/chat`);
        revalidatePath(`/u/${self?.username}`);
        revalidatePath(`/${self?.username}`);

        return stream;
    } catch {
        throw new Error("[STREAM]: Server Error");
    }
}