import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

import { imageUpload } from "../utils";

const Register = () => {
  const { loading, createUser, updateUserProfile } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
  const { name, image, email, password, address } = data; 

  const imgaeFile = image[0];

  try {
    const imageUrl = await imageUpload(imgaeFile);
    const result = await createUser(email, password);
    await updateUserProfile(name, imageUrl);

    const userInfo = {
      name,
      email,
      address, 
      image: imageUrl,
      role: "user",
      status: "active",
      createdAt: new Date(),
    };

    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInfo)
    });

    toast.success("Welcome to Fudex 🍔");
    navigate(from, { replace: true });
  } catch (err) {
    toast.error(err?.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-orange-600">
            Fudex
          </h1>
          <p className="text-gray-500 mt-2">
            Create your food journey 🍕
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name cannot exceed 20 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-orange-50 file:text-orange-600
              hover:file:bg-orange-100"
              {...register("image")}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              placeholder="Dhaka, Bangladesh"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              {...register("address", {
                required: "Address is required",
              })}
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
