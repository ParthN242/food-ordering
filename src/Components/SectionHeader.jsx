import React from "react";

const SectionHeader = ({ text, heading, className }) => {
  return (
    <div className={className}>
      <p className="text-center font-semibold text-gray-600">{text}</p>
      <h1 className="text-center text-primary font-bold text-4xl italic">
        {heading}
      </h1>
    </div>
  );
};

export default SectionHeader;
