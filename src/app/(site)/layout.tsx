import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getUser } from "@/actions/auth-service"
import Container from "./_components/container"
import Navbar from "./_components/navbar"
import Sidebar, { SidebarSkeleton } from "./_components/sidebar"

const SiteLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    await getUser(false);

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}
 
export default SiteLayout