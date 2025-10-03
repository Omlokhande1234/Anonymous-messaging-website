"use client"

import { useState, useEffect, Suspense, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Sparkles, User, MessageSquare, Wand2, RefreshCw, Menu, X, Search, Check } from "lucide-react";
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
  
  // Search functionality states
  const [searchResults, setSearchResults] = useState<{username: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
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

  // Search users function
  const searchUsers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    console.log('[FRONTEND] Searching for:', query);
    setIsSearching(true);
    try {
      const response = await axios.get(`/api/search-users?q=${encodeURIComponent(query)}`);
      console.log('[FRONTEND] Search response:', response.data);
      
      if (response.data.success) {
        setSearchResults(response.data.users);
        setShowSuggestions(true);
        console.log('[FRONTEND] Found users:', response.data.users);
      } else {
        console.log('[FRONTEND] Search failed:', response.data.message);
        setSearchResults([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('[FRONTEND] Search error:', error);
      setSearchResults([]);
      setShowSuggestions(false);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle username input change with debounced search
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setSelectedIndex(-1); // Reset selection when typing

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      searchUsers(value);
    }, 300);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleSuggestionSelect(searchResults[selectedIndex].username);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (selectedUsername: string) => {
    console.log('Selecting username:', selectedUsername);
    setUsername(selectedUsername);
    setShowSuggestions(false);
    setSearchResults([]);
    
    // Focus back to input after selection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                onClick={() => router.push('/auth/signout')}
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
                onClick={() => router.push('/auth/signout')}
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
                {/* Username Field with Search */}
                <div className="space-y-2 relative">
                  <Label htmlFor="username" className="text-black flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Recipient Username</span>
                  </Label>
                  <div className="relative">
                    <Input
                      ref={inputRef}
                      id="username"
                      type="text"
                      placeholder="Search for a username..."
                      value={username}
                      onChange={handleUsernameChange}
                      onKeyDown={handleKeyDown}
                      className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isSearching ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                      ) : (
                        <Search className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    
                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && searchResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {searchResults.map((user, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionSelect(user.username)}
                            className={`w-full px-4 py-3 text-left flex items-center justify-between text-black border-b border-gray-100 last:border-b-0 transition-colors cursor-pointer ${
                              selectedIndex === index 
                                ? 'bg-blue-50 border-blue-200' 
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            <span className="flex items-center space-x-3">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{user.username}</span>
                            </span>
                            <Check className="h-4 w-4 text-green-500" />
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* No results message */}
                    {showSuggestions && searchResults.length === 0 && username.length >= 2 && !isSearching && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                        <div className="px-4 py-2 text-gray-500 text-sm">
                          {`No users found matching "${username}"`}
                        </div>
                      </div>
                    )}
                  </div>
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
