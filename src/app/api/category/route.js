import connect from "@/dbConfig/dbConfig";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
  connect();

  try {
    const categories = await Category.find();

    return NextResponse.json({
      success: true,
      categories,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error, status: 400 });
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
    await Category.create(data);

    return NextResponse.json({
      success: true,
      message: "Category Added",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error, status: 400 });
  }
}

export async function PUT(req) {
  connect();

  const { id, name, user } = await req.json();

  try {
    await Category.findByIdAndUpdate(id, { name, user });

    return NextResponse.json({
      success: true,
      message: "Category Updated",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error, status: 400 });
  }
}

export async function DELETE(req) {
  connect();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    await Category.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Category Deleted",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error, status: 400 });
  }
}
