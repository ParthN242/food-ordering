"use client";
import { AppContext } from "@/Provider/AppContext";
import React, { useContext } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

const CartItem = ({ item, index }) => {
  const { removeCartItem } = useContext(AppContext);

  let price = item.basePrice;

  if (item.size) {
    price += item.size.price;
  }

  if (item.extraIngredient.length > 0) {
    for (let extra of item.extraIngredient) {
      price += extra.price;
    }
  }

  return (
    <div className="flex items-center gap-6 max-md:gap-3 border-b border-gray-200 px-2 max-md:p-0 py-4">
      <div className="w-24">
        <img
          src={item.image}
          alt={item.name}
          className="w-full object-contain"
        />
      </div>
      <div className="flex-1">
        <h6 className="font-bold text-[16px] max-md:text-sm">{item.name}</h6>
        {item.size && (
          <p className="text-sm text-black">Size: {item.size.name}</p>
        )}
        {item.extraIngredient.length > 0 && (
          <div>
            {item.extraIngredient.map((i) => (
              <p key={i.name} className="text-sm text-gray-500">
                {i.name} ${i.price}
              </p>
            ))}
          </div>
        )}
      </div>
      <div>
        <h5 className="text-lg font-semibold">${price}</h5>
      </div>
      <button
        className="border border-gray-400 p-2 max-md:p-1 rounded-lg"
        onClick={() => removeCartItem(index)}
      >
        <HiOutlineTrash className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default CartItem;
