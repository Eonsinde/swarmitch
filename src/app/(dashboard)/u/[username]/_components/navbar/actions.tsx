import Link from "next/link"
import { Clapperboard, LogOut } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"

const Actions = async () => {

    return (
        <div className="flex justify-end items-center gap-x-2">
            <Link
                className={buttonVariants({
                    className: "text-muted-foreground hover:text-primary",
                    variant: "ghost",
                    size: "sm"
                })}
                href={`/`}
            >
                <LogOut className="h-5 w-5 lg:mr-2" />
                <span>
                    Exit
                </span>
            </Link>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}
 
export default Actions