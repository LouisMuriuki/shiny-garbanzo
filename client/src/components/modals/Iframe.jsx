import React from "react";
import Modal from "react-modal";
import "./iframe.css";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
const Iframe = ({ modalIsOpen, closeModal, children }) => {
  const customStyles = {};

  const [width, setWidth] = React.useState();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="AIMAGEN"
      className="mx-auto flex justify-center outline-none border-0 border-none max-w-fit w-full h-full"
    >
      <IoMdClose
        onClick={closeModal}
        color="red"
        size={24}
        className={`${isMobile&&"absolute top-4 left-4"} cursor-pointer `}
      />

      {children}
    </Modal>
  );
};

export default Iframe;
