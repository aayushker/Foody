"use client";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import { AuthProvider } from "./AuthContext";
import { useState } from "react";

export default function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignInClose = () => {
    setIsSignInOpen(false);
  };

  return (
    <main className="w-full ">
      <AuthProvider>
        <NavBar />
        <Hero />
        <Contact />
      </AuthProvider>
    </main>
  );
}