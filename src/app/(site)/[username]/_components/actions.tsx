"use client"
import { useTransition } from "react"
import { toast } from "sonner"
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"

type Props = {
    userId: string
    isFollowing: boolean
}

const Actions = ({ userId, isFollowing }: Props) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch((error) => toast.error(error?.message));
        });
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch((error) => toast.error(error?.message));
        });
    }

    return (
        <Button
            disabled={isPending}
            onClick={isFollowing ? handleUnfollow : handleFollow}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}
 
export default Actions