"use client"
import { onFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

type Props = {
    userId: string
    isFollowing: boolean
}

const Actions = ({ userId, isFollowing }: Props) => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch((error) => toast.error(error?.message));
        });
    }

    return (
        <Button
            disabled={!(isFollowing || isPending)}
            onClick={onClick}
        >
            Follow
        </Button>
    )
}
 
export default Actions