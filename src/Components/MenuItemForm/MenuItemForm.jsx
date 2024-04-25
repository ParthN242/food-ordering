import React, { useEffect, useState } from "react";
import UploadIamge from "../UploadImage/UploadIamge";
import ItemPricePopup from "../ItemPricePopup/ItemPricePopup";
import axios from "axios";

const MenuItemForm = ({ menuItem, onSubmit }) => {
  const [image, setImage] = useState(menuItem?.image || null);
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState([]);
  const [extraIngredientsPrices, setExtraIngredientsPrices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/category")
      .then((data) => setCategories(data.data.categories));
  }, []);

  useEffect(() => {
    if (menuItem) {
      setImage(menuItem.image);
      setName(menuItem.name);
      setDescription(menuItem.description);
      setCategory(menuItem.category);
      setBasePrice(menuItem.basePrice);
      setSizes(menuItem?.sizes || []);
      setExtraIngredientsPrices(menuItem?.extraIngredientsPrices || []);
    }
  }, [menuItem]);
  return (
    <div className="mt-8 flex gap-4 max-md:flex-col">
      <div> 
        <UploadIamge link={image} setLink={setImage} path={"items"} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div>
          <label className="label">Item name</label>
          <input
            type="text"
            placeholder="Item name"
            className="input"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="input"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Description</label>
          <select
            name="category"
            id=""
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">--select--</option>
            {categories?.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Base Price</label>
          <input
            type="number"
            placeholder="Base Price"
            className="input"
            value={basePrice || ""}
            onChange={(e) => setBasePrice(e.target.value)}
          />
        </div>
        <ItemPricePopup
          name={"Size"}
          addLabel={"Add items size"}
          prop={sizes}
          setProp={setSizes}
        />
        <ItemPricePopup
          name={"Extra ingridents"}
          addLabel={"Add ingridients prices"}
          prop={extraIngredientsPrices}
          setProp={setExtraIngredientsPrices}
        />
        <button
          className="button"
          onClick={() =>
            onSubmit({
              name,
              image,
              category,
              description,
              basePrice,
              sizes,
              extraIngredientsPrices,
            })
          }
        >
          save
        </button>
      </div>
    </div>
  );
};

export default MenuItemForm;
