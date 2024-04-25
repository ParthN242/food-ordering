"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "@/Provider/AppContext";
import ItemPopUp from "./ItemPopUp";
import { toast } from "react-toastify";

const MenuItem = ({ item }) => {
  const { addToCart } = useContext(AppContext);

  const [showPopup, setShowPopUp] = useState(false);

  const handleAddToCart = (item, size = null, extraIngredient = []) => {
    const { image, name, basePrice, _id } = item;
    const hashOpttion =
      item.sizes.length > 0 || item.extraIngredientsPrices.length > 0;

    if (hashOpttion && !showPopup) {
      setShowPopUp(true);
    } else {
      toast.success("Item Added To Cart");
      addToCart({ _id, image, name, basePrice, size, extraIngredient });
    }
  };

  return (
    <>
      {showPopup && (
        <ItemPopUp
          item={item}
          setShowPopUp={setShowPopUp}
          handleAddToCart={handleAddToCart}
        />
      )}
      <div className="flex items-center justify-between flex-col gap-4 bg-gray-200  p-6 rounded-xl w-80 hover:bg-white shadow-lg hover:shadow-xl">
        <div className="w-[150px] h-[100px]">
          <img
            src={item.image}
            alt={item.name}
            className="object-contain w-full h-full"
          />
        </div>
        <h1 className="text-center text-xl font-bold">{item.name}</h1>
        <p className="line-clamp-3 text-sm text-center h-16">
          {item.description}
        </p>
        <button
          className=" w-full bg-primary rounded-full text-white py-2 text-md hover:bg-darkPrimary font-semibold"
          onClick={() => handleAddToCart(item)}
        >
          Add to cart ${" "}
          {item.sizes.length > 0 || item.extraIngredientsPrices.length > 0
            ? `(from ${item.basePrice})`
            : item.basePrice}
        </button>
      </div>
    </>
  );
};

export default MenuItem;
