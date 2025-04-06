import { Camera, CheckCircle } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-poppins text-center text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-lg transition-transform hover:scale-105">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-poppins mt-6 text-xl font-bold text-card-foreground">Upload a garbage site</h3>
            <p className="mt-4 text-muted-foreground">
              Take a photo of a waste site in your area and upload it to our platform.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-lg transition-transform hover:scale-105">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
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
                className="h-8 w-8 text-primary"
              >
                <path d="M3 5v14"></path>
                <path d="M21 12H7"></path>
                <path d="m15 18 6-6-6-6"></path>
              </svg>
            </div>
            <h3 className="font-poppins mt-6 text-xl font-bold text-card-foreground">NGO cleans it</h3>
            <p className="mt-4 text-muted-foreground">
              Local NGOs are notified and take action to clean up the reported site.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-lg transition-transform hover:scale-105">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-poppins mt-6 text-xl font-bold text-card-foreground">AI verifies cleanup</h3>
            <p className="mt-4 text-muted-foreground">
              Our AI technology evaluates the before and after photos to verify the cleanup.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

