import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";

export async function POST(req: Request) {
  const body = await req.text();
 const rawHeaders = await headers(); 
     const signature = rawHeaders.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK8SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

const data = (subscription as any).data || subscription; // fallback

const periodEnd = (data.current_period_end ?? data.data?.current_period_end) as number;

await db.insert(userSubscription).values({
  userId: session.metadata.userId,
  stripeSubscriptionId: subscription.id,
  stripeCustomerId: subscription.customer as string,
  stripePriceId: subscription.items.data[0].price.id,
  stripeCurrentPeriodEnd: new Date(periodEnd * 1000),
});

  }

  if (event.type === "invoice.payment_succeeded") {
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  // Use the same fallback as before to get current_period_end safely
  const data = (subscription as any).data || subscription;
  const periodEnd = (data.current_period_end ?? data.data?.current_period_end) as number;

  await db.update(userSubscription).set({
    stripePriceId: subscription.items.data[0].price.id,
    stripeCurrentPeriodEnd: new Date(periodEnd * 1000),
  }).where(eq(userSubscription.stripeSubscriptionId, subscription.id));

  return new NextResponse(null, { status: 200 });
}
}