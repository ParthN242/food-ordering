import connect from "@/dbConfig/dbConfig";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  connect();
  const { id } = params;

  try {
    const order = await Order.findById(id);

    if (!order)
      return NextResponse.json({ success: false, error: "Invalid user id" });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
