import { Conversation, User } from "@prisma/client";
import { create } from "zustand";

export type ConvProps = Conversation & {
  users: User[];
};

export interface DeleteModalProps {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  onDeleteSuccess(): void;
  onReset(): void;
  isSuccess?: boolean;
}

const useDeleteModal = create<DeleteModalProps>((set) => ({
  isOpen: false,
  isSuccess: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onDeleteSuccess: () => set({ isSuccess: true }),
  onReset: () => set({ isSuccess: false }),
}));

export default useDeleteModal;
