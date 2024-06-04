import Link from "next/link"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
});

const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="bg-white shrink-0 mr-6 lg:mr-0 p-1.5 rounded-full">
                    <Image
                        src="/swarmitch.png"
                        height={30}
                        width={30}
                        alt="swarmitch logo"
                    />
                </div>
                <div className={cn(
                    "hidden lg:flex flex-col items-start",
                    font.className
                )}>
                    <p className="text-lg font-semibold">
                        Swarmitch
                    </p>
                    <p className="text-xs text-[#909192]">
                        Let&apos;s dance!
                    </p>
                </div>
            </div>
        </Link>
    )
}
 
export default Logo