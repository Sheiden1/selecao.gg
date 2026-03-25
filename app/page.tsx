import { Footer } from "@/components/footer"
import { FeaturedJerseys } from "@/components/featured-jerseys"
import { Hero } from "@/components/hero"
import { HomeFaq } from "@/components/home-faq"
import { HowItWorks } from "@/components/how-it-works"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <HowItWorks />
      <FeaturedJerseys />
      <HomeFaq />
      <Footer />
    </main>
  )
}
