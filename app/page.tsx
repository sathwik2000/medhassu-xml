import { FeaturedCourses } from "@/components/featured-courses"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FeatureHighlights } from "@/components/feature-highlights"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturedCourses />
      <FeatureHighlights />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
