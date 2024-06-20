import { getUser } from "@/services/auth-service"
import { getStreamByUserId } from "@/services/stream-service"
import ToggleCard from "./_components/toggle-card"

const Chat = async () => {
    const self = await getUser();
    const stream = await getStreamByUserId(self?.id!);

    if (!stream)
        throw new Error("Stream not found");

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Chat Settings</h1>
            </div>
            <div className="space-y-4">
                <ToggleCard
                    field="isChatEnabled"
                    label="Enable chat"
                    value={stream.isChatEnabled}
                />
                <ToggleCard
                    field="isChatDelayed"
                    label="Delay chat"
                    value={stream.isChatDelayed}
                />
                <ToggleCard
                    field="isChatFollowersOnly"
                    label="Only followers can chat"
                    value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    )
}

export default Chat