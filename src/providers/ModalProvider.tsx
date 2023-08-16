"use client";

import AddConversationModal from "@/components/Conversations/ConversationList/AddConversationModal";
import ModalImage from "@/components/Conversations/DetailConversation/ConversationBody/MessageBox/ModalImage";
import DeleteModal from "@/components/Conversations/DetailConversation/ConversationHeader/DeleteModal";
import React, { useEffect, useState } from "react";

const ModalProvider: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteModal />
      <AddConversationModal />
      <ModalImage />
    </>
  );
};

export default ModalProvider;
