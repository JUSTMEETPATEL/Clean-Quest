import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, CheckCircle } from "lucide-react"
import Link from "next/link"
import { TopNGOCarousel } from "@/components/top-ngo-carousel"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#00C896]/10 to-[#EEF5DB] py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-poppins text-4xl font-bold tracking-tight text-[#1E293B] md:text-6xl">
              Turn Waste into Impact.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-[#1E293B]/80 md:text-xl">
              Upload waste site photos. Let NGOs clean. Track real-time results powered by AI.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-[#00C896] px-8 text-white hover:bg-[#00C896]/90">
                <Link href="/report">
                  Report a Site <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#00C896] px-8 text-[#00C896] hover:bg-[#00C896]/10"
              >
                <Link href="/leaderboard">Explore Leaderboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-poppins text-center text-3xl font-bold text-[#1E293B] md:text-4xl">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center rounded-2xl bg-[#EEF5DB] p-6 text-center shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00C896]">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-poppins mt-6 text-xl font-bold text-[#1E293B]">Upload a garbage site</h3>
              <p className="mt-4 text-[#1E293B]/80">
                Take a photo of a waste site in your area and upload it to our platform.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center rounded-2xl bg-[#EEF5DB] p-6 text-center shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00C896]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-white"
                >
                  <path d="M3 5v14"></path>
                  <path d="M21 12H7"></path>
                  <path d="m15 18 6-6-6-6"></path>
                </svg>
              </div>
              <h3 className="font-poppins mt-6 text-xl font-bold text-[#1E293B]">NGO cleans it</h3>
              <p className="mt-4 text-[#1E293B]/80">
                Local NGOs are notified and take action to clean up the reported site.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center rounded-2xl bg-[#EEF5DB] p-6 text-center shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00C896]">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-poppins mt-6 text-xl font-bold text-[#1E293B]">AI verifies cleanup</h3>
              <p className="mt-4 text-[#1E293B]/80">
                Our AI technology evaluates the before and after photos to verify the cleanup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top NGOs Section */}
      <section className="bg-[#EEF5DB]/50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <h2 className="font-poppins text-3xl font-bold text-[#1E293B] md:text-4xl">Top NGOs</h2>
            <Button asChild variant="ghost" className="text-[#00C896] hover:bg-[#00C896]/10 hover:text-[#00C896]">
              <Link href="/leaderboard">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8">
            <TopNGOCarousel />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

