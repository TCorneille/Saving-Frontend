import { Link } from "react-router-dom";
import Input from "../Components/Input";
import Button from "../Components/Button";

const Login = () => {
  return (
    <div className="flex justify-center min-h-dvh bg-primaryColor-50">
      <div className="min-sm:w-[450px] max-sm:w-full bg-white mt-20 mb-20 flex justify-center items-center rounded-lg shadow-md">
        <div className="flex flex-col gap-6 items-center justify-center w-full px-5 py-10">
          <span className="uppercase text-2xl font-semibold p-2 bg-primaryColor-800 text-white rounded-md">
            Saving APP
          </span>

          <form className="flex flex-col gap-3 w-full">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />

            <Button label="Log in" type="submit" className="w-full" />

            {/* Forgot Password */}
            <div className="text-right mt-2">
              <button
                // to="/forgot-password"
                className="text-sm text-primaryColor-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </form>

          {/* Register Link */}
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
