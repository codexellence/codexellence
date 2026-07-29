"use client";

import type React from "react";
import { useState } from "react";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Shield,
  Zap,
  Clock,
  MousePointer2,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ACCESS_KEY = "e2cea8b0-7417-4239-9fb6-72ee37f1c95f";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const TRUST_STRIP = [
  { icon: Zap, label: "24h delivery" },
  { icon: Clock, label: "Fast response" },
  { icon: Shield, label: "Guarantee" },
];

const BUSINESS_HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 4:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const TRUST_PANEL = [
  { icon: Zap, label: "24h delivery" },
  { icon: Shield, label: "Satisfaction guaranteed" },
  { icon: Clock, label: "Fast response to inquiries" },
];

const SUBJECT_OPTIONS = [
  { value: "", label: "Choose a subject" },
  { value: "general", label: "General question" },
  { value: "support", label: "Technical support" },
  { value: "billing", label: "Billing questions" },
  { value: "consultation", label: "Free consultation" },
  { value: "other", label: "Other" },
];

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

function PageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      * { font-family: 'Outfit', sans-serif; }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-16px); }
      }

      @keyframes floatB {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(4deg); }
      }

      @keyframes slide-up {
        from { opacity: 0; transform: translateY(28px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes soft-pulse {
        0%, 100% { box-shadow: 0 4px 24px rgba(109,40,217,0.15); }
        50% { box-shadow: 0 4px 40px rgba(109,40,217,0.28); }
      }

      .hero-a  { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }
      .hero-a2 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
      .hero-a3 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s both; }
      .slide-up { animation: slide-up 0.6s cubic-bezier(0.16,1,0.3,1) both; }

      .dot-grid {
        background-image: radial-gradient(circle, rgba(109,40,217,0.10) 1px, transparent 1px);
        background-size: 28px 28px;
      }

      .cta-btn {
        animation: soft-pulse 3s ease-in-out infinite;
        transition: transform 0.2s ease, background-color 0.2s ease;
      }

      .cta-btn:hover { transform: scale(1.01); }

      .input-field {
        transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
      }

      .input-field:focus {
        outline: none;
        border-color: rgb(124 58 237);
        background-color: white;
        box-shadow: 0 0 0 3px rgba(124,58,237,0.10);
      }

      .info-card {
        transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
      }

      .info-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 32px rgba(109,40,217,0.08);
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-a, .hero-a2, .hero-a3, .slide-up, .cta-btn {
          animation: none !important;
        }
      }
    `}</style>
  );
}

function SuccessView() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/70 to-indigo-50/50 flex items-center justify-center px-4 pt-20">
        <div className="slide-up bg-white border border-gray-100 shadow-xl rounded-3xl p-12 text-center max-w-md w-full space-y-4">
          <div className="w-16 h-16 bg-teal-500/15 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-teal-500" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Message sent!</h1>
          <p className="text-gray-500">
            Thank you for your inquiry. We’ll get back to you shortly.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ContactInfoCard() {
  return (
    <div className="info-card bg-gray-50 border border-gray-100 rounded-3xl p-7 space-y-6">
      <h2 className="text-xl font-black text-gray-900">Contact information</h2>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-0.5">Email</h3>
          <a
            href="mailto:info@codexellence.com"
            className="text-gray-600 text-sm hover:text-violet-600 transition-colors"
          >
            info@codexellence.com
          </a>
          <p className="text-gray-400 text-xs mt-0.5">
            We respond within a few hours
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-0.5">Address</h3>
          <p className="text-gray-600 text-sm">
            New York
            <br />
            United States of America
          </p>
        </div>
      </div>
    </div>
  );
}

function BusinessHoursCard() {
  return (
    <div className="info-card bg-gray-50 border border-gray-100 rounded-3xl p-7 space-y-4">
      <h2 className="font-black text-gray-900">Business hours</h2>

      <div className="space-y-3 text-sm">
        {BUSINESS_HOURS.map((row) => (
          <div
            key={row.day}
            className="flex justify-between items-center gap-4"
          >
            <span className="text-gray-500">{row.day}</span>
            <span
              className={`font-semibold ${
                row.time === "Closed" ? "text-gray-400" : "text-gray-900"
              }`}
            >
              {row.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustPanelCard() {
  return (
    <div className="relative bg-slate-900 rounded-3xl p-7 space-y-3 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative space-y-3">
        {TRUST_PANEL.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-violet-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-white/70 text-sm font-medium">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type InputProps = {
  label: string;
  id: keyof FormState;
  name: keyof FormState;
  value: string;
  onChange: (e: ChangeEvent) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  icon: React.ElementType;
};

function TextInput({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  icon: Icon,
}: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="input-field w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 text-sm"
        />
      </div>
    </div>
  );
}

type FormCardProps = {
  formData: FormState;
  isSubmitting: boolean;
  statusMessage: string;
  statusType: "idle" | "error" | "success";
  onChange: (e: ChangeEvent) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

function InquiryFormCard({
  formData,
  isSubmitting,
  statusMessage,
  statusType,
  onChange,
  onSubmit,
}: FormCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 sm:p-10">
      <h2 className="text-2xl font-black text-gray-900 mb-8">
        Send an inquiry
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <input type="hidden" name="access_key" value={ACCESS_KEY} />
        <input type="hidden" name="from_name" value="Codexellence Website" />
        <input
          type="hidden"
          name="subject"
          value={`New inquiry: ${formData.subject || "General"}`}
        />
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid md:grid-cols-2 gap-5">
          <TextInput
            label="Name *"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            placeholder="Enter your name"
            icon={User}
          />

          <TextInput
            label="Email address *"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            type="email"
            placeholder="Enter your email"
            icon={Mail}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <TextInput
            label="Phone number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Enter your phone number"
            type="tel"
            icon={Phone}
          />

          <div className="space-y-2">
            <label
              htmlFor="subject-select"
              className="block text-sm font-semibold text-gray-700"
            >
              Subject *
            </label>
            <select
              id="subject-select"
              name="subject"
              value={formData.subject}
              onChange={onChange}
              required
              className="input-field w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-900 text-sm"
            >
              {SUBJECT_OPTIONS.map((option) => (
                <option key={option.value || "default"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700"
          >
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={onChange}
              required
              rows={6}
              placeholder="Tell us a bit about your project..."
              className="input-field w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 resize-none text-sm"
            />
          </div>
        </div>

        {statusMessage ? (
          <div
            className={`rounded-2xl px-4 py-3 text-sm text-center border ${
              statusType === "error"
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {statusMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="cta-btn w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-2xl text-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send message
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs pt-2 border-t border-gray-100">
          <Shield className="w-4 h-4 text-teal-500" />
          We typically respond within a few hours
        </div>
      </form>
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"idle" | "error" | "success">(
    "idle"
  );

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");
    setStatusType("idle");

    try {
      const form = e.currentTarget;
      const data = new FormData(form);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      console.log("Web3Forms response:", result);

      if (result.success) {
        setStatusType("success");
        setStatusMessage("Success! Your inquiry was sent.");
        setIsSubmitted(true);
        resetForm();
        form.reset();

        window.setTimeout(() => {
          setIsSubmitted(false);
          setStatusMessage("");
          setStatusType("idle");
        }, 3000);
      } else {
        setStatusType("error");
        setStatusMessage(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Web3Forms submit error:", error);
      setStatusType("error");
      setStatusMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <PageStyles />
        <SuccessView />
      </>
    );
  }

  return (
    <>
      <PageStyles />
      <Header />

      <main className="overflow-x-hidden">
        <section className="relative bg-gradient-to-br from-white via-purple-50/70 to-indigo-50/50 pt-32 pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-200/30 blur-3xl pointer-events-none"
            style={{ animation: "float 11s ease-in-out infinite" }}
          />
          <div
            className="absolute top-1/2 -right-40 w-[380px] h-[380px] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none"
            style={{ animation: "float 14s ease-in-out infinite 3s" }}
          />
          <div
            className="absolute top-24 right-24 w-6 h-6 bg-violet-300 rounded-md rotate-12 opacity-30"
            style={{ animation: "floatB 6s ease-in-out infinite" }}
          />
          <div
            className="absolute top-40 right-40 w-4 h-4 bg-purple-300 rounded-md rotate-45 opacity-20"
            style={{ animation: "floatB 8s ease-in-out infinite 1s" }}
          />
          <div
            className="absolute bottom-10 right-20 w-5 h-5 bg-violet-400 rounded-md rotate-12 opacity-25"
            style={{ animation: "floatB 7s ease-in-out infinite 2s" }}
          />

          <div className="max-w-7xl mx-auto relative z-10 text-center space-y-5">
            <div className="hero-a flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white border border-violet-200 shadow-sm rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                <span className="text-gray-600 text-sm font-medium">
                  We respond within a few hours
                </span>
              </div>
            </div>

            <div className="hero-a2 space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight">
                Contact us
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
                If you’d like your website in 24h, please reach out via our
                inquiry form and we’ll reply quickly.
              </p>
            </div>

            <div className="hero-a3 flex flex-wrap justify-center gap-6 text-sm text-gray-500 pt-2">
              {TRUST_STRIP.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-violet-500" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 text-xs">
            <MousePointer2 className="w-4 h-4" />
            <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-5">
                <ContactInfoCard />
                <BusinessHoursCard />
                <TrustPanelCard />
              </div>

              <div className="lg:col-span-2">
                <InquiryFormCard
                  formData={formData}
                  isSubmitting={isSubmitting}
                  statusMessage={statusMessage}
                  statusType={statusType}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
