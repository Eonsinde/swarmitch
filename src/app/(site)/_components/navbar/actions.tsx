import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { Clapperboard } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

const Actions = async () => {
    const user = await currentUser();

    return (
        <div className="flex justify-end items-center gap-x-2 ml-4 lg:ml-0">
            {!user && (
                <SignInButton>
                    <Button
                        size="sm"
                    >
                        Login
                    </Button>
                </SignInButton>
            )}
            {!!user && (
                <div className="flex items-center gap-x-4">
                    <Link
                        className={buttonVariants({
                            className: "text-muted-foreground hover:text-primary",
                            variant: "ghost",
                            size: "sm"
                        })}
                        href={`/u/${user.username}`}
                    >
                        <Clapperboard className="h-5 w-5 lg:mr-2" />
                        <span className="hidden lg:block">
                            Dashboard
                        </span>
                    </Link>
                    <UserButton
                        afterSignOutUrl="/"
                    />
                </div>
            )}
        </div>
    )
}
 
export default Actions