"use client";
import CartItem from "@/Components/CartItem/CartItem";
import SectionHeader from "@/Components/SectionHeader";
import AddressInputs from "@/Components/UserForm/AddressInputs";
import { AppContext } from "@/Provider/AppContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const CartPage = () => {
  const router = useRouter();
  const { cart, profile } = useContext(AppContext);

  const [phone, setPhone] = useState(profile?.phone || "");
  const [address, setAddress] = useState(profile?.address || "");
  const [postalCode, setPostalCode] = useState(profile?.postalCode || "");
  const [city, setCity] = useState(profile?.city || "");
  const [country, setCountry] = useState(profile?.country || "");

  useEffect(() => {
    setPhone(profile?.phone);
    setAddress(profile?.address);
    setPostalCode(profile?.postalCode);
    setCity(profile?.city);
    setCountry(profile?.country);
  }, [profile]);

  let subtotal = cart.reduce(
    (a, b) =>
      (a +=
        b.basePrice +
        (b?.size?.price || 0) +
        (b?.extraIngredient?.reduce((x, y) => (x += y.price), 0) || 0)),
    0
  );
  const delivery = 5;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <section className="mt-8">
        <SectionHeader heading={"Cart"} />
        <div>
          <p className="mt-4 text-center">Your shopping cart is empty 😔</p>
        </div>
      </section>
    );
  }

  async function proceedToCheckout(e) {
    e.preventDefault();

    const userAddress = { phone, postalCode, country, city, address };

    const orderInfo = {
      products: cart,
      total,
      subtotal,
      delivery,
      shippingInfo: userAddress,
    };

    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    router.push("/payment");
  }
  return (
    <section className="mt-8">
      <SectionHeader heading={"Cart"} />
      <div className="flex max-md:flex-col gap-4 mt-4 items-start box-border">
        <div className="flex-1 flex flex-col gap-2">
          {cart.map((item, i) => (
            <CartItem item={item} key={i} index={i} />
          ))}
          <div className="flex flex-col items-end mt-4">
            <div className="flex gap-2">
              <p className="text-textColor">SubTotal:</p>
              <p className="font-semibold ">${subtotal}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-textColor">Delivery:</p>
              <p className="font-semibold ">$5</p>
            </div>
            <div className="flex gap-2">
              <p className="text-textColor">Total:</p>
              <p className="font-semibold ">${total}</p>
            </div>
          </div>
        </div>
        <div className="w-[50%] max-md:w-full bg-gray-100 p-3 rounded-lg">
          <h2>Checkout</h2>
          <div className="flex flex-col gap-2">
            <AddressInputs
              addressProps={{ address, postalCode, city, country, phone }}
              setAddressProp={{
                setAddress,
                setPostalCode,
                setCity,
                setCountry,
                setPhone,
              }}
            />
            <button className="button" onClick={proceedToCheckout}>
              Pay ${total}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
