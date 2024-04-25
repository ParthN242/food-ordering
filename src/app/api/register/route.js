import connect from "@/dbConfig/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  connect();
  const { email, password } = await req.json();

  if (!email || !password)
    return Response.json({
      success: false,
      error: "Please enter email and password",
      status: 400,
    });

  const user = await User.findOne({ email });

  if (user) {
    return Response.json({
      success: false,
      error: "Email is already use",
      status: 400,
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  await User.create({ email, password: hashedPassword });

  return Response.json({
    success: true,
    message: "Register success",
    status: 201,
  });
}
