"use client";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import SignIn from "./components/ui/SignIn";
import SignUp from "./components/ui/SignUp";
import { AuthProvider } from "./AuthContext";
import { useState } from "react";

export default function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignInClose = () => {
    setIsSignInOpen(false);
  };

  return (
    <main>
      <AuthProvider>
        <NavBar />
        <Hero />
        <Contact />
        <SignIn isOpen={isSignInOpen} onClose={handleSignInClose} />
        {/* <SignUp /> */}
      </AuthProvider>
    </main>
  );
}