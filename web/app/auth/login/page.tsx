"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, Github } from "lucide-react";
import axios from "axios";
import { loginRoute } from "@/apis/api";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import handleGoogleLogin from "@/utils/utils";
import LeftPanel from "@/components/AuthComponents/LeftPanel";
import { toast } from "@/hooks/use-toast";

interface AuthStates {
  token: string | null;
  loading: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState("");

  const [authStates, setAuthStates] = useState<AuthStates>({
    token: null,
    loading: true,
  });

  useEffect(() => {
    const token: string | null = sessionStorage.getItem("token");
    setAuthStates({ ...authStates, token, loading: false });
    if (authStates.token && !authStates.loading) {
      router.push("/dashboard");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length > 7) strength++;
    if (pass.match(/[a-z]+/)) strength++;
    if (pass.match(/[A-Z]+/)) strength++;
    if (pass.match(/[0-9]+/)) strength++;
    if (pass.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");
    const response = await axios.post(
      loginRoute,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setEmail("");
    setPassword("");

    if (response.status == 200) {
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      toast({
        title: response.data.msg,
        description: "There was a problem with your request.",
      });
      console.log(response.data.msg);
    }
  };

  const socialLoginOptions = [
    {
      icon: Github,
      label: "Continue with GitHub",
      color: "text-black",
      onClick: () => console.log("GitHub Login"),
    },
  ];

  if (authStates.loading) {
    return <div>..Loading</div>;
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Background Image for Mobile - Absolute Positioned */}
      <div className="absolute inset-0 z-0 block md:hidden">
        <Image
          src="https://imgs.search.brave.com/LIi1vUzQmDCaEhb7juR4p6vDEtk75q0bF_L0XWvvrFI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/Ny8yMC8wMC8yNS93/aW5uaW5nLTE1Mjk0/MDJfNjQwLmpwZw"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>

      {/* Desktop Left Section - Inspirational Quote */}
      <LeftPanel
        src="https://imgs.search.brave.com/LIi1vUzQmDCaEhb7juR4p6vDEtk75q0bF_L0XWvvrFI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/Ny8yMC8wMC8yNS93/aW5uaW5nLTE1Mjk0/MDJfNjQwLmpwZw"
        quote="The journey of a thousand miles begins with a single
            step."
        shortLine="Let every login be the start of something extraordinary."
      />

      {/* Right Section - Login Form */}
      <div className="relative z-10 flex w-full md:w-3/5 lg:w-[60%] items-center justify-center bg-white/90 md:bg-white p-6 lg:p-10">
        <div className="w-full max-w-lg space-y-6 border border-gray-200 p-8 md:shadow-lg rounded-xl">
          <div className="text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600">
              Login to continue your journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address 
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="pl-10 w-full"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pl-10 pr-12 w-full"
                  required
                />
                <button
                  type="button" // This should be correct
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    passwordStrength === 0
                      ? "bg-red-500 w-[20%]"
                      : passwordStrength === 1
                        ? "bg-orange-500 w-[40%]"
                        : passwordStrength === 2
                          ? "bg-yellow-500 w-[60%]"
                          : passwordStrength === 3
                            ? "bg-lime-500 w-[80%]"
                            : "bg-green-500 w-full"
                  } transition-all duration-300`}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={() => setRememberMe(!rememberMe)}
                />
                <Label
                  htmlFor="remember"
                  className="text-gray-700 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-black hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            {socialLoginOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={option.onClick}
              >
                <option.icon className={`${option.color}`} size={20} />
                <span>{option.label}</span>
              </Button>
            ))}
            <div className="flex flex-col items-center justify-center">
              <GoogleLogin
                logo_alignment="center"
                theme="filled_black"
                onSuccess={async (credentialResponse) => {
                  const login = await handleGoogleLogin(credentialResponse);
                  if (login) {
                    toast({
                      title: "Login Successfull!",
                    });
                    router.push("/dashboard");
                  } else {
                    toast({
                      title: "Uh oh! Something went wrong.",
                      description: "There was a problem with your request.",
                    });
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-black font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
