import React from "react";
import Image from "next/image";
import HeroImage from "./ui/HeroImage";

const Hero = () => {
  return (
    <div>
      <HeroImage />
      <div className="z-1 absolute inset-0 flex flex-col justify-center p-6 space-y-4 rounded-lg">
        <p className="text-white z-5 text-6xl font-bold drop-shadow-md bg-clip-text  animate-gradient">
          <strong className="text-9xl">Share</strong> and{" "}
          <strong className="text-8xl">Learn</strong>
        </p>
        <p className="text-white text-6xl font-bold drop-shadow-md bg-clip-text animate-gradient">
          New Recipes
        </p>
        <p className="text-white text-2xl font-medium drop-shadow-md">
          Discover the world's best recipes and share your own creations
        </p>
        <p className="text-white text-lg drop-shadow-md">
          Join our community and explore culinary delights from around the globe
        </p>
      </div>
    </div>
  );
};

export default Hero;
