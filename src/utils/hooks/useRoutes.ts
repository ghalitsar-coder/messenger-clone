import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import useConversation from "./useConversation";
import { HiChat, HiUsers } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        // TODO: does !!conversationId is correct code ? or just !conversationId
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoutes;
