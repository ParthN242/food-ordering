"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import Loading from "@/Components/Loading/Loading";

const LoginPage = () => {
  const session = useSession();
  console.log("session: ", session);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    if (res.status === 200) {
      toast.success("Login Successful");
    }

    if (res.error) toast.error(res.error);
  };

  if (session.status === "loading") return <Loading />;

  if (session.status === "authenticated") return redirect("/");
  return (
    <section>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-center text-4xl text-primary font-medium my-5">
          Login
        </h1>
        <form className="flex flex-col gap-3" onSubmit={submitHandler}>
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
          <button className="button">Login</button>
          <p className="text-center text-textColor">or login with provider</p>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="border border-gray-500 rounded-xl w-full font-semibold text-gray-700 py-2 flex items-center justify-center gap-4"
          >
            <img src="/google.png" alt={"google"} width={24} height={24} />{" "}
            Login With Google
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
