import { Webhook } from "svix"
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET)
        throw new Error("Please add CLERK_WEBHOOK_SECRET to your env file");

    // get information from the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature)
        return new Response("Error occured -- no svix headers", { status: 400 });

    // get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // create wh instance
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    try {
        // verify data
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent;
    } catch (error) {
        return new Response("Error occured -- couldn't verify webhook", { status: 400 });
    }

    // get the event ID
    const { id } = evt.data;
    const eventType = evt.type;

    // console.log(`Webhook with a ID of ${id} and type of ${eventType}`);
    // console.log("Webhook body", body);

    switch (eventType) {
        case "user.created":
            await db.user.create({
                data: {
                    clerkUserId: payload.data.id,
                    username: payload.data.username,
                    imageUrl: payload.data.image_url,
                    stream: {
                        create: {
                            name: `${payload.data.usernme}'s stream`
                        }
                    }
                }
            });
            break;
        case "user.updated":
            await db.user.update({
                data: {
                    username: payload.data.username,
                    imageUrl: payload.data.image_url
                },
                where: {
                    clerkUserId: payload.data.id
                }
            });
            break;
        case "user.deleted":
            await db.user.delete({
                where: {
                    clerkUserId: payload.data.id
                }
            });
            break;
        default:
            return new Response("Error occured -- unhandled webhook evt", { status: 400 });
    }

    return new Response("", { status: 200 });
}