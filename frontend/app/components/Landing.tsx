import React from "react";
import NavBar from "@/app/components/ui/NavBar";
import Footer from "@/app/components/ui/Footer";
import Hero from "@/app/components/Landing/Hero";
import Contact from "@/app/components/Landing/Contact";
import FAQs from "@/app/components/Landing/FAQs";
import Heading from "./ui/Heading";

const Landing = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Heading section="FAQs" />
      <FAQs />
      <Heading section="Contact"/>
      <Contact />
      <Footer />
    </>
  );
};

export default Landing;
