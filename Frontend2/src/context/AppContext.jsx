import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // User state (null = not logged in)
  const [user, setUser] = useState(null);

  // Controls login modal visibility
  const [showLogin, setShowLogin] = useState(false);

  // Login function
  const logIn = (username = "User") => {
    setUser({ name: username });
    setShowLogin(false);
  };

  // Logout function
  const logOut = () => {
    setUser(null);
    setShowLogin(true);
  };

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    logIn,
    logOut,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
