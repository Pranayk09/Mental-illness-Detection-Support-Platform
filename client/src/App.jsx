
import {  Routes, Route,Navigate  } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { ToastContainer } from "react-toastify";
import Footer from "./components/common/Footer";
import { AppContext } from "./context/AppContext";
import LoginModal from "./pages/AuthPages/LoginPage";
import Resource from "./pages/blogResources/Resource";
import Pricing from "./pages/Pricing/Pricing";
import { useContext } from "react";
import Navbar from "./components/common/Navbar";
import Assessment from "./pages/Assessment/Assessment";
import DashboardPage from "./pages/DashBoard/DashBoardPage";
import { useState } from "react";
import { useEffect } from "react";


function App() {
 
     const { showLogin } = useContext(AppContext);
  const [isAuth, setIsAuth] = useState(null);

  // ✅ Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user/is-auth",
          {},
          { withCredentials: true }
        );
        if (res.data.success) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  // ✅ Show loading while checking
  if (isAuth === null) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return (
    <div>  
        <ToastContainer position='bottom-right' />  
       <Navbar/>
        {  showLogin && <LoginModal/>}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route   path="/dashboard"
          element={
          <DashboardPage/>
          } />
          <Route path="/resources" element={<Resource />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<LoginModal />} />
        </Routes>
        <Footer/>
         </div>
  );
}

export default App;
