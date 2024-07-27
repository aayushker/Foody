import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (username: string, password: string, email: string, firstName: string, lastName: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUser: (user: any) => { },
  login: (username: string, password: string) => { },
  logout: () => { },
  register: (username: string, password: string, email: string, firstName: string, lastName: string) => { }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
        } else {
          setUser(decodedToken);
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
        console.error(error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
      const { access, refresh } = response.data;
      localStorage.setItem('token', access);
      setUser(jwtDecode(access));
      router.push('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const register = async (username: string, password: string, email: string, firstName: string, lastName: string) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', { username, password, email, first_name: firstName, last_name: lastName });
      router.push('/');
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
