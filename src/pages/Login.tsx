import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useLoginUserMutation } from "../app/api/Users";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Call login mutation
      const response = await loginUser(formData).unwrap();

      console.log("✅ Login successful:", response);

      // --- Extract role safely ---
      // Covers various API shapes (e.g., response.user.role OR response.data.user.role OR response.role)
      const role =
        response?.user?.role ||
        response?.data?.user?.role ||
        response?.role ||
        "client"; // default if not found

      console.log("🎭 Detected role:", role);

      // --- Store token and user info ---
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

      // --- Redirect by role ---
      if (role.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }

    } catch (err) {
      console.error("❌ Login failed:", err);
    }
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
              <p className="text-red-600 text-sm mt-2">
                {error?.data?.message || "Invalid email or password"}
              </p>
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
