import React from 'react'
import Modal from 'react-modal';
import "./iframe.css"
import {IoMdClose} from "react-icons/io"
const Iframe = ({modalIsOpen,closeModal,children}) => {
    const customStyles = {
       
        
      };
      
  return (
    <Modal
    closeTimeoutMS={500}
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Example Modal"
    className="mx-auto flex justify-center h-min m-1"
    
  >
    <IoMdClose onClick={closeModal} color='red' size={24} className='cursor-pointer'/>

    {children}
   
  </Modal>
  )
}

export default Iframe