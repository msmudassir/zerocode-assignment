import { NextResponse } from "next/server";
import { registerUser } from "@/app/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    registerUser(email, password);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
