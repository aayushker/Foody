import React from "react";
import NavBar from "@/app/components/ui/NavBar";
import Footer from "@/app/components/ui/Footer";
import Hero from "@/app/components/Landing/Hero";
import Contact from "@/app/components/Landing/Contact";

const Landing = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Contact />
      <Footer />
    </>
  );
};

export default Landing;
