import Modal from "@/components/CUSTOM/Modal";
import useModalImage from "@/utils/hooks/useModalImage";
import Image from "next/image";
import React from "react";

const ModalImage = () => {
  const { imageUrl, onClose, isOpen } = useModalImage();

  const handleChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={handleChange}
      classContent={
        "bg-transparent border-none shadow-none focus:outline-none h-80  "
      }
      withClose={false}
    >
      <div className="w-full  h-full mx-auto">
        <Image
          alt="Image"
          fill
          src={imageUrl!}
          className={
            "object-contain mix-blend-normal    transition translate"
          }
        />
      </div>
    </Modal>
  );
};

export default ModalImage;
