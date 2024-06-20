"use server"
import {
    IngressAudioEncodingPreset,
    IngressInput,
    IngressClient,
    IngressVideoEncodingPreset,
    RoomServiceClient,
    TrackSource,
    type CreateIngressOptions
} from "livekit-server-sdk"
import { db } from "@/lib/db"
import { getUser } from "@/services/auth-service"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!
)

const ingressClient = new IngressClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!
);

export const resetIngresses = async (hostIdentity: string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    // delete all rooms
    for (const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    // delete all ingresses
    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
}

export const createIngress = async (ingressType: IngressInput) => {
    try {
        const self = await getUser();

        // TODO: Reset previous ingress
        await resetIngresses(self?.id!);
    
        let ingressOptions: CreateIngressOptions = {
            name: self?.username,
            roomName: self?.id,
            participantIdentity: self?.id,
            participantName: self?.username
        };
    
        if (ingressType === IngressInput.WHIP_INPUT) {
            ingressOptions.enableTranscoding = false;
        } else {
            ingressOptions.video = {
                source: TrackSource.CAMERA,
                encodingOptions: {
                    case: "preset",
                    value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
                }
            }
    
            ingressOptions.audio = {
                source: TrackSource.MICROPHONE,
                encodingOptions: {
                    case: "preset",
                    value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
                }
            }
        }
    
        const ingress = await ingressClient.createIngress(ingressType, ingressOptions);
    
        if (!ingress || !ingress.url || !ingress.streamKey) {
            throw new Error("Failed to create ingress");
        }
    
        await db.stream.update({
            where: {
                userId: self?.id
            },
            data: {
                ingressId: ingress.ingressId,
                serverUrl: ingress.url,
                streamKey: ingress.streamKey
            }
        });
    
        revalidatePath(`/u/${self?.username}/keys`);
        
        // this causes a error as returned type to client component isn't a plain object
        // return ingress;
    } catch (error: any) {
        console.error("\n\n\n[INGRESS]:", error);
        throw new Error("Server error");
    }
}