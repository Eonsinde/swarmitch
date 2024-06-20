"use client"
import { useState } from "react"
import { CheckCheck, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
    value?: string
}

const CopyButton = ({ value }: Props) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const Icon = isCopied ? CheckCheck : Copy 

    const onCopy = () => {
        if (!value) return;

        setIsCopied(true);
        navigator.clipboard.writeText(value);

        setTimeout(() => setIsCopied(false), 1000);
    }

    return (
        <Button
            disabled={!value || isCopied}
            onClick={onCopy}
        >
            <Icon className="h-4 w-4" />
        </Button>
    )
}
 
export default CopyButton