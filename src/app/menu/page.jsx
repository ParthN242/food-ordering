"use client";
import MenuItem from "@/Components/MenuItem/MenuItem";
import SectionHeader from "@/Components/SectionHeader";
import MenuItemModel from "@/models/MenuItems";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await axios.get("/api/category");

      setCategories(data.categories);
    };
    fetchCategory();
    const fetchMenuItems = async () => {
      const { data } = await axios.get("/api/menu-items");

      setMenuItems(data.items);
    };
    fetchMenuItems();
  }, []);
  return (
    <section className="mt-8">
      {categories.map((item) => (
        <div key={item._id}>
          <SectionHeader heading={item.name} className="mt-8" />
          <div
            key={item._id}
            className="flex mt-4 items-center justify-center gap-4 flex-wrap max-w-[90%] mx-auto"
          >
            {menuItems.map((i) => {
              if (item._id === i.category) {
                return <MenuItem key={i._id} item={i} />;
              }
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default MenuPage;
