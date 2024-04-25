"use client";
import UserTab from "@/Components/UserTab/UserTab";
import React, { useContext } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loading from "@/Components/Loading/Loading";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { AppContext } from "@/Provider/AppContext";
import UserForm from "@/Components/UserForm/UserForm";

const ProfilePage = () => {
  const { profile } = useContext(AppContext);

  const session = useSession();

  const submitHandler = async (e, userData) => {
    e.preventDefault();

    // const userData = {
    //   email,
    //   name,
    //   phone,
    //   address,
    //   postalCode,
    //   city,
    //   country,
    //   image,
    // };

    const { data } = await axios.post("/api/profile", userData);

    if (data.success === true) toast.success("Profile Updated");
  };

  if (session.status === "loading") return <Loading />;

  if (session.status === "unauthenticated") return redirect("/login");
  return (
    <section className="mt-8">
      <UserTab />
      <UserForm profile={profile} submitHandler={submitHandler} />
    </section>
  );
};

export default ProfilePage;
