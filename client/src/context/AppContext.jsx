import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  
  // ✅ use environment variable instead of hardcoded URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Auto-login placeholder (can be replaced with real backend validation)
  useEffect(() => {
    if (token) {
      // Optionally fetch user details from backend using token
      setUser({ name: "User" });
    }
  }, [token]);

  // ✅ Handle login persist
  const logIn = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        showLogin,
        setShowLogin,
        token,
        setToken,
        logIn,
        logOut,
        backendUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
