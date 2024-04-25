import { authoption } from "@/app/api/auth/[...nextauth]/route";
import connect from "@/dbConfig/dbConfig";
import MenuItem from "@/models/MenuItems";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SK);

export async function GET(req) {
  const url = new URL(req.url);
  const amount = url.searchParams.get("amount");

  const myPayment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    metadata: {
      company: "Food Ordering",
    },
    description: "Enjoy",
  });

  return NextResponse.json({ client_secret: myPayment.client_secret });
}
