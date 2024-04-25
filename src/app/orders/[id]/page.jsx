"use client";
import CartItem from "@/Components/CartItem/CartItem";
import Loading from "@/Components/Loading/Loading";
import SectionHeader from "@/Components/SectionHeader";
import AddressInputs from "@/Components/UserForm/AddressInputs";
import { AppContext, cartProductPrice } from "@/Provider/AppContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const OrderPage = () => {
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoadingOrder(true);
      axios.get(`/api/order/${id}`).then(({ data }) => {
        setOrder(data.order);
        setLoadingOrder(false);
      });
    }
  }, [id]);

  const session = useSession();
  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    return redirect("/login");
  }

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }
  return (
    <section className="max-w-4xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeader heading="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartItem key={product._id} item={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs
                disabled={true}
                addressProps={order}
                setAddressProp={{}}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
