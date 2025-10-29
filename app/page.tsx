import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CategoryHighlights } from "@/components/landing/CategoryHighlights";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <HowItWorks />
        <CategoryHighlights />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
