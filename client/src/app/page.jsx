import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CategorySection from "@/components/sections/CategorySection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import QualityProcess from "@/components/sections/QualityProcess";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import Newsletter from "@/components/sections/Newsletter";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main>
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts
        title="Our Signature Harvest"
        subtitle="Hand-selected premium dry fruits, nuts, and organic superfoods sourced directly from the finest farms."
        filter="featured"
        limit={8}
      />

      <WhyChooseUs />

      <QualityProcess />
      <TestimonialsSection />
      <FAQSection />
      <Newsletter />
      <ContactSection />
      <Footer />
    </main>
  );
}
