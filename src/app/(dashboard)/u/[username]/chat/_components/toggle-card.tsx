"use client"
import { useTransition } from "react"
import { updateStream } from "@/actions/stream"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

type Props = {
    field: FieldTypes
    label: string
    value: boolean
}

const ToggleCard = ({
    field,
    label,
    value
}: Props) => {
    const [isPending, startTransition] = useTransition();

    const onChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success("Chat settings updated!"))
                .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        <div className="bg-muted p-6 rounded-xl">
            <div className="flex justify-between items-center space-x-4 lg:space-x-0">
                <p className="font-semibold">
                    {label}
                </p>
                <Switch
                    checked={value}
                    disabled={isPending}
                    onCheckedChange={onChange}
                >
                    {value ? "On" : "Off"}
                </Switch>
            </div>
        </div>
    )
}

export default ToggleCard