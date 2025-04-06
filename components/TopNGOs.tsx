"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function TopNGOs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Mock data for top NGOs
  const topNGOs = [
    {
      id: "eco-clean",
      name: "EcoClean Foundation",
      logo: "/placeholder.svg?height=100&width=100",
      points: 3850,
      verified: true,
    },
    {
      id: "green-earth",
      name: "Green Earth Initiative",
      logo: "/placeholder.svg?height=100&width=100",
      points: 3240,
      verified: true,
    },
    {
      id: "clean-waters",
      name: "Clean Waters Project",
      logo: "/placeholder.svg?height=100&width=100",
      points: 2980,
      verified: true,
    },
    {
      id: "urban-cleanup",
      name: "Urban Cleanup Crew",
      logo: "/placeholder.svg?height=100&width=100",
      points: 2450,
      verified: false,
    },
    {
      id: "eco-warriors",
      name: "Eco Warriors",
      logo: "/placeholder.svg?height=100&width=100",
      points: 2120,
      verified: true,
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = 300

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="bg-muted py-16 dark:bg-muted/20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <h2 className="font-poppins text-3xl font-bold text-foreground md:text-4xl">Top NGOs</h2>
          <Button asChild variant="ghost" className="text-primary hover:bg-primary/10 hover:text-primary">
            <Link href="/leaderboard">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8">
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full border-primary bg-background text-primary hover:bg-primary/10"
              onClick={() => scroll("left")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full border-primary bg-background text-primary hover:bg-primary/10"
              onClick={() => scroll("right")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>

            {/* Carousel */}
            <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide">
              {topNGOs.map((ngo) => (
                <Card key={ngo.id} className="min-w-[240px] flex-shrink-0 transition-transform hover:scale-[1.02]">
                  <CardContent className="p-4">
                    <Link href={`/ngo/${ngo.id}`}>
                      <div className="flex flex-col items-center">
                        <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full">
                          <Image src={ngo.logo || "/placeholder.svg"} alt={ngo.name} fill className="object-cover" />
                        </div>
                        <div className="flex items-center gap-1">
                          <h3 className="text-center font-medium text-card-foreground">{ngo.name}</h3>
                          {ngo.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="mt-2 flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1">
                          <span className="text-sm font-semibold text-accent-foreground">
                            {ngo.points.toLocaleString()} points
                          </span>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

