"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/Components/Loading/Loading";

const RegisterPage = () => {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const subminHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/register", { email, password });

      if (!data.success) return toast.error(data.error);

      toast.success("Register successfully");
      redirect("/login");
    } catch (error) {
      toast.error(data.error);
    }
  };

  if (session.status === "loading") return <Loading />;

  if (session.status === "authenticated") return redirect("/");
  return (
    <section>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-center text-4xl text-primary font-medium my-5">
          Register
        </h1>
        <form className="flex flex-col gap-3" onSubmit={subminHandler}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button">Register</button>
          <p className="text-center text-textColor">or login with provider</p>
          <button className="border border-gray-500 rounded-xl w-full font-semibold text-gray-700 py-2 flex items-center justify-center gap-4">
            <img src="/google.png" alt={""} width={24} height={24} /> Login With
            Google
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
