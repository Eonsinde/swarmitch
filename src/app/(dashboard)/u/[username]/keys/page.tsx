import { getUser } from "@/services/auth-service"
import { getStreamByUserId } from "@/services/stream-service"
import ConnectModal from "./_components/connect-modal"
import UrlCard from "./_components/url-card"
import KeyCard from "./_components/key-card"

const Keys = async () => {
    const self = await getUser();
    const stream = await getStreamByUserId(self?.id!);

    if (!stream)
        throw new Error("Stream not found");

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    Keys & URLs
                </h1>
                <ConnectModal />
            </div>
            <div className="space-y-4">
                <UrlCard value={stream.serverUrl!} />
                <KeyCard value={stream.streamKey!} />
            </div>
        </div>
    )
}
 
export default Keys