
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";

import DashBoardPage from "./pages/DashBoard/DashBoardPage";
import { ToastContainer } from "react-toastify";

import Footer from "./components/common/Footer";
import { AppContext } from "./context/AppContext";
import LoginModal from "./pages/AuthPages/LoginPage";
import Resource from "./pages/blogResources/Resource";
import Pricing from "./pages/Pricing/Pricing";
import { useContext } from "react";
import Navbar from "./components/common/Navbar";
import Assessment from "./pages/Assessment/Assessment";


function App() {
   const {showLogin} = useContext(AppContext);
  return (
    <div>  
        <ToastContainer position='bottom-right' />  
       <Navbar/>
        {  showLogin && <LoginModal/>}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/resources" element={<Resource />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<LoginModal />} />
        </Routes>
        <Footer/>
         </div>
  );
}

export default App;
