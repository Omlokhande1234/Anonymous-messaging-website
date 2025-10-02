"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OTPInput } from "@/components/ui/otp-input";
import { MessageCircle, Mail, CheckCircle, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

export default function VerifyAccount() {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const username = params.username as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showPasswordInput) {
      // First step: verify the code
      if (!code.trim()) {
        toast({
          title: "Missing Code",
          description: "Please enter the verification code",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await axios.post('/api/verifyCode', {
          username: username,
          code: code.trim(),
        });

        if (response.data.success) {
          toast({
            title: "Code Verified!",
            description: "Please enter your password to complete sign-in.",
          });
          setShowPasswordInput(true);
        }
      } catch (error: any) {
        toast({
          title: "Verification Failed",
          description: error.response?.data?.message || "Invalid verification code",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Second step: sign in with password
      if (!password.trim()) {
        toast({
          title: "Missing Password",
          description: "Please enter your password",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        const result = await signIn('credentials', {
          identifier: username,
          password: password.trim(),
          redirect: false,
        });

        if (result?.error) {
          toast({
            title: "Sign In Failed",
            description: "Invalid password. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome!",
            description: "Account verified and signed in successfully.",
          });
          router.replace('/dashboard');
        }
      } catch (error: any) {
        toast({
          title: "Sign In Failed",
          description: "An error occurred during sign in. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      // Resend is currently disabled.
      toast({
        title: "Resend Unavailable",
        description: "Resending codes is not available at the moment.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Back Arrow */}
        <div className="absolute top-0 left-0">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
        
        <div className="text-center mb-8 mt-12">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            {/* <Image src="/home/mystrymsgs.png" alt="MysteryMsg" width={28} height={28} /> */}
            <span className="text-2xl font-bold text-black">MysteryMsg</span>
          </Link>
          <div className="inline-block mb-4">
            <Mail className="h-12 w-12 text-black mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">
            {showPasswordInput ? "Complete Sign In" : "Verify Your Account"}
          </h1>
          <p className="text-gray-700">
            {showPasswordInput 
              ? "Enter your password to complete the sign-in process." 
              : "We\'ve sent a verification code to your email address."
            }
          </p>
          <p className="text-black font-semibold mt-2">Username: {username}</p>
        </div>

        <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!showPasswordInput ? (
              <div className="space-y-4">
                <Label className="text-black flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Verification Code</span>
                </Label>
                <div className="flex justify-center">
                  <OTPInput
                    length={6}
                    value={code}
                    onChange={setCode}
                    disabled={showPasswordInput}
                    className="gap-3"
                  />
                </div>
                <p className="text-center text-sm text-gray-600">
                  Enter the 6-digit code sent to your email
                </p>
              </div>
            ) : (
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg rounded-xl"
              >
                {isSubmitting 
                  ? (showPasswordInput ? "Signing In..." : "Verifying...") 
                  : (showPasswordInput ? "Sign In" : "Verify Code")
                }
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-4">Didn&apos;t receive the code?</p>
            <Button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              variant="outline"
              className="border-gray-300 text-black hover:bg-gray-100"
            >
              <Mail className="h-4 w-4 mr-2" />
              Resend Unavailable
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/auth/signin" className="text-black hover:text-gray-800 font-semibold">
              Back to Sign In
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="text-black font-semibold mb-2 flex items-center">
            <Mail className="h-4 w-4 mr-2 text-black" />
            Check Your Email
          </h3>
          <ul className="text-sm text-gray-700 space-y-1 text-left">
            <li>• Check your inbox for the verification email</li>
            <li>• Look in your spam/junk folder if you don&apos;t see it</li>
            <li>• The code expires in 10 minutes</li>
            <li>• Contact support if you continue having issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
