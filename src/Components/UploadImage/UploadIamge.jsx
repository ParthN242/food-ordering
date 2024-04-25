import { uploadProfileImage } from "@/firebase/function";
import Image from "next/image";
import React from "react";

const UploadIamge = ({ link, setLink, path }) => {
  return (
    <div className="w-40">
      {/* No Image */}
      {link ? (
        <div className="mb-4 w-30 h-28 ">
          <img
            src={link}
            alt="image"
            className="object-contain w-full h-full"
          />
        </div>
      ) : (
        <div className="w-full text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-4 ">
          No Image
        </div>
      )}
      <label
        htmlFor="image"
        className="w-full block cursor-pointer border border-gray-300 text-center text-sm rounded-lg text-gray-500 p-2"
      >
        <input
          type="file"
          id="image"
          className="hidden"
          onChange={(e) => {
            uploadProfileImage(e.target.files[0], setLink, path);
          }}
        />
        Change Image
      </label>
    </div>
  );
};

export default UploadIamge;
