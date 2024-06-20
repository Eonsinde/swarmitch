"use client"
import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center space-x-4">
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[100px]" />
            </div>
            <div className="space-y-4">
                <Skeleton className="p-9 w-full rounded-xl" />
                <Skeleton className="p-9 w-full rounded-xl" />
            </div>
        </div>
    )
}

export default loading