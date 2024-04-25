"use client";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const session = useSession();

  const [profile, setProfile] = useState(null);
  const [cart, setCart] = useState([]);
  // console.log("cart: ", cart);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCart(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addToCart(item) {
    setCart((prev) => [...prev, item]);
  }

  function removeCartItem(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCart([]);
  }

  useEffect(() => {
    if (cart.length > 0) saveCartIntoStorage(cart);
  }, [cart]);

  function saveCartIntoStorage(items) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(items));
    }
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      async function fetchData() {
        const { data } = await axios.get("/api/profile");
        setProfile(data.user);
      }
      fetchData();
    }
  }, [session.status]);
  return (
    <SessionProvider>
      <AppContext.Provider
        value={{
          cart,
          profile,
          setProfile,
          addToCart,
          removeCartItem,
          clearCart,
        }}
      >
        {children}
      </AppContext.Provider>
    </SessionProvider>
  );
}
