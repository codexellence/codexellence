import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import PromoPopup from "@/components/PopupModal";
import { notFound } from "next/navigation";

export default function Home() {
  const data = true;
  if (!data) {
    notFound();
  }

  return (
    <div>
      <Header />
      <LandingPage />
      <Footer />
      <PromoPopup />
    </div>
  );
}
