import React, { useEffect, useState, FormEvent } from "react";
// import {assets} from ''
import axios from "axios";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [state, setState] = useState<"Login" | "Sign Up">("Login");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // ✅ Replace with your actual backend URL
  const backendUrl = "http://localhost:5000";

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post<{
          success: boolean;
          token?: string;
          user?: any;
          message?: string;
        }>(`${backendUrl}/api/user/login`, { email, password });

        if (data.success && data.token) {
          localStorage.setItem("token", data.token);
          toast.success("Login Successfully");
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        const { data } = await axios.post<{
          success: boolean;
          token?: string;
          user?: any;
          message?: string;
        }>(`${backendUrl}/api/user/register`, { name, email, password });

        if (data.success && data.token) {
          localStorage.setItem("token", data.token);
          toast.success("Registration Successful");
        } else {
          toast.error(data.message || "Registration failed");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            {/* <img src={assets.user_icon} width={20} className="opacity-65" alt="" /> */}
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          {/* <img src={assets.email_icon} alt="" /> */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none text-sm"
            type="email"
            placeholder="Email id"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          {/* <img src={assets.lock_icon} alt="" /> */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot password?
        </p>
        <button className="bg-blue-600 text-white w-full py-2 rounded-full">
          {state === "Login" ? "Log in" : "Create account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}

        <img
        //   src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
