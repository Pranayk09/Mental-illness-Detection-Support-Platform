import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import userIcon from "../../assets/user_icon.webp";
import emailIcon from "../../assets/email_icon.svg";
import lockIcon from "../../assets/lock_icon.svg";
import crossIcon from "../../assets/cross_icon.svg";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const LoginModal = () => {
  const { setShowLogin, setUser, setToken, token, user, backendUrl, logIn } = useContext(AppContext);
  const [mode, setMode] = useState("Login"); // Login | SignUp | Verify
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const apiUserUrl = `${backendUrl}/api/user`;

  const handleClose = () => {
    setShowLogin(false);
    const storedToken = localStorage.getItem("token") || token;
    if (!storedToken && !user) {
      if (location.pathname === "/assessment" || location.pathname === "/dashboard") {
        navigate("/");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 🔹 LOGIN
      if (mode === "Login") {
        const { data } = await axios.post(
          `${apiUserUrl}/login`,
          { email, password },
          { withCredentials: true }
        );
        if (data.success) {
          logIn(data.userData, data.token);
          toast.success(data.message || "Logged in successfully!");
          setShowLogin(false);
        } else {
          toast.error(data.message || "Login failed");
        }
      }

      // 🔹 SIGNUP → SEND VERIFY OTP
      else if (mode === "SignUp") {
        const { data } = await axios.post(
          `${apiUserUrl}/register`,
          { name, email, password },
          { withCredentials: true }
        );

        if (data.success) {
          const userToken = data.token;
          logIn(data.userData, userToken);
          setUserId(data.userData._id);

          toast.success("Account created! Welcome to Nirvanic.");

          try {
            const otpRes = await axios.post(
              `${apiUserUrl}/send-verify-otp`,
              {},
              {
                withCredentials: true,
                headers: { token: userToken },
              }
            );

            if (otpRes.data.success) {
              toast.info("Verification OTP sent to your email.");
            }
          } catch (otpErr) {
            console.error("OTP send notice:", otpErr);
          }

          setMode("Verify");
        } else {
          toast.error(data.message || "Registration failed");
        }
      }

      // 🔹 VERIFY ACCOUNT
      else if (mode === "Verify") {
        const currentToken = localStorage.getItem("token") || token;
        const { data } = await axios.post(
          `${apiUserUrl}/verify-account`,
          { otp },
          {
            withCredentials: true,
            headers: { token: currentToken },
          }
        );

        if (data.success) {
          toast.success("Account verified successfully!");
          setShowLogin(false);
        } else {
          toast.error(data.message || "Invalid or expired OTP");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      const msg = error.response?.data?.message || error.message;
      if (msg === "Network Error") {
        toast.error("Network Error: Cannot connect to backend server at " + backendUrl);
      } else {
        toast.error(msg || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-8 sm:p-10 rounded-3xl shadow-2xl text-slate-600 w-full max-w-md border border-slate-100"
      >
        <h1 className="text-center text-2xl font-bold text-slate-800 mb-1">
          {mode === "Login" ? "Welcome Back" : mode === "SignUp" ? "Create Account" : "Verify Email"}
        </h1>
        <p className="text-sm text-center text-slate-500 mb-6">
          {mode === "Login"
            ? "Sign in to access your Mindscape recovery plan."
            : mode === "SignUp"
            ? "Join Nirvanic for personalized wellness insights."
            : "Enter the OTP sent to your email to verify account."}
        </p>

        {mode === "SignUp" && (
          <div className="border border-slate-200 px-5 py-3 flex items-center gap-3 rounded-2xl mb-4 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all bg-slate-50">
            <img src={userIcon} width={18} alt="User Icon" />
            <input
              type="text"
              placeholder="Full Name"
              className="outline-none text-sm w-full bg-transparent font-medium text-slate-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {mode !== "Verify" && (
          <>
            <div className="border border-slate-200 px-5 py-3 flex items-center gap-3 rounded-2xl mb-4 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all bg-slate-50">
              <img src={emailIcon} width={18} alt="Email Icon" />
              <input
                type="email"
                placeholder="Email Address"
                className="outline-none text-sm w-full bg-transparent font-medium text-slate-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="border border-slate-200 px-5 py-3 flex items-center gap-3 rounded-2xl mb-4 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all bg-slate-50">
              <img src={lockIcon} width={18} alt="Lock Icon" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none text-sm w-full bg-transparent font-medium text-slate-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {mode === "Verify" && (
          <div className="space-y-4 my-4">
            <div className="border border-slate-200 px-5 py-3 flex items-center gap-3 rounded-2xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all bg-slate-50">
              <input
                type="text"
                placeholder="Enter OTP"
                className="outline-none text-base font-semibold w-full text-center tracking-widest bg-transparent text-slate-800"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Continue to Assessment & Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white w-full py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/20 mb-4 transition-all transform active:scale-98 cursor-pointer disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : mode === "Login"
            ? "Sign In"
            : mode === "SignUp"
            ? "Create Account"
            : "Verify OTP"}
        </button>

        {mode === "Login" ? (
          <p className="text-center text-xs text-slate-500">
            Don’t have an account?{" "}
            <span
              className="text-emerald-600 font-bold cursor-pointer hover:underline"
              onClick={() => setMode("SignUp")}
            >
              Sign up
            </span>
          </p>
        ) : mode === "SignUp" ? (
          <p className="text-center text-xs text-slate-500">
            Already have an account?{" "}
            <span
              className="text-emerald-600 font-bold cursor-pointer hover:underline"
              onClick={() => setMode("Login")}
            >
              Log in
            </span>
          </p>
        ) : (
          <p className="text-center text-xs text-slate-500">
            Didn’t receive OTP?{" "}
            <span
              className="text-emerald-600 font-bold cursor-pointer hover:underline"
              onClick={async () => {
                try {
                  const currentToken = localStorage.getItem("token") || token;
                  const otpRes = await axios.post(
                    `${apiUserUrl}/send-verify-otp`,
                    {},
                    {
                      withCredentials: true,
                      headers: { token: currentToken },
                    }
                  );
                  if (otpRes.data.success) {
                    toast.success("OTP re-sent successfully!");
                  } else {
                    toast.error(otpRes.data.message || "Failed to resend OTP");
                  }
                } catch (error) {
                  toast.error("Failed to resend OTP");
                }
              }}
            >
              Resend OTP
            </span>
          </p>
        )}

        <img
          onClick={handleClose}
          src={crossIcon}
          alt="Close"
          className="absolute top-6 right-6 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        />
      </form>
    </div>
  );
};

export default LoginModal;
