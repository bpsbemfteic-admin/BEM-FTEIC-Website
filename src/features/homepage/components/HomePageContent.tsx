import AboutSection from "@/features/homepage/components/AboutSection";
import BirokrasiSection from "@/features/homepage/components/BirokrasiSection";
import BlogSection from "@/features/homepage/components/BlogSection";
import EventSection from "@/features/homepage/components/EventSection";
import HeroSection from "@/features/homepage/components/HeroSection";
import HeroToAboutGradient from "@/features/homepage/components/HeroToAboutGradient";
import LocationSection from "@/features/homepage/components/LocationSection";
import SectionFade from "@/features/homepage/components/SectionFade";
import VisiMisiSection from "@/features/homepage/components/VisiMisiSection";

export default function HomePageContent() {
  return (
    <main className="overflow-x-hidden bg-brand-night">
      <HeroSection />
      <HeroToAboutGradient />
      <AboutSection />
      <SectionFade className="from-brand-deep to-[#F3F3F3]" />
      <VisiMisiSection />
      <SectionFade className="from-brand-cream to-brand-gold-bright" />
      <BirokrasiSection />
      <SectionFade className="from-brand-gold to-[#F3F3F3]" />
      <EventSection />
      <SectionFade className="from-brand-cream to-brand-gold-bright" />
      <BlogSection />
      <SectionFade className="from-brand-gold to-[#F3F3F3]" />
      <LocationSection />
      <SectionFade className="from-brand-cream to-brand-night" />
    </main>
  );
}
