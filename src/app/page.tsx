"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, Shield, Users, ArrowRight, Github, Mail, Linkedin, ChevronDown, ChevronUp, UserPlus, AtSign, Send, Inbox, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuthRedirect } from "@/Hooks/useAuthRedirect";

export default function Home() {
  const [ready, setReady] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  // Redirect if already authenticated
  const { status } = useAuthRedirect();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is MysteryMsg?",
      answer: "MysteryMsg is a platform that allows you to receive anonymous messages from friends, colleagues, or anyone who knows your unique link. It\'s perfect for getting honest feedback and authentic communication."
    },
    {
      question: "How does anonymous messaging work?",
      answer: "Once you create an account, you get a unique profile link. Share this link with others, and they can send you anonymous messages without revealing their identity. You can read all messages in your dashboard."
    },
    {
      question: "Is it really anonymous?",
      answer: "Yes! Senders don\'t need to create accounts or provide any personal information. Their identity is completely protected, ensuring honest and authentic communication."
    },
    {
      question: "Can I reply to anonymous messages?",
      answer: "Currently, messages are one-way to maintain anonymity. However, you can share responses publicly or create new posts that might address common themes from your messages."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use industry-standard encryption and security practices. Your account information is protected, and anonymous messages are stored securely without any identifying information about senders."
    },
    {
      question: "Can I control who sends me messages?",
      answer: "Yes! You can enable or disable message receiving at any time from your dashboard. You also have the option to delete any messages you don\'t want to keep."
    }
  ];
  
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

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="flex justify-between items-center p-4 lg:px-8 border-b">
        <div className="flex items-center space-x-2">
          {/* <Image src="/home/mystrymsgs.png" alt="MysteryMsg" width={28} height={28} /> */}
          <span className="text-xl font-bold text-black">MysteryMsg</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/docs">
            <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
              Documentation
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-black hover:bg-gray-800 text-white px-6">Get Started</Button>
          </Link>
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
          <Link href="/docs">
            <Button variant="outline" className="w-full justify-center border-gray-300 text-black hover:bg-gray-100">Documentation</Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline" className="w-full justify-center border-gray-300 text-black hover:bg-gray-100">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="w-full justify-center bg-black hover:bg-gray-800 text-white">Get Started</Button>
          </Link>
        </div>
      )}

      {/* Social Icons - Fixed Left Side */}
      <div className="fixed left-10 top-1/2 transform -translate-y-1/2 z-10 hidden lg:flex flex-col space-y-6">
        <a 
          href="https://github.com/omlokhande1234" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <Github className="h-6 w-6 text-gray-700 group-hover:text-black transition-colors" />
        </a>
        <a 
          href="https://www.linkedin.com/in/omlokhande2004/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <Linkedin className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
        </a>
        <a 
          href="mailto:olokhande56@gmail.com"
          className="p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <Mail className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition-colors" />
        </a>
      </div>

      <main className="flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto py-16">
          <div className="inline-block mb-6">
            <Sparkles className="h-16 w-16 text-black mx-auto" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Mystery
            <br />
            Messages
          </h1>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
            Unlock honest feedback through anonymous messaging. Built with modern web technologies to showcase full-stack development skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth/signin">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-xl">
                Start Messaging
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="border-gray-300 text-black hover:bg-gray-100 px-8 py-4 text-lg rounded-xl">
                Send Anonymous Message
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
              <Shield className="h-12 w-12 text-black mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-black mb-2">100% Anonymous</h3>
              <p className="text-gray-600">Your identity remains completely private and secure.</p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
              <Sparkles className="h-12 w-12 text-black mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-black mb-2">AI-Powered</h3>
              <p className="text-gray-600">Get intelligent message suggestions powered by Gemini AI.</p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
              <Users className="h-12 w-12 text-black mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-black mb-2">Connect Freely</h3>
              <p className="text-gray-600">Build genuine connections through honest communication.</p>
            </div>
          </div>

          {/* How It Works */}
          <div className="max-w-5xl mx-auto mt-20">
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold text-black mb-1">Register</h3>
                <p className="text-sm text-gray-600">Create your free account</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                  <AtSign className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold text-black mb-1">Unique Username</h3>
                <p className="text-sm text-gray-600">Claim your unique handle</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                  <Send className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold text-black mb-1">Send Message</h3>
                <p className="text-sm text-gray-600">Share your link, receive notes</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                  <Inbox className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold text-black mb-1">Receive</h3>
                <p className="text-sm text-gray-600">Messages appear in dashboard</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-semibold text-black mb-1">No Credentials</h3>
                <p className="text-sm text-gray-600">Sender identity never shared</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-20">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-black">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Contact Section */}
          <div className="max-w-4xl mx-auto mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">👋 Hello Recruiters!</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                This project showcases my full-stack development skills using Next.js, TypeScript, MongoDB, NextAuth, and modern UI/UX practices. 
                I&apos;m passionate about creating user-centric applications with clean code and scalable architecture.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a 
                href="mailto:olokhande56@gmail.com"
                className="flex items-center justify-center space-x-3 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow group"
              >
                <Mail className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="font-semibold text-black">Email Me</p>
                  <p className="text-sm text-gray-600">olokhande56@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/omlokhande1234"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow group"
              >
                <Github className="h-6 w-6 text-gray-800 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="font-semibold text-black">GitHub</p>
                  <p className="text-sm text-gray-600">View my projects</p>
                </div>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/omlokhande2004/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow group"
              >
                <Linkedin className="h-6 w-6 text-blue-700 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="font-semibold text-black">LinkedIn</p>
                  <p className="text-sm text-gray-600">Connect with me</p>
                </div>
              </a>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Tech Stack:</strong> Next.js 14, TypeScript, MongoDB, NextAuth, Tailwind CSS, Zod Validation, Nodemailer
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['React', 'Next.js', 'TypeScript', 'MongoDB', 'NextAuth', 'Tailwind CSS', 'Node.js'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-black text-white text-xs rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              {/* <Image src="/home/mystrymsgs.png" alt="MysteryMsg" width={24} height={24} /> */}
              <span className="text-lg font-semibold text-black">MysteryMsg</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-500">
              <a href="https://github.com/omlokhande1234" target="_blank" rel="noopener noreferrer" className="hover:text-black">GitHub</a>
              <a href="https://www.linkedin.com/in/omlokhande2004/" target="_blank" rel="noopener noreferrer" className="hover:text-black">LinkedIn</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center text-gray-500">
            <p>&copy; 2025 MysteryMsg. Built by Om Lokhande to showcase full-stack development skills.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}