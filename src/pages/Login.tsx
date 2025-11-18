import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useLoginUserMutation } from "../app/api/Users";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  // ----------------------------
  // FIXED: Strongly typed input event
  // ----------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ----------------------------
  // FIXED: Strongly typed form event
  // ----------------------------
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await loginUser(formData).unwrap();
      console.log("✅ Login successful:", response);

      const role =
        response?.user?.role ||
        response?.data?.user?.role ||
        response?.role ||
        "client";

      const token =
        response?.token ||
        response?.accessToken ||
        response?.data?.token;

      const user =
        response?.user ||
        response?.data?.user ||
        response?.data;

      if (token) localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      if (role.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
    }
  };

  // ----------------------------
  // TYPE GUARD (Fixes TS2339)
  // ----------------------------
  const getErrorMessage = () => {
    if (!error) return null;

    // If error is FetchBaseQueryError and contains data
    if (
      typeof error === "object" &&
      "data" in error
    ) {
      const baseError = error as FetchBaseQueryError & {
        data?: { message?: string };
      };

      return baseError.data?.message || "Invalid email or password";
    }

    // Fallback for SerializedError
    return "Something went wrong. Please try again.";
  };

  return (
    <div className="flex justify-center min-h-dvh bg-primaryColor-50">
      <div className="min-sm:w-[450px] max-sm:w-full bg-white mt-20 mb-20 flex justify-center items-center rounded-lg shadow-md">
        <div className="flex flex-col gap-6 items-center justify-center w-full px-5 py-10">
          <span className="uppercase text-2xl font-semibold p-2 bg-primaryColor-800 text-white rounded-md">
            Saving APP
          </span>

          {/* --- Login Form --- */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              label={isLoading ? "Logging in..." : "Log in"}
              type="submit"
              className="w-full"
              disabled={isLoading}
            />

            {isError && (
              <p className="text-red-600 text-sm mt-2">{getErrorMessage()}</p>
            )}
          </form>

          {/* --- Forgot Password --- */}
          <div className="text-right mt-2 w-full">
            <button
              type="button"
              className="text-sm text-primaryColor-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* --- Register Link --- */}
          <div className="text-sm text-gray-600 mt-3">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primaryColor-700 font-medium hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
