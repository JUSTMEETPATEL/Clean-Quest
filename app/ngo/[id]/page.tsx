"use client"

import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { ProgressRing } from "@/components/progress-ring"
import { CheckCircle, MapPin, Award, Heart } from "lucide-react"
import Image from "next/image"

// Mock data for the NGO profile
const ngoData = {
  id: "eco-clean",
  name: "EcoClean Foundation",
  logo: "/placeholder.svg?height=200&width=200",
  verified: true,
  location: "New York, NY",
  description:
    "EcoClean Foundation is dedicated to cleaning up urban areas and promoting environmental awareness through community engagement and education.",
  stats: {
    totalTasks: 156,
    cleanedPercentage: 92,
    totalPoints: 3850,
  },
  achievements: [
    { id: 1, name: "Cleanup Champion", icon: "award", description: "Completed 100+ cleanup tasks" },
    { id: 2, name: "Perfect Score", icon: "check-circle", description: "Achieved 100% cleanup score 10 times" },
    { id: 3, name: "Community Hero", icon: "users", description: "Engaged 500+ community members" },
  ],
  gallery: [
    {
      id: 1,
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      location: "Central Park, NY",
    },
    {
      id: 2,
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      location: "Brooklyn Bridge Park, NY",
    },
    {
      id: 3,
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      location: "Hudson River Park, NY",
    },
  ],
}

export default function NGOProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#EEF5DB]/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* NGO Header */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                <Image src={ngoData.logo || "/placeholder.svg"} alt={ngoData.name} width={600} height={400} className="object-cover" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <h1 className="font-poppins text-2xl font-bold text-[#1E293B] md:text-3xl">{ngoData.name}</h1>
                  {ngoData.verified && <CheckCircle className="h-5 w-5 text-[#00C896]" />}
                </div>
                <div className="mt-2 flex items-center justify-center gap-2 text-[#1E293B]/70 md:justify-start">
                  <MapPin className="h-4 w-4" />
                  <span>{ngoData.location}</span>
                </div>
                <p className="mt-4 text-[#1E293B]/80">{ngoData.description}</p>
              </div>

              <Button className="flex items-center gap-2 bg-[#FFB703] text-white hover:bg-[#FFB703]/90">
                <Heart className="h-4 w-4" /> Donate
              </Button>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-lg">
              <h3 className="font-poppins text-lg font-semibold text-[#1E293B]">Total Tasks</h3>
              <p className="mt-2 text-3xl font-bold text-[#00C896]">{ngoData.stats.totalTasks}</p>
            </div>

            <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-lg">
              <h3 className="font-poppins text-lg font-semibold text-[#1E293B]">Cleanup Rate</h3>
              <div className="mt-2">
                <ProgressRing progress={ngoData.stats.cleanedPercentage} size={80} strokeWidth={8} color="#00C896" />
              </div>
            </div>

            <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-lg">
              <h3 className="font-poppins text-lg font-semibold text-[#1E293B]">Impact Points</h3>
              <p className="mt-2 text-3xl font-bold text-[#FFB703]">{ngoData.stats.totalPoints}</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <h2 className="font-poppins mb-6 text-xl font-bold text-[#1E293B]">Achievements</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {ngoData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex flex-col items-center rounded-xl bg-[#EEF5DB] p-4 text-center"
                >
                  <Award className="h-8 w-8 text-[#FFB703]" />
                  <h3 className="font-poppins mt-2 font-semibold text-[#1E293B]">{achievement.name}</h3>
                  <p className="mt-1 text-sm text-[#1E293B]/70">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <h2 className="font-poppins mb-6 text-xl font-bold text-[#1E293B]">Before & After Gallery</h2>
            <div className="space-y-8">
              {ngoData.gallery.map((item) => (
                <div key={item.id} className="space-y-2">
                  <p className="text-sm font-medium text-[#1E293B]/70">
                    <MapPin className="mr-1 inline-block h-4 w-4" />
                    {item.location}
                  </p>
                  <div className="overflow-hidden rounded-xl">
                    <BeforeAfterSlider beforeImage={item.beforeImage} afterImage={item.afterImage} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

