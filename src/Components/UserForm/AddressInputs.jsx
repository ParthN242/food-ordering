import React from "react";

const AddressInputs = ({ addressProps, setAddressProp }) => {
  const { address, postalCode, city, country, phone } = addressProps;
  const { setAddress, setPostalCode, setCity, setCountry, setPhone } =
    setAddressProp;
  return (
    <>
      <div>
        <label htmlFor="phone" className="label">
          Phone
        </label>
        <input
          type="number"
          id="phone"
          placeholder="Phone"
          className="input"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address" className="label">
          Street address
        </label>
        <input
          type="text"
          id="address"
          placeholder="Street address"
          className="input"
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="postalCode" className="label">
            Postal code
          </label>
          <input
            type="number"
            id="postalCode"
            placeholder="Postal code"
            className="input"
            value={postalCode || ""}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city" className="label">
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="City"
            className="input"
            value={city || ""}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="country" className="label">
          Country
        </label>
        <input
          type="text"
          id="country"
          placeholder="Country"
          className="input"
          value={country || ""}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
    </>
  );
};

export default AddressInputs;
