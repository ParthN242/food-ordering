import { getServerSession } from "next-auth";
import { authoption, isAdmin } from "../auth/[...nextauth]/route";
import User from "@/models/User";
import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

export async function GET() {
  const session = await getServerSession(authoption);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({
      success: false,
      message: "Please login",
      status: 400,
    });
  }

  connect();

  const user = await User.findOne({ email });

  return Response.json({ success: true, user, status: 200 });
}

export async function POST(req) {
  connect();

  const { email, ...otherData } = await req.json();

  try {
    const user = await User.findOneAndUpdate({ email }, otherData, {
      new: true,
    });
    return Response.json({ success: true, user });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
