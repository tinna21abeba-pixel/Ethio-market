
import React from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const existingUser =
    JSON.parse(localStorage.getItem("user")) || null;

  const login = (email, password) => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return false;
    }

    if (
      existingUser.email === email &&
      existingUser.password === password
    ) {
      setUser(existingUser);
      return true;
    }

    return false;
  };

  const register = (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
