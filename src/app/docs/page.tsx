"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Code, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Terminal, 
  GitBranch,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Documentation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const techStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "Next.js 14", description: "React framework with App Router", features: ["Server Components", "Client Components", "API Routes", "Middleware"] },
        { name: "TypeScript", description: "Type-safe JavaScript", features: ["Static typing", "Interface definitions", "Type inference", "Compile-time checks"] },
        { name: "Tailwind CSS", description: "Utility-first CSS framework", features: ["Responsive design", "Custom components", "Dark mode ready", "Optimized builds"] },
        { name: "Lucide React", description: "Beautiful icon library", features: ["Consistent icons", "Customizable", "Tree-shakeable", "Accessible"] }
      ]
    },
    {
      category: "Backend",
      technologies: [
        { name: "Node.js", description: "JavaScript runtime", features: ["Async/await", "Event-driven", "NPM ecosystem", "Cross-platform"] },
        { name: "MongoDB", description: "NoSQL database", features: ["Document storage", "Flexible schema", "Indexing", "Aggregation"] },
        { name: "Mongoose", description: "MongoDB object modeling", features: ["Schema validation", "Middleware", "Query building", "Population"] }
      ]
    },
    {
      category: "Authentication",
      technologies: [
        { name: "NextAuth.js", description: "Authentication for Next.js", features: ["Multiple providers", "JWT tokens", "Session management", "Secure cookies"] },
        { name: "bcryptjs", description: "Password hashing", features: ["Salt generation", "Hash comparison", "Secure storage", "Brute-force protection"] }
      ]
    },
    {
      category: "Validation & Email",
      technologies: [
        { name: "Zod", description: "TypeScript-first schema validation", features: ["Runtime validation", "Type inference", "Error handling", "Schema composition"] },
        { name: "Nodemailer", description: "Email sending", features: ["SMTP support", "HTML emails", "Attachments", "Templates"] }
      ]
    }
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/signup",
      description: "User registration with email verification",
      features: ["Password hashing", "Duplicate checking", "Email sending", "Zod validation"]
    },
    {
      method: "POST",
      endpoint: "/api/verifyCode",
      description: "Email verification with 6-digit code",
      features: ["Code validation", "Expiry checking", "Account activation", "Error handling"]
    },
    {
      method: "POST",
      endpoint: "/api/auth/[...nextauth]",
      description: "NextAuth authentication endpoints",
      features: ["Credentials provider", "Session management", "JWT handling", "Google OAuth"]
    },
    {
      method: "GET",
      endpoint: "/api/get-messages",
      description: "Fetch user\'s anonymous messages",
      features: ["Authentication required", "Pagination support", "Date sorting", "Privacy protection"]
    },
    {
      method: "POST",
      endpoint: "/api/send-message",
      description: "Send anonymous message to user",
      features: ["No authentication needed", "Rate limiting", "Content filtering", "Anonymous sending"]
    },
    {
      method: "DELETE",
      endpoint: "/api/delete-message/[messageId]",
      description: "Delete specific message",
      features: ["Owner verification", "Soft delete", "Audit logging", "Error handling"]
    },
    {
      method: "POST",
      endpoint: "/api/accept-messages",
      description: "Toggle message acceptance",
      features: ["User preference", "Real-time update", "Privacy control", "State persistence"]
    }
  ];

  const features = [
    {
      title: "🔐 Secure Authentication",
      description: "Complete auth system with email verification",
      details: ["NextAuth.js integration", "Email verification flow", "Password hashing with bcrypt", "JWT token management", "Route protection middleware"]
    },
    {
      title: "📱 Professional OTP Input",
      description: "6-digit OTP input with auto-focus",
      details: ["Auto-focus progression", "Paste support", "Keyboard navigation", "Mobile optimized", "Accessibility features"]
    },
    {
      title: "🛡️ Route Protection",
      description: "Comprehensive route security",
      details: ["Server-side middleware", "Client-side hooks", "Authentication checks", "Automatic redirects", "Loading states"]
    },
    {
      title: "💌 Anonymous Messaging",
      description: "Core messaging functionality",
      details: ["Anonymous message sending", "Real-time updates", "Message management", "Privacy protection", "Content moderation"]
    },
    {
      title: "📧 Email System",
      description: "Automated email notifications",
      details: ["Verification emails", "SMTP integration", "HTML templates", "Error handling", "Delivery tracking"]
    },
    {
      title: "🎨 Modern UI/UX",
      description: "Beautiful and responsive design",
      details: ["Tailwind CSS styling", "Mobile-first design", "Interactive components", "Loading animations", "Accessibility compliant"]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm">Back to Home</span>
              </Link>
              <div className="flex items-center space-x-2">
                {/* <Image src="/home/mystrymsgs.png" alt="MysteryMsg" width={24} height={24} /> */}
                <span className="text-xl font-bold text-black">MysteryMsg</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Code className="h-6 w-6 text-gray-600" />
              <span className="text-lg font-semibold text-gray-800">Documentation</span>
            </div>
            <button
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg border border-gray-200"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="md:hidden border-b px-6 py-3">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-gray-600" />
            <span className="text-base font-semibold text-gray-800">Documentation</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Technical Documentation</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive overview of MysteryMsg&apos;s architecture, features, and implementation details. 
            Built with modern web technologies to showcase full-stack development expertise.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 text-center">
            <Code className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-bold text-2xl text-blue-800">7+</h3>
            <p className="text-blue-700">API Endpoints</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 text-center">
            <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-bold text-2xl text-green-800">12+</h3>
            <p className="text-green-700">Technologies</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 text-center">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-bold text-2xl text-purple-800">100%</h3>
            <p className="text-purple-700">Type Safe</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 text-center">
            <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-bold text-2xl text-orange-800">6</h3>
            <p className="text-orange-700">Core Features</p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Database className="h-8 w-8 mr-3" />
            Technology Stack
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {techStack.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">{category.category}</h3>
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-black">{tech.name}</h4>
                        <button
                          onClick={() => toggleSection(`${categoryIndex}-${techIndex}`)}
                          className="text-gray-500 hover:text-black"
                        >
                          {activeSection === `${categoryIndex}-${techIndex}` ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{tech.description}</p>
                      {activeSection === `${categoryIndex}-${techIndex}` && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex flex-wrap gap-2">
                            {tech.features.map((feature, featureIndex) => (
                              <span key={featureIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Zap className="h-8 w-8 mr-3" />
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-3 text-black">{feature.title}</h3>
                <p className="text-gray-700 mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* API Endpoints Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Globe className="h-8 w-8 mr-3" />
            API Endpoints
          </h2>
          <div className="space-y-4">
            {apiEndpoints.map((api, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      api.method === 'GET' ? 'bg-green-100 text-green-800' :
                      api.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {api.method}
                    </span>
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {api.endpoint}
                    </code>
                  </div>
                  <button
                    onClick={() => toggleSection(`api-${index}`)}
                    className="text-gray-500 hover:text-black"
                  >
                    {activeSection === `api-${index}` ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </button>
                </div>
                <p className="text-gray-700 mb-3">{api.description}</p>
                {activeSection === `api-${index}` && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {api.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Installation & Setup */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Terminal className="h-8 w-8 mr-3" />
            Installation & Setup
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">1. Clone Repository</h3>
                <button
                  onClick={() => copyToClipboard('git clone https://github.com/omlokhande1234/mystry-message.git', 'clone')}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  {copiedCode === 'clone' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="text-sm">{copiedCode === 'clone' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <code className="text-green-400">git clone https://github.com/omlokhande1234/mystry-message.git</code>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">2. Install Dependencies</h3>
                <button
                  onClick={() => copyToClipboard('npm install', 'install')}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  {copiedCode === 'install' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="text-sm">{copiedCode === 'install' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <code className="text-green-400">npm install</code>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">3. Environment Variables</h3>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <code className="text-sm text-gray-300">
                  MONGODB_URI=your_mongodb_connection_string<br/>
                  NEXTAUTH_SECRET=your_nextauth_secret<br/>
                  NEXTAUTH_URL=http://localhost:3000<br/>
                  EMAIL_USER=your_email@gmail.com<br/>
                  EMAIL_PASS=your_app_password<br/>
                  GOOGLE_CLIENT_ID=your_google_client_id<br/>
                  GOOGLE_CLIENT_SECRET=your_google_client_secret
                </code>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">4. Run Development Server</h3>
                <button
                  onClick={() => copyToClipboard('npm run dev', 'dev')}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  {copiedCode === 'dev' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="text-sm">{copiedCode === 'dev' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <code className="text-green-400">npm run dev</code>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <GitBranch className="h-8 w-8 mr-3" />
            Project Structure
          </h2>
          <div className="bg-gray-900 rounded-xl p-6 text-white">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`src/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   ├── signup/
│   │   └── verify/[username]/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── sign-up/
│   │   ├── verify-code/[username]/
│   │   ├── get-messages/
│   │   ├── send-message/
│   │   ├── delete-message/[messageId]/
│   │   └── accept-messages/
│   ├── dashboard/
│   ├── docs/
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── otp-input.tsx
│       └── ...
├── hooks/
│   └── useAuthRedirect.ts
├── lib/
│   ├── dbConnect.ts
│   └── utils.ts
├── model/
│   └── User.ts
├── schemas/
│   ├── signUpSchema.ts
│   └── verifySchema.ts
└── middleware.ts`}
            </pre>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Questions or Feedback?</h2>
            <p className="text-lg text-gray-700 mb-6">
              I&apos;d love to discuss this project and my development approach with you!
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="mailto:olokhande56@gmail.com"
                className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <span>Email Me</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a 
                href="https://github.com/omlokhande1234"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 border border-gray-300 text-black px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span>View GitHub</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

