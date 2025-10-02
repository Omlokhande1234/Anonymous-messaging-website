"use client"

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignOut() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to home
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignOut = async () => {
    try {
      console.log('[SIGNOUT] Starting sign out process...');
      
      await signOut({
        callbackUrl: "/", // Redirect to home page after sign out
        redirect: true
      });
      
      console.log('[SIGNOUT] Sign out completed successfully');
    } catch (error) {
      console.error('[SIGNOUT] Error during sign out:', error);
    }
  };

  const handleCancel = () => {
    router.back(); // Go back to previous page
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 lg:px-8 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-black">MysteryMsg</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-md w-full mx-auto px-6">
          <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200 text-center">
            <div className="mb-6">
              <LogOut className="h-16 w-16 text-black mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-black mb-2">Sign Out</h1>
              <p className="text-gray-700">
                Are you sure you want to sign out of your account?
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Signed in as:</p>
                <p className="font-semibold text-black">{session?.user?.username}</p>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>

              <div className="flex flex-col space-y-3">
                <Button
                  onClick={handleSignOut}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg rounded-xl"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Yes, Sign Me Out
                </Button>
                
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="w-full border-gray-300 text-black hover:bg-gray-100 py-3 text-lg rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                You&apos;ll be redirected to the home page after signing out
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}