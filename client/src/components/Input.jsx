import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Input({ value, onChange, label, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      <label className="text-[14.5px] text-gray-300 font-medium block mb-1">
        {label}
      </label>

      <div className="input-box bg-[#2A2A2A] border border-gray-700 text-white">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="w-full bg-transparent outline-none placeholder:text-gray-500 text-white"
        />

        {type === "password" && (
          showPassword ? (
            <FaRegEye
              size={20}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-gray-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  );
}
