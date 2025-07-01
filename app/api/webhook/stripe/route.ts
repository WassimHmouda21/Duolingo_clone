import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";

export async function POST(req: Request) {
  const body = await req.text();

  const rawHeaders = await headers(); // ✅ await here
  const signature = rawHeaders.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Optional: handle specific events here
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session?.metadata?.userId;
      const subscriptionId = session?.subscription as string;

      if (!userId || !subscriptionId) {
        return new NextResponse("Missing userId or subscriptionId", { status: 400 });
      }

      await db
        .update(userSubscription)
        .set({ stripeSubscriptionId: subscriptionId })
        .where(eq(userSubscription.userId, userId));

      break;
    }

    // Add more event types as needed
  }

  return new NextResponse(null, { status: 200 });
}
