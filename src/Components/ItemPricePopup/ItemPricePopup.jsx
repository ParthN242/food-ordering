"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

import { HiOutlineTrash } from "react-icons/hi2";

const ItemPricePopup = ({ name, addLabel, prop, setProp }) => {
  const [open, setOpen] = useState(false);

  function addProp() {
    setProp((oldProp) => {
      return [...oldProp, { name: "", price: "" }];
    });
  }

  const editProp = (e, index, prop) => {
    setProp((prev) => {
      const newProp = [...prev];
      newProp[index][prop] = e.target.value;
      return newProp;
    });
  };

  function removeProp(index) {
    setProp((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  }
  return (
    <div className="bg-gray-300 rounded-lg p-2">
      <button
        className="flex gap-2 items-center font-semibold text-gray-800  w-full p-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <IoIosArrowUp className="text-lg" />
        ) : (
          <IoIosArrowDown className="text-lg" />
        )}
        <p>{name}</p>
        <span>({prop.length})</span>
      </button>
      <div className={`${open ? "flex gap-2 flex-col" : "hidden"}`}>
        {prop.length > 0 &&
          prop.map((item, index) => (
            <div
              className="flex items-center gap-2 justify-between"
              key={index}
            >
              <div className="flex-1">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Size name"
                  value={item.name || ""}
                  onChange={(e) => editProp(e, index, "name")}
                />
              </div>
              <div className="flex-1">
                <label className="label">Extra pice</label>
                <input
                  type="number"
                  className="input"
                  placeholder="price"
                  value={item.price || ""}
                  onChange={(e) => editProp(e, index, "price")}
                />
              </div>
              <button
                className="bg-white rounded-lg p-1 h-full mt-6"
                onClick={() => removeProp(index)}
              >
                <HiOutlineTrash className="text-2xl text-gray-600" />
              </button>
            </div>
          ))}
        <button
          onClick={addProp}
          className="w-full p-2 bg-white flex items-center justify-center gap-2 rounded-lg text-gray-800 font-semibold"
        >
          <FiPlus />
          <p>{addLabel}</p>
        </button>
      </div>
    </div>
  );
};

export default ItemPricePopup;
