"use client";
import React, { useEffect, useState } from "react";
import UploadIamge from "../UploadImage/UploadIamge";
import AddressInputs from "./AddressInputs";

const UserForm = ({ profile, submitHandler }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setName(profile?.name);
    setEmail(profile?.email);
    setPhone(profile?.phone);
    setAddress(profile?.address);
    setPostalCode(profile?.postalCode);
    setCity(profile?.city);
    setCountry(profile?.country);
    setImage(profile?.image);
  }, [profile]);

  return (
    <div className="my-4 flex gap-4 max-w-4xl mx-auto max-md:flex-col">
      {/* image */}
      <UploadIamge link={image} setLink={setImage} path={"profile"} />
      {/* Form */}
      <form
        onSubmit={(e) => {
          submitHandler(e, {
            email,
            name,
            phone,
            address,
            postalCode,
            city,
            country,
            image,
          });
        }}
        className="flex-1 flex flex-col gap-2"
      >
        <div>
          <label htmlFor="name" className="label">
            First and last name
          </label>
          <input
            type="text"
            placeholder="First and last name"
            className="input"
            id="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="input disabled:bg-gray-300 disabled:text-gray-400"
            disabled
            value={email || ""}
          />
        </div>

        <AddressInputs
          addressProps={{ address, postalCode, city, country, phone }}
          setAddressProp={{
            setAddress,
            setPostalCode,
            setCity,
            setCountry,
            setPhone,
          }}
        />
        <div className="mt-2">
          <button className="button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
