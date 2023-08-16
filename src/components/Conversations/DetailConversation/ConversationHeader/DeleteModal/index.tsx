"use client";

import Modal from "@/components/CUSTOM/Modal";
import { Button } from "@/components/ui/button";
import useConversation from "@/utils/hooks/useConversation";
import useDeleteModal from "@/utils/hooks/useDeleteModal";
import { deleteConversation } from "@/utils/services/conversation/conversationHeader";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { FiAlertTriangle } from "react-icons/fi";
import useProfileDrawer from "@/utils/hooks/useProfileDrawer";

const DeleteModal = () => {
  const { isOpen, onClose } = useDeleteModal();
  const { onClose: onCloseProfile } = useProfileDrawer();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onChange = (open: boolean) => {
    if (!open && !isLoading) {
      onClose();
    }
  };

  const onDelete = useCallback(async () => {
    setIsLoading(true);
    await deleteConversation({
      conversationId,
      onSuccess: (response: any) => {
        onClose();
        onCloseProfile();
      },
    });

    setIsLoading(false);
  }, [conversationId, router]);

  return (
    <Modal onChange={onChange} isOpen={isOpen}>
      <div className="flex items-center gap-x-2 mb-5">
        <div className="p-2.5 rounded-full bg-red-100">
          <FiAlertTriangle className={"text-red-600 w-6 h-6 "} />
        </div>
        <div className="">
          <h3 className="font-semibold text-sm">Delete Conversation</h3>
          <p className="text-xs text-gray-500">
            Are you sure you want to delete this conversation? This action will
            delete all the conversations and can`t be undone
          </p>
        </div>
      </div>
      <Button disabled={isLoading} onClick={onDelete}>
        {isLoading ? <ImSpinner8 className={"animate-spin"} /> : "Delete!"}
      </Button>
    </Modal>
  );
};

export default DeleteModal;
