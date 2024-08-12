"use client";
import { AuthProvider } from "@/app/AuthContext";
import { ThemeProvider } from "@/app/ThemeContext";
import Landing from "@/app/components/Landing";
import "@/app/globals.css";

export default function Home() {
  return (
    <main className="w-full ">
      <AuthProvider>
        <ThemeProvider>
          <Landing />
        </ThemeProvider>
      </AuthProvider>
    </main>
  );
}
