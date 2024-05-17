import Wrapper from "./wrapper"
import Toggle from "./toggle"
import Recommended, { RecommendedSkeleton } from "./recommended"
import { getRecommended } from "@/actions/recommended-service"

export default async function Sidebar() {
    // fetch recommended users
    const recommended = await getRecommended();

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Recommended users={recommended} />
            </div>
        </Wrapper>
    )
}

export const SidebarSkeleton = () => {
    return(
        <aside className="z-50 fixed left-0 flex flex-col h-full w-[70px] lg:w-60 pt-1 lg:pt-3 bg-background border-r border-border">
            <RecommendedSkeleton />
        </aside>
    )
}