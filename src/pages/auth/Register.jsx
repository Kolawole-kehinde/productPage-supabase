import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../Schema/schema";
import toast from "react-hot-toast";
import { signUpApi } from "../../services/auth";
import { UseAuth } from "../../hooks/useAuth";
import CustomInput from "../../Components/CustomInput";
import { registerInputs } from "../../constant/auth";
import { supabase } from "../../supabase/supabaseClient";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const { setUser } = UseAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    setLoading(true);
    try {
      const res = await signUpApi(payload);
      console.log(res);
      setUser(res);
      reset();
      toast.success("User registered successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error; 

      if (data) {
        setUser(data.user); 
        navigate("/dashboard");
        toast.success("Signed in with Google!");
      }
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
      console.error("Google sign-in error:", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {registerInputs?.map(({ name, type, label, className }) => (
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 mt-2 flex justify-center items-center space-x-2 disabled:opacity-50"
            disabled={googleLoading}>
            <FcGoogle size={24} />
            <span>{googleLoading ? "Signing in..." : "Continue with Google"}</span>
          </button>
        </form>

        <p className="pt-4 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
