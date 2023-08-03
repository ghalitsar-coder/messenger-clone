import React from "react";
import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import toast from "react-hot-toast";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
    where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (err) {
    console.error(`Error:getCurrentUser ->`, err);
    toast.error("User not found!");
    return null;
  }
};

export default getCurrentUser;
