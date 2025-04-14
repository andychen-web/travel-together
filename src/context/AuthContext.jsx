import React, { createContext, useContext, useState, useEffect } from "react";
import { apiValidateToken } from "@/api-client";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth 必須包在AuthProvider內");
  }

  return context;
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  // 在首次初始化時檢查 若打api過程jwt過期則在401錯誤時處理
  useEffect(() => {
    const validateToken = async () => {
      const res = await apiValidateToken();
      if(!res) return;
      res.userId ? setIsLoggedIn(true) : setIsLoggedIn(false);
    };
    // validateToken();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }; 