import { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [subscription, setSubscription] = useState({ isPremium: false, plan: "Free", daysRemaining: 0 });
  const [loadingUser, setLoadingUser] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Centralized user profile & subscription fetcher
  const fetchUserData = useCallback(async (authToken) => {
    const activeToken = authToken || token || localStorage.getItem("token");
    if (!activeToken) {
      setUser(null);
      setSubscription({ isPremium: false, plan: "Free", daysRemaining: 0 });
      setLoadingUser(false);
      return;
    }

    setLoadingUser(true);
    try {
      // 1. Fetch User Profile
      const { data } = await axios.get(`${backendUrl}/api/dashboard/profile`, {
        headers: { token: activeToken },
        withCredentials: true,
      });

      if (data.success && data.user) {
        setUser(data.user);

        // 2. Fetch Subscription Status
        try {
          const subRes = await axios.get(`${backendUrl}/api/subscription/status`, {
            headers: { token: activeToken },
            withCredentials: true,
          });
          if (subRes.data && subRes.data.success) {
            setSubscription(subRes.data);
          } else {
            setSubscription({ isPremium: data.user.plan !== "Free", plan: data.user.plan || "Free", daysRemaining: 0 });
          }
        } catch (e) {
          setSubscription({ isPremium: data.user.plan !== "Free", plan: data.user.plan || "Free", daysRemaining: 0 });
        }
      } else {
        // Invalid session
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        setSubscription({ isPremium: false, plan: "Free", daysRemaining: 0 });
      }
    } catch (error) {
      console.error("Failed to fetch user in AppContext:", error);
      setUser(null);
      setSubscription({ isPremium: false, plan: "Free", daysRemaining: 0 });
    } finally {
      setLoadingUser(false);
    }
  }, [backendUrl, token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const logIn = (userData, userToken) => {
    if (userData) setUser(userData);
    if (userToken) {
      setToken(userToken);
      localStorage.setItem("token", userToken);
      fetchUserData(userToken);
    } else {
      setShowLogin(true);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    setSubscription({ isPremium: false, plan: "Free", daysRemaining: 0 });
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
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
        subscription,
        setSubscription,
        loadingUser,
        fetchUserData,
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
