"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginAdmin, fetchAdminMe } from "@/services/adminApi";

interface AdminUser {
  id: number;
  email: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper to set cookie for Next.js middleware
  const setCookieToken = (jwtToken: string | null) => {
    if (jwtToken) {
      document.cookie = `admin_token=${jwtToken}; path=/; max-age=86400; SameSite=Lax`;
    } else {
      document.cookie = "admin_token=; path=/; max-age=0;";
    }
  };

  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem("admin_token");
      if (storedToken) {
        setToken(storedToken);
        setCookieToken(storedToken);
        try {
          const userData = await fetchAdminMe(storedToken);
          setUser(userData);
        } catch (err) {
          console.error("Token verification failed:", err);
          logout();
        }
      }
      setLoading(false);
    }
    initAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await loginAdmin(email, pass);
    const jwtToken = res.access_token;
    localStorage.setItem("admin_token", jwtToken);
    setToken(jwtToken);
    setCookieToken(jwtToken);

    const userData = await fetchAdminMe(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setUser(null);
    setCookieToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
