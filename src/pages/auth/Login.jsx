import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form"; 
import { Link, Navigate, useNavigate } from "react-router";
import { loginSchema } from "../../Schema/schema";
import toast from "react-hot-toast";
import { UseAuth } from "../../hooks/useAuth";
import { SignInApi } from "../../services/auth";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const {setUser} = UseAuth();
  const initialState = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
     try {
       const res = await SignInApi(data);
       setUser(res);
       reset();
       toast.success("User Login Successfully");
       return Navigate("/dashboard");
     } catch (error) {
       toast.error(error?.message)
       }
       finally{
        setLoading(false)
       }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register("password")}
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className={`w-full py-2 rounded-lg text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="pt-4 text-center">Don't have an account? <Link className="text-blue-500" to="/auth/register">Register</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
