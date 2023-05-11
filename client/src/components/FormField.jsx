import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  isSurpriseMe,
  handleSurpriseMe,
  handleChange,
}) => {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-900">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border-gray-300 border text-gray-900 text-sm rounded focus:ring-[#4649ff] focus:border-[#4649ff] blovk w-full shadow-sm sm:text-sm p-3 "
      />
    </div>
  );
};

export default FormField;
