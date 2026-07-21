import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Shreepad Enterprises",
  description:
    "Read the Terms of Service for Shreepad Enterprises. Understand the rules, rights, and responsibilities when using our website and purchasing our products.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="pt-24 md:pt-[110px]">
        {/* Hero Banner */}
        <div className="py-8 md:py-14 bg-[#F5EDE0] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          <div className="container-luxury relative z-10">
            <span className="text-xs font-button font-bold text-accent uppercase tracking-widest">
              Legal
            </span>
            <h1
              className="font-heading text-primary mt-2 mb-3"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Terms of Service
            </h1>
            <div className="section-divider mx-auto" />
            <p className="body-lead max-w-xl mx-auto mt-3 text-sm">
              Last updated: July 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <section className="section-padding bg-surface">
          <div className="container-luxury max-w-4xl">
            <div className="bg-white rounded-3xl border border-border-DEFAULT shadow-card p-6 sm:p-8 md:p-12 space-y-10">

              {/* Intro */}
              <div>
                <p className="font-body text-text-muted leading-relaxed">
                  Welcome to <strong className="text-primary">Shreepad Enterprises</strong>. By accessing or using our
                  website and purchasing our products, you agree to be bound by the following Terms of Service. Please
                  read them carefully before using our platform.
                </p>
              </div>

              <PolicySection title="1. Acceptance of Terms">
                <p>
                  By visiting our website, placing an order, or using any of our services, you confirm that you have
                  read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do
                  not agree, please refrain from using our website.
                </p>
              </PolicySection>

              <PolicySection title="2. Products & Descriptions">
                <ul>
                  <li>All products listed are subject to availability.</li>
                  <li>We strive to display accurate product images, descriptions, and prices. Minor variations in color or packaging may occur.</li>
                  <li>Weights and quantities are approximate and may vary slightly.</li>
                  <li>We reserve the right to discontinue any product without prior notice.</li>
                </ul>
              </PolicySection>

              <PolicySection title="3. Orders & Pricing">
                <ul>
                  <li>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.</li>
                  <li>An order is confirmed only after successful payment and an order confirmation email/message is sent.</li>
                  <li>We reserve the right to cancel orders in case of pricing errors, stock unavailability, or suspicious activity.</li>
                  <li>Promotional prices and discounts are valid only for the stated period.</li>
                </ul>
              </PolicySection>

              <PolicySection title="4. Payment">
                <ul>
                  <li>We accept major payment methods including UPI, credit/debit cards, net banking, and wallets.</li>
                  <li>Payments are processed through secure third-party gateways. We do not store your card or banking details.</li>
                  <li>In case of payment failure, please ensure the amount is not deducted before retrying. If deducted, it will be refunded within 5–7 working days.</li>
                </ul>
              </PolicySection>

              <PolicySection title="5. Shipping & Delivery">
                <ul>
                  <li>We deliver Pan India. Delivery timelines are typically 3–5 working days.</li>
                  <li>Delivery charges (if any) will be displayed at checkout.</li>
                  <li>Free delivery is available on orders above ₹999.</li>
                  <li>We are not responsible for delays caused by courier partners, natural events, or incorrect addresses provided by the customer.</li>
                  <li>Please ensure someone is available to receive the order. If undelivered, the package will be returned and re-delivery charges may apply.</li>
                </ul>
              </PolicySection>

              <PolicySection title="6. Returns & Replacements">
                <p>
                  Due to the perishable nature of food products, we have a limited return policy:
                </p>
                <ul>
                  <li>If you receive a damaged, defective, or incorrect product, please report within <strong>48 hours</strong> of delivery with photos.</li>
                  <li>Valid complaints will be resolved through replacement or store credit at our discretion.</li>
                  <li>Products that have been opened, partially consumed, or stored improperly are not eligible for return or replacement.</li>
                  <li>Change of mind is not considered a valid reason for return.</li>
                </ul>
              </PolicySection>

              <PolicySection title="7. User Account">
                <ul>
                  <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                  <li>You agree to notify us immediately of any unauthorized access to your account.</li>
                  <li>We reserve the right to suspend or terminate accounts involved in fraudulent or abusive activity.</li>
                </ul>
              </PolicySection>

              <PolicySection title="8. Intellectual Property">
                <p>
                  All content on this website including logos, images, text, product descriptions, and design elements
                  is the intellectual property of Shreepad Enterprises. Unauthorized reproduction, redistribution, or
                  use of any content without written permission is strictly prohibited.
                </p>
              </PolicySection>

              <PolicySection title="9. Limitation of Liability">
                <p>
                  Shreepad Enterprises shall not be liable for any indirect, incidental, or consequential damages
                  arising from the use of our website or products. Our total liability shall not exceed the amount
                  paid for the specific order in question.
                </p>
              </PolicySection>

              <PolicySection title="10. Governing Law">
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of India.
                  Any disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.
                </p>
              </PolicySection>

              <PolicySection title="11. Changes to Terms">
                <p>
                  We reserve the right to modify these Terms of Service at any time. Updated terms will be posted
                  on this page. Continued use of our website after changes constitutes acceptance of the new terms.
                </p>
              </PolicySection>

              <PolicySection title="12. Contact Us">
                <p>For questions about these Terms of Service, please contact us:</p>
                <div className="mt-4 p-5 bg-[#F5EDE0] rounded-2xl space-y-2">
                  <p><strong>Shreepad Enterprises</strong></p>
                  <p>📍 123, Green Valley Road, Pune, Maharashtra 411001</p>
                  <p>📞 <a href="tel:+919860941171" className="text-primary hover:text-accent transition-colors">+91 98609 41171</a></p>
                  <p>✉️ <a href="mailto:hello@shreepadenterprises.com" className="text-primary hover:text-accent transition-colors">hello@shreepadenterprises.com</a></p>
                </div>
              </PolicySection>

              {/* Back Link */}
              <div className="pt-4 border-t border-border-DEFAULT flex flex-wrap gap-4">
                <Link href="/" className="btn-outline-luxury text-sm">← Back to Home</Link>
                <Link href="/privacy-policy" className="btn-outline-luxury text-sm">Privacy Policy →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PolicySection({ title, children }) {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-primary text-xl md:text-2xl font-bold border-l-4 border-accent pl-4">
        {title}
      </h2>
      <div className="font-body text-text-muted leading-relaxed space-y-3 pl-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-text-DEFAULT [&_a]:text-primary [&_a:hover]:text-accent [&_a]:transition-colors">
        {children}
      </div>
    </div>
  );
}
