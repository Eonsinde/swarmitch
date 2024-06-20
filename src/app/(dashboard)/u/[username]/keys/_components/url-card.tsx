import { Input } from "@/components/ui/input"
import CopyButton from "./copy-button"

type Props = {
    value: string | undefined
}

const UrlCard = ({ value }: Props) => {
    return (
        <div className="bg-muted p-6 rounded-xl">
            <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 lg:gap-x-10">
                <p className="font-semibold">Server URL</p>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-x-2">
                        <Input
                            value={value || ""}
                            disabled
                            placeholder="Server URL"
                        />
                        <CopyButton value={value || ""} />
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default UrlCard