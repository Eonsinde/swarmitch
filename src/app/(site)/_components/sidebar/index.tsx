import Wrapper from "./wrapper"
import Toggle from "./toggle"
import Recommended from "./recommended"
import { getRecommended } from "@/actions/recommended-service"

const Sidebar = async () => {
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
 
export default Sidebar