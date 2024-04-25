"use client";
import MenuItemForm from "@/Components/MenuItemForm/MenuItemForm";
import UserTab from "@/Components/UserTab/UserTab";
import { AppContext } from "@/Provider/AppContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Loading from "@/Components/Loading/Loading";

const NewItemPage = () => {
  const { profile } = useContext(AppContext);
  const session = useSession();
  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    return redirect("/login");
  }

  if (!profile?.admin) {
    return redirect("/");
  }
  const submitHandler = async (itemData) => {
    // const itemData = {
    //   name,
    //   image,
    //   category,
    //   description,
    //   basePrice,
    //   sizes,
    //   extraIngridients,
    // };

    try {
      const { data } = await axios.post("/api/menu-items", itemData);

      if (data.success) toast.success(data.message);

      if (data.error) toast.error(error);
    } catch (error) {}
  };

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTab />
      <Link
        href={"/menu-items"}
        className="w-full my-8 flex items-center justify-center gap-1 py-2 border  border-gray-300 rounded-xl font-semibold text-gray-700 cursor-pointer"
      >
        <IoArrowBackCircleOutline className="text-xl" />
        <p>Show all menu item</p>
      </Link>

      <MenuItemForm meuItem={null} onSubmit={submitHandler} />
    </section>
  );
};

export default NewItemPage;
