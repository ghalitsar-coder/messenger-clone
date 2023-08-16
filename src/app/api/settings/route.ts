import prisma from "@/lib/prismadb";
import getCurrentUser from "@/utils/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  email: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { name, image } = await request.json();
    
    if (!currentUser?.id) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
