import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Number,
    },
    postalCode: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models?.user || model("user", UserSchema);

export default UserModel;
