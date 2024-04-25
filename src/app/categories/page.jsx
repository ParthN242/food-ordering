"use client";
import { AppContext } from "@/Provider/AppContext";
import UserTab from "@/Components/UserTab/UserTab";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Loading from "@/Components/Loading/Loading";

const CategoriPage = () => {
  const { profile } = useContext(AppContext);
  const session = useSession();

  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [onUpdate, setOnUpdate] = useState(null);

  const categoryHandler = async () => {
    try {
      if (categoryName.length > 0) {
        const { data } = onUpdate
          ? await axios.put("/api/category", {
              id: onUpdate._id,
              name: categoryName,
              user: profile._id,
            })
          : await axios.post("/api/category", {
              name: categoryName,
              user: profile._id,
            });

        if (data.success) toast.success(data.message);
        fethCategories();

        setCategoryName("");
        setOnUpdate(null);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deletCategory = async (id) => {
    try {
      const { data } = await axios.delete("/api/category?id=" + id);

      if (data.success) toast.success("Category Deleted");

      if (!data.success) {
        console.log("error", data.error);
      }

      fethCategories();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fethCategories = () => {
    axios("/api/category")
      .then((data) => {
        setCategories(data.data.categories);
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    fethCategories();
  }, []);

  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    return redirect("/login");
  }

  if (!profile?.admin) {
    redirect("/");
  }

  return (
    <section className="mt-8">
      <UserTab />
      <div className="mt-4 max-w-2xl mx-auto ">
        {/* Input */}
        <div className="flex gap-3 items-center max-md:flex-col max-md:gap-1">
          <div className="flex-1">
            <label htmlFor="category" className="label">
              {onUpdate
                ? `Update category: ${onUpdate.name}`
                : "New category name"}
            </label>
            <input
              type="text"
              name="category"
              id="category"
              className="input"
              value={categoryName || ""}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 mt-6 max-md:mt-0">
            <button className="button px-6" onClick={categoryHandler}>
              {onUpdate ? "Update" : "Create"}
            </button>
            <button
              onClick={() => {
                setCategoryName("");
                setOnUpdate("");
              }}
              className="py-2 px-6 border border-gray-300 font-semibold rounded-xl text-black"
            >
              Cancel
            </button>
          </div>
        </div>
        {/* List */}
        <div className="mt-10">
          <label className="label">Existing categories</label>
          <div className="flex flex-col gap-2">
            {categories?.map((item) => (
              <div
                className="flex items-center justify-between bg-gray-100 py-2 px-4 rounded-xl"
                key={item._id}
              >
                <p>{item.name}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setOnUpdate(item);
                      setCategoryName(item.name);
                    }}
                    className="py-2 px-6 border border-gray-300 font-semibold rounded-xl text-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletCategory(item._id)}
                    className="py-2 px-6 border border-gray-300 font-semibold rounded-xl text-black"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriPage;
