"use client";

import Link from "next/link";
import { Home, ArrowLeft, Mail } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-purple-600 opacity-20 leading-none">
            404
          </h1>
        </div>

        {/* Main Content */}
        <div className="relative -mt-20 md:-mt-32">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page not found
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            We're sorry, but the page you're looking for doesn't exist or has
            been moved to a different location.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              <Home className="w-5 h-5" />
              Home page
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              You might be looking for:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/o-nama"
                className="text-purple-600 hover:text-purple-800 hover:underline transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/usluge"
                className="text-purple-600 hover:text-purple-800 hover:underline transition-colors"
              >
                Our Services
              </Link>
              <Link
                href="/projekti"
                className="text-purple-600 hover:text-purple-800 hover:underline transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/kontakt"
                className="text-purple-600 hover:text-purple-800 hover:underline transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <p className="text-gray-700 mb-3">Need help? Contact us!</p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              Send us a message
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
