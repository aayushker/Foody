import React, { createContext, useState, useContext, ReactNode } from 'react';

// Create a context for authentication
const AuthContext = createContext({
  isLogged: false,
  signIn: () => {},
  signOut: () => {},
  signUp: (email: string, password: string) => {}, // Add signUp to the context
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const signIn = () => {
    setIsLogged(true);
  };

  const signOut = () => {
    setIsLogged(false);
  };

  const signUp = (email: string, password: string) => {
    // Implement sign-up logic here
    console.log(`Signing up with email: ${email} and password: ${password}`);
    setIsLogged(true);
  };

  return (
    <AuthContext.Provider value={{ isLogged, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);