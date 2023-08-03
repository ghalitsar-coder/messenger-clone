import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    if (!email || !password || !name) {
      return new NextResponse("Missing Credentials", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
