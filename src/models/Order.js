import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userEmail: String,
    phone: String,
    address: String,
    postalCode: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const Order = models?.Order || model("Order", OrderSchema);

export default Order;
