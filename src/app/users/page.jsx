"use client";
import Loading from "@/Components/Loading/Loading";
import UserTab from "@/Components/UserTab/UserTab";
import { AppContext } from "@/Provider/AppContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    axios.get("/api/users").then((d) => setUsers(d.data.users));
  }, []);
  return (
    <section className="mt-8">
      <UserTab />
      <div className="mt-6 max-w-2xl mx-auto">
        <div className="flex flex-col gap-2">
          {users.length > 0 &&
            users.map((item) => (
              <div
                className="bg-gray-100 grid grid-cols-3 items-center justify-between p-2 rounded-xl"
                key={item._id}
              >
                <p>{item.name ? item.name : "No name"}</p>
                <p className="text-gray-500">{item.email}</p>
                <Link
                  href={`/users/${item._id}`}
                  className="font-semibold border border-gray-300 px-6 py-2 rounded-xl justify-self-end"
                >
                  Edit
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default UsersPage;
