import { Routes, Route, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./context/AppContext";
import HomePage from "./pages/Home/HomePage";
import Footer from "./components/common/Footer";
import LoginModal from "./pages/AuthPages/LoginPage";
import Resource from "./pages/blogResources/Resource";
import Pricing from "./pages/Pricing/Pricing";
import Navbar from "./components/common/Navbar";
import Assessment from "./pages/Assessment/Assessment";
import DashboardPage from "./pages/DashBoard/DashBoardPage";

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Page transition container for calm, smooth navigation
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 w-full"
    >
      {children}
    </motion.div>
  );
};

function App() {
  const { showLogin, backendUrl, setUser, token } = useContext(AppContext);
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token") || token;
      if (!storedToken) {
        setIsAuth(false);
        return;
      }

      try {
        const res = await axios.post(
          `${backendUrl}/api/user/is-auth`,
          {},
          {
            withCredentials: true,
            headers: { token: storedToken },
          }
        );

        if (res.data.success) {
          setIsAuth(true);
          try {
            const profileRes = await axios.get(`${backendUrl}/api/dashboard/profile`, {
              withCredentials: true,
              headers: { token: storedToken },
            });
            if (profileRes.data.success) {
              setUser(profileRes.data.user);
            }
          } catch (e) {
            console.error("Profile fetch error:", e);
          }
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [backendUrl, token, setUser]);

  // Show loading while checking initial auth
  if (isAuth === null && localStorage.getItem("token")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700 text-lg font-semibold">
        Verifying Nirvanic session...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      <ToastContainer position="bottom-right" />
      <ScrollToTop />
      <Navbar />
      {showLogin && <LoginModal />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/assessment"
            element={
              <PageTransition>
                <Assessment />
              </PageTransition>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <DashboardPage />
              </PageTransition>
            }
          />
          <Route
            path="/resources"
            element={
              <PageTransition>
                <Resource />
              </PageTransition>
            }
          />
          <Route
            path="/pricing"
            element={
              <PageTransition>
                <Pricing />
              </PageTransition>
            }
          />
          <Route
            path="/login"
            element={
              <PageTransition>
                <LoginModal />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
