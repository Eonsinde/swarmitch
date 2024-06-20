"use client"
import { useState, useTransition, useRef, ElementRef } from "react"
import { IngressInput } from "livekit-server-sdk"
import { toast } from "sonner"
import { AlertTriangle } from "lucide-react"
import {
    Dialog,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { createIngress } from "@/actions/ingress"

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {
    const [isPending, startTransition] = useTransition();

    const closeRef = useRef<ElementRef<"button">>(null);

    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    closeRef?.current?.click();
                    toast.success("Ingress created");
                })
                .catch(() => toast.error("Something went wrong"));
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Generate
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                </DialogHeader>
                <Select
                    value={ingressType}
                    disabled={isPending}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection
                    </AlertDescription>
                </Alert>
                <DialogFooter>
                    <DialogClose
                        ref={closeRef}
                        asChild
                    >
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isPending}
                        onClick={onSubmit}
                    >
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectModal