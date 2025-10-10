import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const backendUrl = "http://localhost:5000";

  // Automatically keep user logged in if token exists
  useEffect(() => {
    if (token) {
      // Optionally call backend to fetch user from token
      setUser({ name: "User" }); // placeholder
    }
  }, [token]);

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, showLogin, setShowLogin, token, setToken, backendUrl, logOut }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
