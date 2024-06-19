"use server"
import { revalidatePath } from "next/cache"
import { blockUser, unblockUser } from "@/services/block-service"

export const onBlock = async (id: string) => {
    // TODO: Adapt to disconnect from livestream
    // allow to kick the guest
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if (blockedUser)
        revalidatePath(`/${blockedUser.blocked.username}`);

    return blockedUser;
}

export const onUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id);

    if (unblockedUser)
        revalidatePath(`/${unblockedUser.blocked.username}`);

    return unblockedUser;
}