"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Create a context for authentication
const AuthContext = createContext({
  isLogged: false,
  signIn: () => {},
  signOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true);

  const signIn = () => {
    setIsLogged(true);
  };

  const signOut = () => {
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
