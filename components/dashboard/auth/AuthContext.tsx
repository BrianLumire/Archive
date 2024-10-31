"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { api } from "@/lib/api";
import { IUser } from "@/lib/types/data.types";

export interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authUser?: IUser | {} | null;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [authUser, setAuthUser] = useState<IUser | {} | null>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const clearAuth = () => {
    setUser(null);
    setAuthUser(null);
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/user");
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        setAuthUser(res.data);
      } else {
        clearAuth();
        router.push("/admin/auth/signin");
      }
    } catch (error) {
      clearAuth();
      router.push("/admin/auth/signin");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const tokenRes = await api.post("/auth/token/", { email, password });
      const { access, refresh } = tokenRes.data;
      Cookies.set("token", access);
      Cookies.set("refreshToken", refresh);
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      await fetchUser();
      router.push("/admin");
    } catch (error) {
      clearAuth();
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    clearAuth();
    router.push("/admin/auth/signin");
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get("token");
      const refreshToken = Cookies.get("refreshToken");
      const storedUser = localStorage.getItem("user");

      if (token && refreshToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          await fetchUser();
        }
      } else {
        clearAuth();
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        authUser,
        fetchUser,
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
