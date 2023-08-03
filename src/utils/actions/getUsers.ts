import React from "react";
import getSession from "./getSession";
import prisma from "@/lib/prismadb";
import toast from "react-hot-toast";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (err) {
    toast.error("Users is not available");
    return [];
  }
};

export default getUsers;
