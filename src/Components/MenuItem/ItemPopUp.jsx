"use client";

import { useState } from "react";

const ItemPopUp = ({ item, setShowPopUp, handleAddToCart }) => {
  console.log("item: ", item);
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);
  const [selectedIngredient, setSelectedIngredient] = useState([]);

  const handleExtraIngredientClick = (e, ingredient) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedIngredient((prev) => [...prev, ingredient]);
    } else {
      setSelectedIngredient((prev) =>
        prev.filter((i) => i.name !== ingredient.name)
      );
    }
  };

  let selectedPrice = item.basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedIngredient.length > 0) {
    for (let extra of selectedIngredient) {
      selectedPrice += extra.price;
    }
  }
  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black/70"
      onClick={() => setShowPopUp(false)}
    >
      <div
        className=" my-8  bg-white rounded-xl px-2 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-md w-[28rem] overflow-y-scroll max-h-[90vh] flex items-center flex-col gap-2 py-4 px-2">
          <img
            src={item.image}
            width={300}
            height={200}
            alt={item.name}
            className="w-[300px] h-[200px] object-contain"
          />
          <h1 className="text-center font-bold text-xl">{item.name}</h1>
          <p className="text-center text-[13px] text-textColor">
            {item.description}
          </p>
          {/* Sizes */}
          <div className="self-stretch flex flex-col gap-2">
            <p className="text-center">Pick your size</p>
            {item.sizes.map((size) => (
              <div
                className="border border-gray-300 rounded-lg py-3 px-6"
                key={size.name}
              >
                <label
                  htmlFor={size.name}
                  className="flex item-center gap-4 w-full"
                >
                  <input
                    type="radio"
                    name="sizes"
                    id={size.name}
                    checked={selectedSize.name === size.name}
                    onChange={() => setSelectedSize(size)}
                  />
                  <p className="text-textColor">
                    {size.name} <span>${size.price + item.basePrice}</span>
                  </p>
                </label>
              </div>
            ))}
          </div>
          {/* Extra Indredients */}
          <div className="self-stretch flex flex-col gap-2">
            <p className="text-center">Any extra?</p>
            {item.extraIngredientsPrices.map((ingre) => (
              <div
                className="border border-gray-300 rounded-lg py-3 px-6"
                key={ingre.name}
              >
                <label
                  htmlFor={ingre.name}
                  className="flex item-center gap-4 w-full"
                >
                  <input
                    type="checkbox"
                    name="sizes"
                    id={ingre.name}
                    onChange={(e) => handleExtraIngredientClick(e, ingre)}
                  />
                  <p className="text-textColor">
                    {ingre.name} <span>+${ingre.price}</span>
                  </p>
                </label>
              </div>
            ))}
          </div>
          <button
            className="self-stretch bg-primary text-white outline-none rounded-lg p-2"
            onClick={() => {
              setShowPopUp(false);
              handleAddToCart(item, selectedSize, selectedIngredient);
            }}
          >
            Add to cart ${" "}
            {/* {item.basePrice +
              selectedSize.price +
              selectedIngredient?.reduce((a, b) => (a += b.price), 0)} */}
            {selectedPrice}
          </button>
          <button
            className="self-stretch border border-gray-400 outline-none rounded-lg p-2"
            onClick={() => setShowPopUp(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemPopUp;
