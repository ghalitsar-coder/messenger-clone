import { create } from "zustand";

export interface ModalImageProps {
  isOpen: boolean;
  onOpen(url: string): void;
  onClose(): void;
  imageUrl?: string;
}

const useModalImage = create<ModalImageProps>((set) => ({
  isOpen: false,
  onOpen: (imageUrl: string) => set({ isOpen: true, imageUrl }),
  onClose: () => set({ isOpen: false }),
  imageUrl: "",
}));

export default useModalImage;
