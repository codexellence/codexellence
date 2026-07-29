"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Users, Bell, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Eye,
      title: "What data we collect",
      content: `We only collect data that is necessary to provide our services. This includes:

      Personal information you provide to us directly — such as your name, email address, and phone number when you contact us or order a website. Technical information about your device and how you use our website, such as your IP address, browser type, and pages visited.`,
    },
    {
      icon: Lock,
      title: "How we use your data",
      content: `We use your data solely for the purposes for which it was collected:

      To build and deliver your website according to your requirements. To communicate with you during and after the website development process. To provide customer support and respond to your inquiries. To improve our services and user experience.`,
    },
    {
      icon: Users,
      title: "Data sharing",
      content: `We do not sell, rent, or share your personal data with third parties for commercial purposes.

      We may share your data with trusted partners who help us provide our services (e.g. hosting providers), but only to the extent necessary and under an obligation to keep the data confidential.`,
    },
    {
      icon: Shield,
      title: "Data protection",
      content: `We apply appropriate technical and organizational security measures to protect your data from unauthorized access, loss, or misuse.

      All data is transmitted over an encrypted SSL connection. Our systems are regularly monitored and updated to ensure the highest level of security.`,
    },
    {
      icon: Bell,
      title: "Your rights",
      content: `In accordance with applicable data protection regulations, you have the right to:

      Request access to the personal data we hold about you. Request correction of inaccurate data. Request deletion of your data. Withdraw consent to data processing at any time. File a complaint with the relevant data protection authority.`,
    },
    {
      icon: Mail,
      title: "Contact us",
      content: `If you have any questions or concerns regarding this privacy policy or how we process your data, feel free to contact us.

      We will respond as soon as possible, and no later than within 7 business days.`,
    },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-16 mt-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-purple-600 font-semibold text-sm tracking-wider uppercase">
              PRIVACY
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy <span className="text-purple-600">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy matters greatly to us. This page explains how we
            collect, use, and protect your personal data.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Last updated: January 2025.
          </p>
        </div>

        {/* Intro Card */}
        <section className="py-10 bg-gradient-to-br from-purple-100 via-purple-50 to-white w-full rounded-[20px] mb-12 border border-purple-200">
          <div className="px-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Your data is safe with us
            </h2>
            <p className="text-purple-700 text-lg leading-relaxed">
              Codexellence is committed to processing your personal data in a
              transparent, secure, and lawful manner. We will never abuse your
              trust.
            </p>
          </div>
        </section>

        {/* Sections Grid */}
        <section className="py-8 bg-gray-50 rounded-[20px] px-6 mb-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {section.title}
                      </h3>
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cookies Section */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Cookies</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Our website uses cookies to improve your browsing experience.
            Cookies are small text files stored on your device.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            We only use necessary technical cookies required for the site to
            function. We do not use cookies for tracking or advertising purposes
            without your explicit consent. You can set your browser to reject
            cookies, but keep in mind this may affect the functioning of certain
            parts of the site.
          </p>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-br from-purple-100 via-purple-50 to-white rounded-[20px] p-10 text-center max-w-5xl mx-auto border border-purple-200">
          <Mail className="w-10 h-10 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-purple-900 mb-3">
            Have questions about privacy?
          </h2>
          <p className="text-purple-700 mb-6">
            Our team is here for you. Write to us and we'll respond as soon as
            possible.
          </p>
          <a
            href="/kontakt"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-200"
          >
            Contact us
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
