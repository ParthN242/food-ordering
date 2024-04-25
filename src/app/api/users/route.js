import User from "@/models/User";
import connect from "@/dbConfig/dbConfig";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
  connect();

  if (!(await isAdmin())) {
    return NextResponse.json({
      success: false,
      message: "Invaild credentials",
      status: 400,
    });
  }

  const users = await User.find();

  return Response.json({
    success: true,
    users,
    status: 200,
  });
}
