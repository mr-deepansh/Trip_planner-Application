import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext.js";
import api from "../api/axiosConfig";

// Re-export so consumers can import AuthContext from either file
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasFetched = useRef(false); // prevents StrictMode double-invoke

  useEffect(() => {
    // Guard: React StrictMode runs effects twice in dev — only fetch once
    if (hasFetched.current) return;
    hasFetched.current = true;

    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.data.user);
    return res;
  };

  const register = async (name, email, password) => {
    return await api.post("/auth/register", { name, email, password });
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Even if the server call fails, clear local state and redirect
    } finally {
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  const forgotPassword = async (email) => {
    return await api.post("/auth/forgot-password", { email });
  };

  const resetPassword = async (token, password) => {
    return await api.patch(`/auth/reset-password/${token}`, { password });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
