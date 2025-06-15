import { createContext, useState, useCallback } from "react";
import api from "../utils/api";
import { useCookies } from 'react-cookie';
export const AuthContext = createContext({
  isLoggedIn: true,
  user:{},
  setUser:()=>{},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [cookies,setCookie] = useCookies(['UserKey']);
  const login = useCallback(async (state) => {
    try {
      if (state.query === "register") {
        let response = await api.post("/auth/register", state.data);
        if (response.status === 200) {
          setCookie('UserKey',String(response.data.userCookie));
          setUser(response.data.user);
          setIsLoggedIn(true);
          return true;
        }
      } else if (state.query === "login") {
        let response = await api.post("/auth/login", state.data);
        if (response.status === 200) {
          setCookie('UserKey',String(response.data.userCookie));
          setUser(response.data.user);
          setIsLoggedIn(true);
          return true;
        } 
      } else if (state.query === "verify"){
        try{
          if(!cookies.UserKey){
            return
          }
          const response = await api.post("/auth/verify",{
          token: cookies.UserKey
        });
        if(response.status == 200){
          setIsLoggedIn(true);
          setUser(response.data)
        }
      } catch(err){
        console.log(err.message)
      }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }, []);
  
  const logout = useCallback(() => setIsLoggedIn(false), []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
