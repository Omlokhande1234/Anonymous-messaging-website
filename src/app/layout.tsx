import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mystrymsg.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "MysteryMsg - Anonymous Messages",
    template: "%s | MysteryMsg",
  },
  description: "Send and receive anonymous messages with AI-powered suggestions",
  applicationName: "MysteryMsg",
  keywords: [
    "anonymous messages",
    "feedback",
    "Next.js",
    "TypeScript",
    "NextAuth",
    "MongoDB",
  ],
  authors: [{ name: "Om Lokhande" }],
  creator: "Om Lokhande",
  publisher: "MysteryMsg",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "MysteryMsg - Anonymous Messages",
    description: "Send and receive anonymous messages with AI-powered suggestions",
    siteName: "MysteryMsg",
    images: [
      {
        url: "/home/image.png",
        width: 1200,
        height: 630,
        alt: "MysteryMsg - Anonymous Messages",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MysteryMsg - Anonymous Messages",
    description: "Send and receive anonymous messages with AI-powered suggestions",
    images: ["/home/image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/home/mystrymsgs.png", type: "image/png" },
    ],
    apple: [{ url: "/home/mystrymsgs.png" }],
  },
  category: "social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black min-h-screen`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
