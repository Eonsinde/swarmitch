import { redirect } from "next/navigation"
import { getUserByUsername } from "@/services/auth-service"
import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"
import Container from "./_components/container"

type Props = {
    children: React.ReactNode
    params: { username: string }
}

const CreatorLayout = async ({
    children,
    params: { username }
}: Props) => {
    const self = await getUserByUsername(username);

    if (!self)
        redirect("/");

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
 
export default CreatorLayout