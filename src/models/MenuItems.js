import mongoose, { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: { type: String, required: true },
    basePrice: { type: Number, required: true },
    sizes: [{ name: { type: String }, price: { type: Number } }],
    extraIngredientsPrices: [
      { name: { type: String }, price: { type: Number } },
    ],
  },
  { timestamps: true }
);

const MenuItemModel = models?.menuitems || model("menuitems", MenuItemSchema);

export default MenuItemModel;
