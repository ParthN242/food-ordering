"use client";
import Loading from "@/Components/Loading/Loading";
import UserTab from "@/Components/UserTab/UserTab";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      return redirect("/login");
    }
  }, [session.status]);

  useEffect(() => {
    axios
      .get("/api/order")
      .then(({ data }) => setOrders(data.orders.reverse()));
  }, []);

  return (
    <>
      {session.status === "loading" ? (
        <Loading />
      ) : (
        <section className="mt-8 max-w-2xl mx-auto">
          <UserTab />
          <div className="mt-8">
            {orders.length < 1 && <div>Loading orders...</div>}
            {orders?.length > 0 &&
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="grow flex flex-col md:flex-row items-center gap-6">
                    <div>
                      <div
                        className={
                          (order.paid ? "bg-green-500" : "bg-red-400") +
                          " p-2 rounded-md text-white w-24 text-center"
                        }
                      >
                        {order.paid ? "Paid" : "Not paid"}
                      </div>
                    </div>
                    <div className="grow">
                      <div className="flex gap-2 items-center mb-1">
                        <div className="grow">{order.userEmail}</div>
                        <div className="text-gray-500 text-sm"></div>
                      </div>
                      <div className="text-gray-500 text-xs">
                        {order.cartProducts.map((p) => p.name).join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                    <Link
                      href={"/orders/" + order._id}
                      className="bg-transparent border border-gray-300 py-2 px-4 rounded-lg font-bold "
                    >
                      Show order
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
};

export default OrdersPage;
