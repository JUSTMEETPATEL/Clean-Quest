"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function TopNGOCarousel() {
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
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-[#00C896] bg-white text-[#00C896] hover:bg-[#00C896]/10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-[#00C896] bg-white text-[#00C896] hover:bg-[#00C896]/10"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

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
                    <h3 className="text-center font-medium text-[#1E293B]">{ngo.name}</h3>
                    {ngo.verified && <CheckCircle className="h-4 w-4 text-[#00C896]" />}
                  </div>
                  <div className="mt-2 flex items-center gap-1 rounded-full bg-[#EEF5DB] px-3 py-1">
                    <span className="text-sm font-semibold text-[#00C896]">{ngo.points.toLocaleString()} points</span>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

