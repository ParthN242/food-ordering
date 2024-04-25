import connect from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { isAdmin } from "../../auth/[...nextauth]/route";

export async function GET(_, { params }) {
  connect();

  if (!(await isAdmin())) {
    return NextResponse.json({
      success: false,
      message: "Invaild credentials",
      status: 400,
    });
  }

  const { id } = params;

  try {
    const user = await User.findById(id);

    if (!user)
      return NextResponse.json({ success: false, error: "Invalid user id" });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function PUT(req, { params }) {
  connect();
  const { id } = params;

  const userData = await req.json();

  try {
    const user = await User.findByIdAndUpdate(id, userData);

    if (!user)
      return NextResponse.json({ success: false, error: "Invalid user id" });

    return NextResponse.json({ success: true, user, message: "User Updated" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
