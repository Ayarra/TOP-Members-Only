import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const checkSessionValidity = async () => {
    try {
      const response = await axios.get("/auth/check-session", {
        withCredentials: true,
      });
      console.log(response.data);
      const isAuthenticated = response.data.isAuthenticated;
      const user = response.data.user;

      if (isAuthenticated) {
        setAuth({ isAuthenticated, user });

        localStorage.setItem("auth", JSON.stringify({ isAuthenticated, user }));
      } else {
        setAuth({ isAuthenticated: false, user: null });
        localStorage.clear();
        if (window.location.href !== window.location.origin + "/") {
          window.location.href = "/"; // Redirect to the home page
        }
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  useEffect(() => {
    checkSessionValidity();

    const checkSessionInterval = setInterval(checkSessionValidity, 60000);

    return () => {
      clearInterval(checkSessionInterval);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
