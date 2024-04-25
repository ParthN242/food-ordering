import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { orderInfo } = await req.json();

    const order = await Order.create(orderInfo);

    return NextResponse.json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}

export async function GET() {
  const user = getServerSession();

  try {
    const orders = await Order.find({ email: user.email });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
