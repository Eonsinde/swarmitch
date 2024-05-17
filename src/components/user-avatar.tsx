import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import LiveBadge from "./live-badge"

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-8 w-8",
                lg: "h-14 w-14"
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface UserAvatarProps
extends VariantProps<typeof avatarSizes> {
    username: string
    imageUrl: string
    isLive?: boolean
    showBadge?: boolean
}

export default function UserAvatar({
    username,
    imageUrl,
    isLive,
    showBadge,
    size
}: UserAvatarProps) {
    const canShowBadge = showBadge && isLive;

    return (
        <div className="relative">
            <Avatar
                className={cn(
                    isLive && "border border-background ring-2 ring-pink-500",
                    avatarSizes({ size })
                )}
            >
                <AvatarImage
                    className="object-cover"
                    src={imageUrl}
                />
                <AvatarFallback>
                    {username[0]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}
        </div>
    )
}
 

interface UserAvatarSkeletonProps
extends VariantProps<typeof avatarSizes> {}

export function UserAvatarSkeleton({
    size
}: UserAvatarSkeletonProps) {
    <Skeleton
        className={cn(
            "rounded-full",
            avatarSizes({ size })
        )}
    />
}