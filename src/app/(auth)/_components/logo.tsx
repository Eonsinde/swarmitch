import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
});

const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white p-3 rounded-full">
                <Image
                    src="/swarmitch.png"
                    height={60}
                    width={60}
                    alt="swarmitch logo"
                />
            </div>
            <div className={cn(
                "flex flex-col items-center",
                font.className
            )}>
                <p className="text-xl font-semibold">
                    Swarmitch
                </p>
                <p className="text-sm text-[#909192]">
                    Let&apos;s dance!
                </p>
            </div>
        </div>
    )
}
 
export default Logo