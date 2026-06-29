import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import QualityProcess from '@/components/sections/QualityProcess';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import Newsletter from '@/components/sections/Newsletter';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main>
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts
        title="Featured Products"
        subtitle="Handpicked selection of our finest premium dry fruits and nuts, loved by thousands of happy customers."
        filter="featured"
        limit={8}
      />
      <WhyChooseUs />
      <FeaturedProducts
        title="Best Sellers"
        subtitle="The products our customers can't get enough of. Tried, tested, and loved by thousands."
        filter="best_seller"
        limit={4}
      />
      <QualityProcess />
      <TestimonialsSection />
      <FAQSection />
      <Newsletter />
      <ContactSection />
      <Footer />
    </main>
  );
}
