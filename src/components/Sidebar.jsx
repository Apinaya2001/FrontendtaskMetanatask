import React, { useState, useRef } from "react";
import { HiQueueList } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { PiTextAlignLeftFill, PiTextAlignRightFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { GrDashboard } from "react-icons/gr";
// import { IoMdSettings } from "react-icons/io";

const Sidebar = ({
  title,
  setTitle,
  description,
  setDescription,
  additionalText,
  setAdditionalText,
  uploadedImage,
  setUploadedImage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [imageFile, setImageFile] = useState(null); 
  const [alignment, setAlignment] = useState("left"); 
  const fileInputRef = useRef(null); 

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file)); 
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click(); 
  };

  const handleRemoveImage = () => {
    setUploadedImage(null); 
  };

  const handleAddField = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleCloseTokenBar = () => {
    setActiveStep(null);
  };

  const handleAlignmentChange = (e) => {
    setAlignment(e.target.value); 
  };

  const handleSave = () => {
    console.log("Form saved with data:", {
      title,
      description,
      additionalText,
      imageFile,
      alignment,
    });
  };

  const handleDiscard = () => {
    setTitle("");
    setDescription("");
    setAdditionalText("");
    setUploadedImage(null);
    setImageFile(null);
    setAlignment("left");
    console.log("Form changes discarded");
  };

  return (
    <div
      className={`relative bg-white min-h-screen h-[55rem]  p-2 shadow-lg w-[23rem]`}
    >
      <div className="flex items-center space-x-2 mb-8 pt-2">
        <GrDashboard size={24} />
        <h3 className="text-lg font-extrabold">Dashboard&nbsp;&gt;&nbsp;Demo Form</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <IoMdSettings size={28} />
      </div>

     
      <div className="flex flex-row space-x-8 border rounded-md bg-gray-100">
        {["Content", "Design", "Share", "Replies"].map((link) => (
          <a href="#" key={link} className="p-1 cursor-pointer hover:bg-white">
            {link}
          </a>
        ))}
      </div>

      
      <div className="space-y-4 pt-8">
        <div className="flex items-center space-x-3">
          <HiQueueList className="text-lg" />
          <span className="font-bold text-xl">Steps</span>
        </div>
        <p className="text-sm text-gray-600">
          The steps users will take to complete the form
        </p>

        <ul className="space-y-4">
          {["Welcome screen", "Enter your name", "Enter your email"].map(
            (step) => (
              <li
                key={step}
                className={`text-sm text-black border p-2 rounded-md text-center cursor-pointer 
                  ${
                    activeStep === step
                      ? "bg-blue-200 text-white"
                      : "bg-gray-100 text-gray-700"
                  } 
                  hover:bg-white`}
                onClick={() => handleStepClick(step)}
              >
                <a href="#" className="block w-full h-full text-lg">
                  {step}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Add Field Button */}
      <div className="pt-4 text-start pl-2">
        <button
          className="p-3 border text-sm rounded-md hover:bg-white bg-gray-100"
          onClick={handleAddField}
        >
          <span className="flex flex-row items-center ">
            <FaPlus /> <p className="ml-2">Add field</p>
          </span>
        </button>
      </div>

      {/* Token Bar */}
      {activeStep && (
        <div className="absolute top-0 left-0 w-full h-full bg-white shadow-lg p-5 z-50">
          <button
            className="absolute top-2 right-2 text-2xl font-bold text-gray-600 cursor-pointer"
            onClick={handleCloseTokenBar}
          >
            &times;
          </button>

          <div className="space-y-5">
            <div className="text-xl rounded-md flex items-center space-x-4 font-bold">
              <IoMdSettings size={24}/> 
              <span>Settings</span>
            </div>

            <div className="text-lg pt-5">Title</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              className="text-xl border p-2 rounded-md"
              placeholder="Welcome to our form"
            />

            <div className="text-lg">Description</div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              className="text-xl border p-2 rounded-md"
              placeholder="Description of this form"
            />

            <div className="text-lg">Additional Text</div>
            <input
              type="text"
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)} 
              className="text-xl border p-2 rounded-md"
              placeholder="Enter your text here"
            />

           
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <button
              onClick={handleUploadButtonClick}
              className="rounded-md border px-8 py-3 mt-4 transition-colors duration-200 bg-gray-100 hover:bg-gray-300 focus:bg-gray-400"
            >
              Upload
            </button>

            {uploadedImage && (
              <div className="mt-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded Preview"
                  className="rounded-md max-w-xs mb-4"
                />
              </div>
            )}
            {/* Remove Image Button */}
            {uploadedImage && (
              <div className="flex justify-center">
                <button
                  onClick={handleRemoveImage}
                  className="rounded-xl border content-center pl-6 py-3 pr-5 transition-colors duration-200 bg-gray-200 hover:bg-gray-300 focus:bg-gray-400"
                >
                  Remove Image
                </button>
              </div>
            )}

            {/* Placement Section */}
            <div className="mt-4">
              <div className="text-xl flex mb-5 space-x-4 ">
                Placement 
                <button
                  className={`flex items-center space-x-2 px-5 py-2 rounded transition-colors duration-200 ${
                    alignment === "left"
                      ? "bg-gray-100 border-black text-black"
                      : "bg-gray-100 hover:bg-white"
                  }`}
                  onClick={() => setAlignment("left")}
                >
                  <PiTextAlignLeftFill size={20} />
                </button>
                <button
                  className={`flex items-center space-x-2 px-5 py-2 rounded transition-colors duration-200 ${
                    alignment === "right"
                      ? "bg-gray-100 border-black text-black"
                      : "bg-gray-100 hover:bg-white"
                  }`}
                  onClick={() => setAlignment("right")}
                >
                  <PiTextAlignRightFill size={20} />
                </button>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleSave}
                className="rounded-md border px-6 py-2 bg-white text-black hover:bg-green-600 hover:text-white transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={handleDiscard}
                className="rounded-md border px-6 py-2 bg-white text-red-700 hover:bg-red-600 hover:text-white transition-colors duration-200"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-1/3 relative">
            <button
              className="absolute top-2 right-2 text-lg"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Field</h2>
            <div className="flex flex-row w-full justify-between"> 
              <button
                className="flex items-center space-x-2 px-4 py-2   text-black  text-sm rounded-md shadow hover:bg-blue-600  transition duration-300 ease-in-out"
                onClick={handleAddField}
              >
                <IoCheckmarkOutline size={18} />
                <span>Add Field</span>
              </button>

              <button
                className="flex items-center space-x-2 px-4 py-2 text-black text-sm rounded-md shadow hover:bg-green-600 transition duration-300 ease-in-out"
                onClick={handleAddField}
              >
                <IoMailOutline size={18} />
                <span>Email</span>
              </button>

              <button
                className="flex items-center space-x-2 px-4 py-2  text-black  text-sm rounded-md shadow hover:bg-yellow-600 transition duration-300 ease-in-out"
                onClick={handleAddField}
              >
                <RiArrowDropDownLine size={22} />
                <span>Dropdown</span>
              </button>

              <button
                className="flex items-center space-x-2 px-4 py-2  text-black text-sm rounded-md shadow hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={handleAddField}
              >
                <MdOutlinePhoneEnabled size={18} />
                <span>Phone Number</span>
              </button>
              </div>
          </div>

           
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
