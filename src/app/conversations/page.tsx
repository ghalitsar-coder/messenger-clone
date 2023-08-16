"use client";

import EmptyState from "@/components/Users/EmptyState";
import { cn } from "@/lib/utils";
import useConversation from "@/utils/hooks/useConversation";
import React from "react";

const Conversations = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={cn("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Conversations;
