import React, { useState } from "react";
import { download } from "../assets";
import { downloadImage } from "../utils/Index";
import { AiOutlineEye } from "react-icons/ai";
import Iframe from "./modals/Iframe";

const Card = ({ _id, name, prompt, photo }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        src={photo}
        alt={prompt}
        className="w-full h-auto object-cover rounded-xl"
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 p-4 rounded-md bg-[#10131f] m-2">
        <p className="text-white text-sm overflow-y-auto">{prompt}</p>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <div className="flex gap-4 items-center">
            <AiOutlineEye
              color="white"
              size={30}
              className="cursor-pointer"
              onClick={openModal}
            />
            <button
              className="outline-none bg-transparent border-none"
              type="button "
              onClick={() => downloadImage(_id, photo)}
            >
              <img src={download} className="w-6 h-6 object-contain invert" />
            </button>
          </div>
        </div>
      </div>
      <Iframe modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <img src={photo} className="object-contain p-10" alt={prompt} />
      </Iframe>
    </div>
  );
};

export default Card;
