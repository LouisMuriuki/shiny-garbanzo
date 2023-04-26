import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { downloadImage, getRandomPrompt } from "../utils/Index";
import { FormField, Loader } from "../components/Index";
import Iframe from "../components/modals/Iframe";
import { AiOutlineEye } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useId } from "react";
const CreatePost = () => {
  const navigate = useNavigate();
  const id = useId();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingimg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [textValue, setTextValue] = useState("Sharing... Please wait");

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); // increase time every second
    }

    return () => clearInterval(interval);
  }, [loading]); // run once on component mount

  useEffect(() => {
    if (loading) {
      if (time > 15 && time <= 25) {
        setTextValue("Good things take time...Please wait");
      } else if (time > 25 && time <= 35) {
        setTextValue("Almost there...Please wait");
      } else if (time > 35) {
        setTextValue("Finalising...Please wait");
      }
    }
  }, [time, loading]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dalle-qgms.onrender.com/api/v1/post/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        console.log(response);
        await response.json();
        if (response.ok) {
          navigate("/");
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://dalle-qgms.onrender.com/api/v1/dalle/",
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        console.log(data);
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        console.log(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("please enter a prompt");
    }
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-xl text-[#222328]">
          Imagine and Create
        </h1>
        <p className="mt-2 text-[#666e75] text=[16px] max-w-[500px]">
          Create imaginative and visually stunning AI images and share them with
          the community
        </p>
        <p className="mt-2 text-[#666e75] text=[16px] max-w-[500px]">
          Your imagination is your only limit
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A BBQ that is alive, in the style of a Pixar animated movie"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <div className="relative w-full h-full">
                <img
                  src={form.photo}
                  alt={form.prompt}
                  onClick={openModal}
                  className="w-full h-full cursor-pointer object-contain"
                />
                <div
                  onClick={openModal}
                  className="absolute inset-0 z-10 flex justify-center items-center opacity-0 cursor-pointer transition duration-300 bg-black bg-opacity-50 hover:opacity-100"
                >
                  <AiOutlineEye color="white" size={24} />
                </div>
              </div>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 object-contain h-9/12 opacity-40"
              />
            )}

            {generatingimg && (
              <div className="absolute flex justify-center items-center inset-0 z-0 bg-[rgba(0,0,0,0.5)] rounded-lg ">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className="text-white bg-green-700 font-medium rounded-md  text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingimg
              ? "Generating..."
              : form.photo
              ? "Generate variantion"
              : "Generate image"}
          </button>
          {!form.photo || generatingimg ? null : (
            <button
              type="button"
              onClick={() => downloadImage(id, form.photo)}
              className="text-white bg-green-700 font-medium rounded-md  text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {form.photo && (
                <div className="flex items-center justify-center gap-1">
                  <FiDownload color="white" size={20} />
                  Download image
                </div>
              )}
            </button>
          )}
        </div>
        <div className="mt-10">
          <p className="mt-2 text=[#666e75] text-[14px]">
            Once you have created the image you want you can share it with
            others
          </p>
          <button
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:auto px-5 py-2.5 text-center"
            type="submit"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <p>{textValue}</p>
              </div>
            ) : (
              "Share"
            )}
          </button>
        </div>
      </form>
      <Iframe
        img={form.photo}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      >
        <img
          src={form.photo}
          className="object-cover  p-10"
          alt={form.prompt}
        />
      </Iframe>
    </section>
  );
};

export default CreatePost;
