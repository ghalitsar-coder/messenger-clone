"use client";

import React from "react";
import { HashLoader } from "react-spinners";
import Modal from "../CUSTOM/Modal";

const LoadingModal = () => {
  return (
    <Modal
      isOpen
      withClose={false}
      classContent="bg-transparent shadow-none border-none "
    >
      <div className=" mx-auto    ">
        <HashLoader color="#36d7b7" />
      </div>
    </Modal>
  );
};

export default LoadingModal;
