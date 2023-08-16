import { Conversation, User } from "@prisma/client";
import { create } from "zustand";

export type ConvProps = Conversation & {
  users: User[];
};

export interface AddConversationProps {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  users: User[] | [];
  getUsers(users: User[]): void;
}

const useAddConversation = create<AddConversationProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  users: [],
  getUsers: (users: User[]) => set({ users }),
}));

export default useAddConversation;
