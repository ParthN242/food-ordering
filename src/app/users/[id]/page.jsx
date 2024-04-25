"use client";
import Loading from "@/Components/Loading/Loading";
import UserForm from "@/Components/UserForm/UserForm";
import UserTab from "@/Components/UserTab/UserTab";
import { AppContext } from "@/Provider/AppContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserEditPage = () => {
  const { id } = useParams();

  const [userProfile, setUserProfile] = useState(null);

  const { profile } = useContext(AppContext);
  const session = useSession();

  useEffect(() => {
    axios.get(`/api/users/${id}`).then((d) => setUserProfile(d.data.user));
  }, []);

  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    return redirect("/login");
  }

  if (!profile?.admin) {
    return redirect("/");
  }

  const submitHandler = async (e, userData) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/users/${id}`, userData);

      if (data.success) toast.success();
    } catch (error) {}
  };

  return (
    <section className="mt-8">
      <UserTab />
      <div className="mt-6 max-w-2xl mx-auto">
        <UserForm profile={userProfile} submitHandler={submitHandler} />
      </div>
    </section>
  );
};

export default UserEditPage;
