import { User } from "@prisma/client";
import { create } from "zustand";

export interface SettingModalProps {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  currentUser?: User;
}

const useSettingModal = create<SettingModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true,   }),
  onClose: () => set({ isOpen: false }),
}));

export default useSettingModal;
