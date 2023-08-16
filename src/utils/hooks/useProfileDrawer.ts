import { Conversation, User } from "@prisma/client";
import { create } from "zustand";

export type ConvProps = Conversation & {
  users: User[];
};

export interface ProfileDrawer {
  isOpen: boolean;
  onOpen(conv: ConvProps): void;
  onClose(): void;
  data?: ConvProps  
}

const useProfileDrawer = create<ProfileDrawer>((set) => ({
  isOpen: false,
  onOpen: (conv: ConvProps) => set({ isOpen: true, data: conv }),
  onClose: () => set({ isOpen: false }),
}));

export default useProfileDrawer;
