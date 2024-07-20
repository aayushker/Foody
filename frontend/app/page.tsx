import Image from "next/image";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import SignIn from "./components/ui/SignIn";
import SignUp from "./components/ui/SignUp";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <Contact />
      <SignIn />
      {/* <SignUp /> */}
    </main>
  );
}
