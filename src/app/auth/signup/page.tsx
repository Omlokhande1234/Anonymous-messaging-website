"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, User, Lock, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAuthRedirect } from "@/Hooks/useAuthRedirect";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  // Redirect if already authenticated
  const { status } = useAuthRedirect();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  
  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/signup', data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/auth/verify/${data.username}`);
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    const usernameEl = document.getElementById('username') as HTMLInputElement | null;
    const emailEl = document.getElementById('email') as HTMLInputElement | null;
    const passwordEl = document.getElementById('password') as HTMLInputElement | null;
    if (usernameEl) usernameEl.value = 'demo';
    if (emailEl) emailEl.value = 'demo@gmail.com';
    if (passwordEl) passwordEl.value = 'demo@123';
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-4 lg:px-8 border-b">
        <Link href="/" className="flex items-center space-x-2">
          {/* <Image src="/home/mystrymsgs.png" alt="MysteryMsg" width={24} height={24} /> */}
          <span className="text-xl font-bold text-black">MysteryMsg</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">Home</Button>
          </Link>
          <Link href="/auth/signin">
            <Button className="bg-black hover:bg-gray-800 text-white">Sign In</Button>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8 mt-8">
            <h1 className="text-3xl font-bold text-black mb-2">Create Account</h1>
            <p className="text-gray-600">Join the mystery messaging revolution</p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 md:p-8 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-black flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Username</span>
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    {...register("username")}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-600 text-sm">{errors.username.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-black flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-black flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message as string}</p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg rounded-xl"
                >
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-black hover:text-gray-800 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-black font-semibold mb-2">Demo Account (Recruiters)</h3>
              <div className="grid grid-cols-1 gap-1 text-sm text-gray-700">
                <p>Username: <span className="font-mono text-black">demo</span></p>
                <p>Email: <span className="font-mono text-black">demo@gmail.com</span></p>
                <p>Password: <span className="font-mono text-black">demo@123</span></p>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-sm px-3 py-2 rounded-lg border border-gray-300 text-black hover:bg-gray-100"
                >
                  Fill Demo Credentials
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
