"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import clsx from "clsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Sticky Header */}
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-200 transition-transform duration-300",
          {
            "-translate-y-full": !showHeader,
            "translate-y-0": showHeader,
          },
        )}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg
              width="52"
              height="36"
              viewBox="0 0 130 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left bracket < */}
              <path
                d="M30 22 L8 50 L30 78"
                stroke="#7C3AED"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Slash / */}
              <line
                x1="74"
                y1="18"
                x2="56"
                y2="82"
                stroke="#7C3AED"
                strokeWidth="11"
                strokeLinecap="round"
              />
              {/* Right bracket > */}
              <path
                d="M100 22 L122 50 L100 78"
                stroke="#7C3AED"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-bold text-xl text-gray-900">
              Codexellence
            </span>
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-purple-600">
              Home
            </Link>
            <Link
              href="/our-services"
              className="text-gray-700 hover:text-purple-600"
            >
              Services
            </Link>
            <Link
              href="/about-us"
              className="text-gray-700 hover:text-purple-600"
            >
              About Us
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-purple-600">
              FAQ
            </Link>
            <Link
              href="/demo-websites"
              className="text-gray-700 hover:text-purple-600"
            >
              Demo Websites
            </Link>
            <Link
              href="/order-website"
              className="text-gray-700 hover:text-purple-600"
            >
              Order Website
            </Link>
          </nav>

          {/* Right: Contact + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden md:flex">
              <Button
                variant="outline"
                className="bg-purple-600 hover:bg-purple-500 text-white border-gray-300 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact us!
              </Button>
            </Link>

            {/* Hamburger menu */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-gray-700 hover:text-purple-600 z-[110]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[110]",
          {
            "-translate-x-full": !menuOpen,
            "translate-x-0": menuOpen,
          },
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <svg
              width="40"
              height="28"
              viewBox="0 0 130 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 22 L8 50 L30 78"
                stroke="#7C3AED"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="74"
                y1="18"
                x2="56"
                y2="82"
                stroke="#7C3AED"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <path
                d="M100 22 L122 50 L100 78"
                stroke="#7C3AED"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-bold text-lg text-gray-900">
              Codexellence
            </span>
          </div>
          <button onClick={() => setMenuOpen(false)} className="text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link href="/" className="text-gray-700 hover:text-purple-600">
            Home
          </Link>
          <Link
            href="/our-services"
            className="text-gray-700 hover:text-purple-600"
          >
            Services
          </Link>
          <Link
            href="/about-us"
            className="text-gray-700 hover:text-purple-600"
          >
            About Us
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-purple-600">
            Contact
          </Link>
          <Link
            href="/demo-websites"
            className="text-gray-700 hover:text-purple-600"
          >
            Demo Websites
          </Link>
          <Link
            href="/order-website"
            className="text-gray-700 hover:text-purple-600"
          >
            Order Website
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-purple-600">
            FAQ
          </Link>
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-[100]"
        />
      )}
    </>
  );
}
