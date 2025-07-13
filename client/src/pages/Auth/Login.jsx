import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosinstance.js";
import { API_PATHS } from "../../utils/apiPaths";
import { userContext } from "../../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(userContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }
    if (!password) {
      setError("Enter a password");
      return;
    }

    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. please try again");
      }
      toast.error(error.response?.data?.message || "Log in failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout>
      <br />
      <div className="bg-primary/10 border-l-4 border-blue-500 p-4 rounded shadow-md text-sm my-4 w-fit">
        <p className="font-semibold">Demo Credentials:</p>
        <p className="mt-2"><span className="font-medium">DemoUser</ span> → <code>demo.user@expensetracker.io</code>,&nbsp; <span className="font-medium">Pass: </span> <code>TrackDemo@321</code></p>
      </div>
     
      <div className="lg:w-[70%] pt-6 flex flex-col justify-center">
        <h3 className="text-xl font-semibold">Welcome</h3>
        <p className="text-gray-500 text-xs mb-6 mt-[5px]">
          Please login to your account to continue using the Expense Tracker
          application.
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="Enter you email"
            type="text"
          />

          <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password "
              placeholder="Minimum 8 characters"
              type="password"
          />
          {error && (
              <p className="text-red-500 text-xs pb-2.5"> {error} </p>
          )}
          <button type="submit" className="btn-primary">
              LOGIN
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                  Signup
              </Link>
          </p>
      </form>

      </div>
    </AuthLayout>
  );
}
