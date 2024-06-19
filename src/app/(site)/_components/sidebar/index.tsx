import { getRecommended } from "@/services/recommended-service"
import { getFollowedUsers } from "@/services/follow-service"
import Wrapper from "./wrapper"
import Toggle, { ToggleSkeleton } from "./toggle"
import Following, { FollowingSkeleton } from "./following"
import Recommended, { RecommendedSkeleton } from "./recommended"

export default async function Sidebar() {
    // fetch recommended users
    const recommended = await getRecommended();
    const following = await getFollowedUsers();

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Following following={following} />
                <Recommended users={recommended} />
            </div>
        </Wrapper>
    )
}

export const SidebarSkeleton = () => {
    return(
        <aside className="z-50 fixed left-0 flex flex-col h-full w-[70px] lg:w-60 pt-1 lg:pt-3 bg-background border-r border-border">
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </aside>
    )
}