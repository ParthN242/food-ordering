"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppContext } from "../../Provider/AppContext";

const TabLink = ({ link, label }) => {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      key={link}
      className={`${
        pathname.includes(link)
          ? "bg-primary text-white"
          : "bg-gray-300 text-gray-800"
      } rounded-full py-2 px-4`}
    >
      {label}
    </Link>
  );
};

const UserTab = () => {
  const { profile } = useContext(AppContext);

  return (
    <div className="flex gap-4 max-md:gap-2 justify-center flex-wrap items-center">
      <TabLink link={"/profile"} label={"Profile"} />
      {profile?.admin && (
        <>
          <TabLink link={"/categories"} label={"Categories"} />
          <TabLink link={"/menu-items"} label={"Menu Items"} />
          <TabLink link={"/users"} label={"Users"} />
        </>
      )}
      <TabLink link={"/orders"} label={"Orders"} />
    </div>
  );
};

export default UserTab;
