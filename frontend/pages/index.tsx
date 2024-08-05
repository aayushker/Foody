"use client";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Contact from "@/app/components/Contact";
import { AuthProvider } from "@/app/AuthContext";
import { useState } from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/app/ThemeContext";

export default function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignInClose = () => {
    setIsSignInOpen(false);
  };

  return (
    <main className="w-full ">
      <AuthProvider>
        <ThemeProvider>
          <NavBar />
          <Hero />
          <Contact />
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </main>
  );
}
