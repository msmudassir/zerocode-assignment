import { NextResponse } from "next/server";
import { loginUser } from "@/app/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = loginUser(email, password); 

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("auth", email, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
