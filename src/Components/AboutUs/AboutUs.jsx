import React from "react";
import SectionHeader from "../SectionHeader";

const AboutUs = () => {
  return (
    <div className="flex flex-col gap-6" id="about">
      <SectionHeader text={"OUR STORY"} heading={"About us"} />
      <div className="flex flex-col gap-6 max-w-4xl mx-auto text-gray-500 text-center">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo quaerat
          modi, esse quas in dolorem molestias tenetur? Dolorem temporibus
          nesciunt soluta quae at ex laudantium, delectus exercitationem
          consequatur illo libero, aspernatur eveniet cumque fugiat assumenda
          odio? Eius distinctio a dolor cum! Vitae ipsum error iure nemo
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
          sapiente temporibus qui doloribus quidem nisi neque labore eveniet
          laborum, recusandae voluptas at ex. Incidunt voluptatem consequuntur,
          ad recusandae consectetur ipsam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio,
          incidunt saepe? Quasi error, praesentium voluptate soluta ullam
          asperiores explicabo autem!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
