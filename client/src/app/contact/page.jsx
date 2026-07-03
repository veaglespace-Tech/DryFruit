import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "Contact Us | Shreepad Enterprises Premium Dry Fruits",
  description:
    "Get in touch with Shreepad Enterprises. Have a question, want to place a bulk order, or need support? Send us a message or chat via WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: "110px" }}>
        {/* Breadcrumb banner */}
        <div className="py-10 md:py-12 bg-[#F5EDE0] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
          <div className="container-luxury relative z-10">
            <span className="text-xs font-button font-bold text-accent uppercase tracking-widest">
              Get in Touch
            </span>
            <h1
              className="font-heading text-primary mt-2 mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800 }}
            >
              Contact Shreepad Enterprises
            </h1>
            <div className="section-divider mx-auto" />
            <p className="body-lead max-w-xl mx-auto mt-4">
              Have a question, bulk order enquiry, or general feedback? We'd love to hear from you.
            </p>
          </div>
        </div>

        {/* Contact form and details */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
