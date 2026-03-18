import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { FeaturedJerseys } from "@/components/featured-jerseys"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturedJerseys />
      <Footer />
    </main>
  )
}
