"use client";

import ProfileDrawer from "@/components/Conversations/DetailConversation/ConversationHeader/ProfileDrawer";
import { useEffect, useState } from "react";

const DrawerProvider: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProfileDrawer />
    </>
  );
};

export default DrawerProvider;
