import { redirect } from "next/navigation"
import { getUser } from "@/actions/auth-service"
import Container from "./_components/container"
import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"

const SiteLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const user = await getUser();

    if (!user)
        return redirect("/account-setup");

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}
 
export default SiteLayout