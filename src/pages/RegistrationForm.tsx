import React, { useState } from "react";
import Input from "../Components/Input";
import { useCreateUserMutation } from "../app/api/Users";

interface RegistrationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    deviceId: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createUser, { isLoading }] = useCreateUserMutation();

  // ------------------- Handlers -------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.deviceId.trim()) newErrors.deviceId = "Device ID is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.passwordConfirm !== formData.password)
      newErrors.passwordConfirm = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      // Send request to API
      const response = await createUser({
        name: formData.name,
        email: formData.email,
        deviceId: formData.deviceId,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      }).unwrap();

      console.log("User created:", response);
      alert("Registration successful!");
      onSuccess();
    } catch (error: any) {
      console.error("Registration failed:", error);
      const apiError = error?.data?.message || "Failed to register user.";
      alert(apiError);
    }
  };

  // ------------------- UI -------------------
  return (
    <div className="flex flex-col items-center justify-start pt-10">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[500px]">
        <h1 className="text-2xl font-semibold mb-6 text-center text-primaryColor-500">
          User Registration
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            label="Device ID"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            placeholder="Enter your device ID"
            error={errors.deviceId}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="Re-enter your password"
            error={errors.passwordConfirm}
          />

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primaryColor-800 text-white rounded-lg hover:bg-primaryColor-700"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
