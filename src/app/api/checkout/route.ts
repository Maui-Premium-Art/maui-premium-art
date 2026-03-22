import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

export async function POST(req: NextRequest) {
  try {
    const { priceId, artworkTitle, formatName, slug } = await req.json();

    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid priceId" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const origin = req.headers.get("origin") ?? "https://mauipremiumart.com";
    const cancelSlug = typeof slug === "string" ? slug : "mahalo-bird";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        artwork: artworkTitle ?? "",
        format: formatName ?? "",
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/art/${cancelSlug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Checkout session creation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
