"use client";

import useConversation from "@/utils/hooks/useConversation";
import useRoutes from "@/utils/hooks/useRoutes";
import React from "react";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed justify-around w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((route) => (
        <MobileItem key={route.label} {...route} />
      ))}
    </div>
  );
};

export default MobileFooter;
