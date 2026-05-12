import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProblemSolution } from "@/components/problem-solution"
import { HowItWorks } from "@/components/how-it-works"
import { DocumentTypes } from "@/components/document-types"
import { Benefits } from "@/components/benefits"
import { TrustSection } from "@/components/trust-section"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import {Download} from "@/components/download"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <DocumentTypes />
      <Benefits />
      <TrustSection />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Download/>
      <Footer />
    </div>
  )
}
