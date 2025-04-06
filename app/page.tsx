import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Hero from "@/components/Hero"
import HowItWorks from "@/components/HowItWorks"
import TopNGOs from "@/components/TopNGOs"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">

      <Hero />
      <HowItWorks />
      <TopNGOs />

      {/* CTA Section */}
      <section className="bg-muted py-16 dark:bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-card p-8 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-poppins text-2xl font-bold text-card-foreground md:text-3xl">
                Ready to make a difference?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join thousands of citizens and NGOs working together to create cleaner communities.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/report">
                    Report a Waste Site <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard/ngo">NGO Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

