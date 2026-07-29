"use client";

import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Youtube,
  ArrowUp,
} from "lucide-react";

export default function Component() {
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
    { icon: MessageCircle, href: "mailto:info@codexellence.com" },
    { icon: Youtube, href: "https://youtube.com" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/usluge" },
    { label: "About Us", href: "/o-nama" },
    { label: "Contact", href: "/kontakt" },
  ];

  const contactInfo = [
    "Email: info@codexellence.com",
    "Address: Podgorica, Montenegro",
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white relative">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 relative">
                ABOUT US
                <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-purple-500"></div>
                <div className="absolute -bottom-2 left-14 w-2 h-2 bg-purple-500 rounded-full"></div>
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our goal is to simplify web hosting for everyone – from small
              businesses to large companies. We provide reliable, fast, and
              secure solutions, backed by support that helps you grow.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors duration-300"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 relative">
                QUICK LINKS
                <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-purple-500"></div>
                <div className="absolute -bottom-2 left-14 w-2 h-2 bg-purple-500 rounded-full"></div>
              </h3>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center"
                  >
                    <span className="mr-2">{">"}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 relative">
                CONTACT INFO
                <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-purple-500"></div>
                <div className="absolute -bottom-2 left-14 w-2 h-2 bg-purple-500 rounded-full"></div>
              </h3>
            </div>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-400 text-sm flex items-start"
                >
                  <span className="mr-2">{">"}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 relative">
                SUBSCRIBE
                <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-purple-500"></div>
                <div className="absolute -bottom-2 left-14 w-2 h-2 bg-purple-500 rounded-full"></div>
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sign up for our newsletter and stay up to date with the latest
              offers and news.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg text-sm bg-slate-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-purple-600 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-white">
              Copyright © 2025 Codexellence. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="/privacy-policy"
                className="text-sm text-white/80 hover:text-white transition-colors duration-300 underline underline-offset-2"
              >
                Privacy Policy
              </a>
              <span className="text-white/40">|</span>
              <a
                href="/terms"
                className="text-sm text-white/80 hover:text-white transition-colors duration-300 underline underline-offset-2"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
