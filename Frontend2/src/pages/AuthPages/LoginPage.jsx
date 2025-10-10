import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import userIcon from "../../assets/user_icon.webp";
import emailIcon from "../../assets/email_icon.svg";
import lockIcon from "../../assets/lock_icon.svg";
import crossIcon from "../../assets/cross_icon.svg";

const backendUrl = "http://localhost:5000/api/user";

const LoginModal = () => {
  const { setShowLogin, setUser, setToken } = useContext(AppContext);
  const [mode, setMode] = useState("Login"); // Login | SignUp | Verify
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔹 LOGIN
      if (mode === "Login") {
        const { data } = await axios.post(
          `${backendUrl}/login`,
          { email, password },
          { withCredentials: true }
        );
        if (data.success) {
          setToken(data.token);
          setUser(data.userData);
          localStorage.setItem("token", data.token);
          toast.success(data.message);
          setShowLogin(false);
        } else toast.error(data.message);
      }

      // 🔹 SIGNUP → SEND VERIFY OTP
      else if (mode === "SignUp") {
        const { data } = await axios.post(
          `${backendUrl}/register`,
          { name, email, password },
          { withCredentials: true }
        );

        if (data.success) {
          toast.success("Account created! Sending OTP...");
          setUserId(data.userData._id);

          // call send-verify-otp
          const otpRes = await axios.post(
            `${backendUrl}/send-verify-otp`,
            {},
            { withCredentials: true, headers: { "user-id": data.userData._id } }
          );

          if (otpRes.data.success) {
            toast.success("OTP sent to your email");
            setMode("Verify");
          } else toast.error(otpRes.data.message);
        } else toast.error(data.message);
      }

      // 🔹 VERIFY ACCOUNT
      else if (mode === "Verify") {
        const { data } = await axios.post(
          `${backendUrl}/verify-account`,
          { otp },
          { withCredentials: true, headers: { "user-id": userId } }
        );

        if (data.success) {
          toast.success("Account verified successfully! Please log in.");
          setMode("Login");
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-1">
          {mode}
        </h1>
        <p className="text-sm text-center mb-5">
          {mode === "Login"
            ? "Welcome back! Please sign in."
            : mode === "SignUp"
            ? "Create your account."
            : "Enter the OTP sent to your email."}
        </p>

        {mode === "SignUp" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mb-4">
            <img src={userIcon} width={20} alt="User Icon" />
            <input
              type="text"
              placeholder="Full Name"
              className="outline-none text-sm w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {mode !== "Verify" && (
          <>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <img src={emailIcon} width={20} alt="Email Icon" />
              <input
                type="email"
                placeholder="Email"
                className="outline-none text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <img src={lockIcon} width={20} alt="Lock Icon" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none text-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {mode === "Verify" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="outline-none text-sm w-full text-center"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}

        {mode === "Login" && (
          <p className="text-sm text-blue-600 my-4 cursor-pointer text-right">
            Forgot password?
          </p>
        )}

        {/* ✅ Updated Theme Gradient */}
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-full py-2 rounded-full mb-3 transition-all hover:opacity-90">
          {mode === "Login"
            ? "Log in"
            : mode === "SignUp"
            ? "Create Account"
            : "Verify"}
        </button>

        {mode === "Login" ? (
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setMode("SignUp")}
            >
              Sign up
            </span>
          </p>
        ) : mode === "SignUp" ? (
          <p className="text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setMode("Login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-center text-sm">
            Didn’t receive OTP?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={async () => {
                try {
                  const otpRes = await axios.post(
                    `${backendUrl}/send-verify-otp`,
                    {},
                    { withCredentials: true, headers: { "user-id": userId } }
                  );
                  if (otpRes.data.success)
                    toast.success("OTP re-sent successfully!");
                  else toast.error(otpRes.data.message);
                } catch (error) {
                  toast.error("Failed to resend OTP");
                }
              }}
            >
              Resend
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={crossIcon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default LoginModal;
