import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Shreepad Enterprises",
  description:
    "Read Shreepad Enterprises' Privacy Policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="pt-24 md:pt-[110px]">
        {/* Hero Banner */}
        <div className="py-8 md:py-14 bg-[#F5EDE0] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="container-luxury relative z-10">
            <span className="text-xs font-button font-bold text-accent uppercase tracking-widest">
              Legal
            </span>
            <h1
              className="font-heading text-primary mt-2 mb-3"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}
            >
              Privacy Policy
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
                  Welcome to <strong className="text-primary">Shreepad Enterprises</strong>. We are committed to
                  protecting your personal information and your right to privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
                </p>
              </div>

              <PolicySection title="1. Information We Collect">
                <p>We may collect the following types of information:</p>
                <ul>
                  <li><strong>Personal Identification:</strong> Name, email address, phone number, delivery address.</li>
                  <li><strong>Order Information:</strong> Products purchased, order history, payment details (processed securely via third-party gateways — we do not store card details).</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, IP address (collected automatically via cookies).</li>
                  <li><strong>Communications:</strong> Messages sent via our contact form or WhatsApp.</li>
                </ul>
              </PolicySection>

              <PolicySection title="2. How We Use Your Information">
                <p>We use your information to:</p>
                <ul>
                  <li>Process and fulfill your orders.</li>
                  <li>Send order confirmations and delivery updates.</li>
                  <li>Respond to your queries and support requests.</li>
                  <li>Send promotional offers and newsletters (only with your consent).</li>
                  <li>Improve our website and customer experience.</li>
                  <li>Comply with legal obligations.</li>
                </ul>
              </PolicySection>

              <PolicySection title="3. Sharing of Information">
                <p>We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share data only with:</p>
                <ul>
                  <li><strong>Delivery Partners:</strong> To fulfill and ship your orders.</li>
                  <li><strong>Payment Processors:</strong> Secure third-party gateways for transaction processing.</li>
                  <li><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
                </ul>
              </PolicySection>

              <PolicySection title="4. Cookies">
                <p>
                  Our website uses cookies to enhance your browsing experience. Cookies help us remember your preferences,
                  analyze website traffic, and personalize content. You can control cookie settings through your browser settings.
                  Disabling cookies may affect certain features of our website.
                </p>
              </PolicySection>

              <PolicySection title="5. Data Security">
                <p>
                  We implement industry-standard security measures including SSL encryption, secure servers, and restricted
                  access to protect your personal data. However, no method of transmission over the internet is 100% secure,
                  and we cannot guarantee absolute security.
                </p>
              </PolicySection>

              <PolicySection title="6. Data Retention">
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy,
                  comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your
                  data at any time by contacting us.
                </p>
              </PolicySection>

              <PolicySection title="7. Your Rights">
                <p>You have the right to:</p>
                <ul>
                  <li>Access the personal data we hold about you.</li>
                  <li>Request correction of inaccurate data.</li>
                  <li>Request deletion of your personal data.</li>
                  <li>Opt-out of marketing communications at any time.</li>
                  <li>Lodge a complaint with a supervisory authority.</li>
                </ul>
              </PolicySection>

              <PolicySection title="8. Third-Party Links">
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices
                  or content of those sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </PolicySection>

              <PolicySection title="9. Changes to This Policy">
                <p>
                  We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with
                  an updated revision date. We encourage you to review this policy periodically.
                </p>
              </PolicySection>

              <PolicySection title="10. Contact Us">
                <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
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
                <Link href="/terms-of-service" className="btn-outline-luxury text-sm">Terms of Service →</Link>
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
