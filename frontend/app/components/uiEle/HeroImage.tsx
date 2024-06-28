import React from "react";
import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src={"/images/hero.jpg"}
        alt="hero"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default HeroImage;
