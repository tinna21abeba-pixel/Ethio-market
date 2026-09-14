import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [usersList, setUsersList] = useState(() => {
    const savedUsers = localStorage.getItem("ethioUsers");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    // Default initial demo users
    return [
      {
        id: "seller_buna",
        name: "Buna House",
        email: "bunahouse@ethiomarket.com",
        password: "password123",
        role: "seller",
      },
      {
        id: "seller_habesha",
        name: "Habesha Fashion",
        email: "habesha@ethiomarket.com",
        password: "password123",
        role: "seller",
      },
      {
        id: "buyer_abebe",
        name: "Abebe Kebede",
        email: "abebe@gmail.com",
        password: "password123",
        role: "buyer",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("ethioUsers", JSON.stringify(usersList));
  }, [usersList]);

  const login = (email, password) => {
    // Check against usersList first
    const foundUser = usersList.find(
      (u) => u.email?.toLowerCase() === email?.trim().toLowerCase() && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }

    // Fallback check against single "user" stored in localStorage
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (
      savedUser &&
      savedUser.email?.toLowerCase() === email?.trim().toLowerCase() &&
      savedUser.password === password
    ) {
      setUser(savedUser);
      return true;
    }

    return false;
  };

  const register = (userData) => {
    const userId = userData.id || `usr_${Date.now()}`;
    const fullUser = {
      ...userData,
      id: userId,
    };

    setUsersList((prev) => {
      const filtered = prev.filter((u) => u.email?.toLowerCase() !== fullUser.email?.toLowerCase());
      return [...filtered, fullUser];
    });

    localStorage.setItem("user", JSON.stringify(fullUser));
    setUser(fullUser);
    return fullUser;
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
        logout: logOut,
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
