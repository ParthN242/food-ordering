import React from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <div className="grid mt-10 grid-cols-2 max-md:grid-cols-1 mb-8">
      <div className="flex flex-col gap-6 justify-center">
        <h1 className="text-4xl font-semibold ">
          Everything <br /> is better <br /> with a{" "}
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="max-w-sm max-md:max-w-lg">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 items-center">
          <button className="bg-primary py-2 px-8 text-white text-sm font-semibold rounded-full flex items-center gap-2">
            ORDER NOW
            <IoArrowForwardCircleOutline className="text-xl" />
          </button>
          <button className="py-2 px-6 text-gray-600 text-sm font-semibold border border-gray-600 rounded-full flex items-center gap-2">
            Learn More
            <IoArrowForwardCircleOutline className="text-xl" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center max-md:hidden">
        <img src={"/pizza.png"} width={340} height={280} alt={"pizza"} />
      </div>
    </div>
  );
};

export default Hero;
