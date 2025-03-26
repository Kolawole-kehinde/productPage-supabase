import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form"; 
import { Link, Navigate, } from "react-router";
import { loginSchema } from "../../Schema/schema";
import toast from "react-hot-toast";
import { UseAuth } from "../../hooks/useAuth";
import { SignInApi } from "../../services/auth";
import CustomInput from "../../Components/CustomInput";
import { loginInputs } from "../../constant/auth";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = UseAuth();
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
    resolver: zodResolver(loginSchema, initialState),
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
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {loginInputs.map(({ name, type, label, className }) => (
            <CustomInput
              key={name}
              name={name}
              type={type}
              label={label}
              className={className}
              register={register}
              error={errors[name]}
            />
          ))}
          
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
        <p className="pt-4 text-center">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
