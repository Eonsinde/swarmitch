"use client"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CopyButton from "./copy-button"

type Props = {
    value: string | undefined
}

const KeyCard = ({ value }: Props) => {
    const [show, setShow] = useState<boolean>(false);

    const Icon = show ? EyeOff : Eye;
    
    return (
        <div className="bg-muted p-6 rounded-xl">
            <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 lg:gap-x-10">
                <p className="font-semibold">Stream Key</p>
                <div className="flex-1 flex items-center gap-x-2">
                    <Input
                        value={value || ""}
                        type={show ? "text" : "password"}
                        disabled
                        placeholder="Stream Key"
                    />
                    <Button
                        variant="link"
                        size="sm"
                        disabled={!value}
                        onClick={() => setShow(prevState => !prevState)}
                    >
                        <Icon className="h-4 w-4" />
                    </Button>
                    <CopyButton
                        value={value || ""}
                    />
                </div>
            </div>
        </div>
    )
}
 
export default KeyCard