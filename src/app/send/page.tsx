"use client"

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Sparkles, User, MessageSquare, Wand2, RefreshCw, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import MarkdownRenderer from "@/markdown/MarkdownRenderer";

function SendMessageInner() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [suggestionPrompt, setSuggestionPrompt] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const toParam = searchParams.get('to');
    if (toParam) {
      setUsername(toParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both username and message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/send-message', {
        username: username.trim(),
        content: message.trim(),
      });

      toast({
        title: "Message Sent!",
        description: "Your anonymous message has been delivered successfully.",
      });

      setUsername("");
      setMessage("");
    } catch (error: any) {
      toast({
        title: "Failed to Send",
        description: error.response?.data?.message || "An error occurred while sending the message",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAISuggestion = async () => {
    if (!suggestionPrompt.trim()) {
      toast({
        title: "Enter a prompt",
        description: "Please enter a topic or theme for AI suggestions",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post('/api/suggest-messages', {
        prompt: `Generate 3 thoughtful, engaging anonymous messages based on this theme: "${suggestionPrompt}". Make them friendly, respectful, and suitable for anonymous messaging. Format them as a numbered list.`
      });

      setAiSuggestion(response.data.text);
    } catch (error: any) {
      toast({
        title: "AI Generation Failed",
        description: "Unable to generate suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="flex justify-between items-center p-4 lg:px-8 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/home/mystrymsgs.png" alt="MysteryMsg" width={24} height={24} />
          <span className="text-xl font-bold text-black">MysteryMsg</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          {status === "authenticated" ? (
            // Show user info and dashboard link when logged in
            <>
              <span className="text-black">Hello, {session?.user?.username}</span>
              <Link href="/dashboard">
                <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => router.push('/signout')}
                variant="outline"
                className="border-gray-300 text-black hover:bg-gray-100"
              >
                Sign Out
              </Button>
            </>
          ) : (
            // Show sign in/up buttons when not logged in
            <>
              <Link href="/signin">
                <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-black hover:bg-gray-800 text-white px-6">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="md:hidden p-2 rounded-lg border border-gray-200 text-black"
        >
          {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileNavOpen && (
        <div className="md:hidden border-b px-4 pb-4 space-y-2">
          {status === "authenticated" ? (
            <>
              <span className="block text-black">Hello, {session?.user?.username}</span>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full justify-center border-gray-300 text-black hover:bg-gray-100">
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => router.push('/signout')}
                variant="outline"
                className="w-full justify-center border-gray-300 text-black hover:bg-gray-100"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="outline" className="w-full justify-center border-gray-300 text-black hover:bg-gray-100">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full justify-center bg-black hover:bg-gray-800 text-white px-6">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-block mb-6">
              <Send className="h-16 w-16 text-black mx-auto" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Send Anonymous Message</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Share your thoughts, feelings, or feedback completely anonymously. Your identity will never be revealed.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="h-6 w-6 text-black" />
                <h2 className="text-2xl font-bold text-black">Compose Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-black flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Recipient Username</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter the username to send message to"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-black flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Your Message</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Write your anonymous message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black resize-none"
                  />
                  <p className="text-sm text-gray-600">
                    {message.length}/500 characters
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg rounded-xl"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Anonymous Message"}
                </Button>
              </form>
            </div>

            {/* AI Suggestions */}
            <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center space-x-2 mb-6">
                <Wand2 className="h-6 w-6 text-black" />
                <h2 className="text-2xl font-bold text-black">AI Message Ideas</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-black flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>What kind of message do you want to send?</span>
                  </Label>
                  <Input
                    id="prompt"
                    type="text"
                    placeholder="e.g., encouraging, funny, thoughtful, compliment..."
                    value={suggestionPrompt}
                    onChange={(e) => setSuggestionPrompt(e.target.value)}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black"
                  />
                </div>

                <Button
                  type="button"
                  onClick={generateAISuggestion}
                  disabled={isGenerating}
                  className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-xl"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate Ideas"}
                </Button>

                {aiSuggestion && (
                  <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                    <h3 className="text-black font-semibold mb-3 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-black" />
                      AI Suggestions
                    </h3>
                    <div className="text-gray-700 text-sm text-left">
                      <MarkdownRenderer content={aiSuggestion} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SendMessage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-black flex items-center justify-center">Loading...</div>}>
      <SendMessageInner />
    </Suspense>
  );
}
