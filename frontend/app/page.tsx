import Image from "next/image";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
        <NavBar />
        <Hero />
        <Contact />
    </main>
  );
}