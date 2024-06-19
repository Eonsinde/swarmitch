"use client"
import { useMemo } from "react"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hint from "@/components/hint"

export default function() {
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar();

    const label = useMemo(() => collapsed ? "Expand" : "Collapse", []);

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex justify-center items-center w-full mb-4 pt-4">
                    <Hint
                        label={label}
                        side="right"
                        asChild
                    >
                        <Button
                            className="h-auto p-2"
                            variant="ghost"
                            onClick={onExpand}
                        >
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="hidden lg:flex items-center w-full mb-2 p-3 pl-6">
                    <p className="font-semibold text-primary">
                        Dashboard
                    </p>
                    <Hint
                        label={label}
                        side="right"
                        asChild
                    >
                        <Button
                            className="h-auto ml-auto p-2"
                            variant="ghost"
                            onClick={onCollapse}
                        >
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}