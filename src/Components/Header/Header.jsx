"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { AppContext } from "@/Provider/AppContext";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

const AuthLinks = ({ status, username }) => {
  return (
    <>
      {status === "authenticated" ? (
        <>
          <Link href={"/profile"} className=" ">
            Hello,{username}
          </Link>
          <button
            className="bg-primary rounded-full py-2 px-8  text-white"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </>
      ) : status === "unauthenticated" ? (
        <>
          <Link href={"/login"} className=" ">
            Login
          </Link>
          <Link href={"/register"}>
            <button className="bg-primary w-full rounded-full py-2 px-8  text-white">
              Register
            </button>
          </Link>
        </>
      ) : (
        ""
      )}
    </>
  );
};

const Header = () => {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { cart } = useContext(AppContext);

  return (
    <header className="w-full border-b border-gray-300 pb-3">
      {/* Mobile Header */}

      <div className="hidden max-md:flex items-center justify-between max-lg:text-[15px]">
        <Link href={"/"}>
          <h1 className="text-primary text-2xl font-bold whitespace-nowrap">
            ST PIZZA
          </h1>
        </Link>
        <div className="flex items-center gap-5">
          <Link href={"/cart"} className="relative">
            <MdOutlineShoppingCart className="text-gray-500 text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-xs w-4 h-4 text-center">
                {cart.length}
              </span>
            )}
          </Link>
          <div
            className="border border-gray-300 rounded-lg p-1"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <HiOutlineBars3BottomLeft className="text-xl" />
          </div>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden bg-gray-200 p-2 rounded-lg flex flex-col text-[16px] text-center gap-2 my-2"
        >
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <AuthLinks
            status={status}
            username={userData?.name || userData?.email.split("@")[0]}
            className="items-stretch"
          />
        </div>
      )}

      {/* Desktop Header */}
      <div className="max-md:hidden flex items-center justify-between max-lg:text-[15px]">
        <div className="flex items-center text-gray-500 gap-10 font-semibold max-lg:gap-5 ">
          <Link href={"/"}>
            <h1 className="text-primary text-2xl font-semibold whitespace-nowrap">
              ST PIZZA
            </h1>
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-4 items-center text-textColor font-semibold">
            <AuthLinks
              status={status}
              username={userData?.name || userData?.email.split("@")[0]}
            />
          </div>
          <Link href={"/cart"} className="relative">
            <MdOutlineShoppingCart className="text-gray-500 text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-xs w-4 h-4 text-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
