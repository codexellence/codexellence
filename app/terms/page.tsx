"use client";

import {
  FileText,
  CreditCard,
  AlertTriangle,
  RefreshCw,
  Scale,
  Mail,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function TermsOfServicePage() {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of terms",
      content: `By using our services and the codexellence.com website, you confirm that you have read, understood, and fully accept these terms of service.

      If you do not agree with any part of these terms, please do not use our services. We reserve the right to change these terms at any time, and you will be notified in a timely manner.`,
    },
    {
      icon: CreditCard,
      title: "Services and payment",
      content: `Codexellence provides website development, visual content creation, and technical support services. All prices are listed in euros (EUR) and include VAT where applicable.

      Payment is made in full, one time, upfront, and website development begins once payment is confirmed. The package price is 99.99 EUR and includes website creation plus three months of free support.`,
    },
    {
      icon: RefreshCw,
      title: "Delivery timeline and revisions",
      content: `We commit to delivering the first version of your website within 24 hours from the moment you submit all required information through our form.

      After delivery of the first version, you are entitled to reasonable revisions within the agreed timeframe. Any changes beyond the originally agreed scope of work may be subject to additional charges, of which you will be notified in advance.`,
    },
    {
      icon: AlertTriangle,
      title: "Disclaimer",
      content: `Codexellence assumes no responsibility for loss of revenue, data, or any indirect damages that may result from the use of the developed website.

      The client is responsible for the accuracy and legality of all content provided to us for the website. We are not liable for delays caused by the client's failure to provide information in a timely manner.`,
    },
    {
      icon: Scale,
      title: "Intellectual property",
      content: `Upon full payment, the client acquires full ownership rights to the developed website and all custom content created exclusively for them.

      Codexellence retains the right to use the completed website as a reference in its portfolio, unless the client requests otherwise in writing. All tools, frameworks, and libraries we use remain under their original licenses.`,
    },
    {
      icon: Mail,
      title: "Termination and refunds",
      content: `The client may cancel an order free of charge if this is done before we have begun work on the website.

      Once development has begun, refunds are not possible, except in cases where Codexellence fails to deliver the agreed services. In the event of a dispute, we will strive to find a resolution acceptable to both parties.`,
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
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-purple-600 font-semibold text-sm tracking-wider uppercase">
              TERMS
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of <span className="text-purple-600">Service</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. They
            define the rights and obligations of both parties.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Last updated: January 2025.
          </p>
        </div>

        {/* Intro Banner */}
        <section className="py-10 bg-gradient-to-br from-purple-100 via-purple-50 to-white w-full rounded-[20px] mb-12 border border-purple-200">
          <div className="px-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Transparency is our priority
            </h2>
            <p className="text-purple-700 text-lg leading-relaxed">
              We believe in clear and fair relationships with our clients. These
              terms are written in plain language so you know exactly what you
              can expect from us — and what we expect from you.
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

        {/* Governing Law */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Governing law</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            These terms of service are governed by and interpreted in accordance
            with the laws of Montenegro. Any disputes arising from these terms
            will be resolved before the competent courts of Montenegro.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            If any provision of these terms is found to be invalid or
            unenforceable, the remaining provisions shall remain in full force
            and effect.
          </p>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-br from-purple-100 via-purple-50 to-white rounded-[20px] p-10 text-center max-w-5xl mx-auto border border-purple-200">
          <Mail className="w-10 h-10 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-purple-900 mb-3">
            Have questions about the terms?
          </h2>
          <p className="text-purple-700 mb-6">
            Our team is here to answer any questions you may have. Feel free to
            contact us.
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
