import { createContext, useState, useCallback } from "react";
import api from "../utils/api";

export const AuthContext = createContext({
  isLoggedIn: true,
  user:{},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const login = useCallback(async (state) => {
    try {
      if (state.query === "register") {
        let response = await api.post("/auth/register", state.data);
        if (response.status === 200) {
          setUser(state.data);
          setIsLoggedIn(true);
          return true;
        }
      } else if (state.query === "login") {
        let response = await api.post("/auth/login", state.data);
        if (response.status === 200) {
          setUser(state.data);
          setIsLoggedIn(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }, []);
  
  const logout = useCallback(() => setIsLoggedIn(false), []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
