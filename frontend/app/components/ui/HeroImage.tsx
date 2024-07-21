import React from "react";
import { Image } from "@nextui-org/react";

export default function App() {
  return (
    <Image
      width={1920}
      alt="Hero Image"
      src="/images/hero.jpg"
      className="z-0 h-screen object-cover overflow-hidden"
    />
  );
}
