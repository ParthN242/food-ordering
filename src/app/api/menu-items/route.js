import connect from "@/dbConfig/dbConfig";
import MenuItem from "@/models/MenuItems";
import { NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET(req) {
  connect();

  try {
    const items = await MenuItem.find();

    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function PUT(req) {
  connect();
  if (!(await isAdmin())) {
    return NextResponse.json({
      success: false,
      message: "Invaild credentials",
      status: 400,
    });
  }

  const { id, itemData } = await req.json();

  try {
    const item = await MenuItem.findByIdAndUpdate(id, itemData);

    return NextResponse.json({ success: true, item, message: "Item Updated" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function POST(req) {
  connect();

  if (!(await isAdmin())) {
    return NextResponse.json({
      success: false,
      message: "Invaild credentials",
      status: 400,
    });
  }
  const data = await req.json();
  try {
    const item = await MenuItem.create(data);

    return NextResponse.json({ success: true, item, message: "Item Added" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function DELETE(req) {
  connect();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    await MenuItem.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Item Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
