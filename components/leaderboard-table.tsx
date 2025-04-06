"use client"

import { Button } from "@/components/ui/button"
import { Award, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface LeaderboardTableProps {
  timeframe?: "monthly" | "allTime"
}

export function LeaderboardTable({ timeframe = "monthly" }: LeaderboardTableProps) {
  // Mock data for the leaderboard
  const ngos = [
    {
      id: "eco-clean",
      rank: 1,
      name: "EcoClean Foundation",
      logo: "/placeholder.svg?height=100&width=100",
      points: 3850,
      cleanups: 156,
      city: "New York, NY",
      verified: true,
    },
    {
      id: "green-earth",
      rank: 2,
      name: "Green Earth Initiative",
      logo: "/placeholder.svg?height=100&width=100",
      points: 3240,
      cleanups: 132,
      city: "Los Angeles, CA",
      verified: true,
    },
    {
      id: "clean-waters",
      rank: 3,
      name: "Clean Waters Project",
      logo: "/placeholder.svg?height=100&width=100",
      points: 2980,
      cleanups: 118,
      city: "Seattle, WA",
      verified: true,
    },
    {
      id: "urban-cleanup",
      rank: 4,
      name: "Urban Cleanup Crew",
      logo: "/placeholder.svg?height=100&width=100",
      points: 2450,
      cleanups: 98,
      city: "Chicago, IL",
      verified: false,
    },
    {
      id: "eco-warriors",
      rank: 5,
      name: "Eco Warriors",
      logo: "/placeholder.svg?height=100&width=100",
      points: 2120,
      cleanups: 87,
      city: "Austin, TX",
      verified: true,
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-medium text-[#1E293B]/70">Rank</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#1E293B]/70">NGO</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#1E293B]/70">Points</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#1E293B]/70">Cleanups</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#1E293B]/70">City</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-[#1E293B]/70">Action</th>
          </tr>
        </thead>
        <tbody>
          {ngos.map((ngo) => (
            <tr key={ngo.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-4">
                <div className="flex items-center">
                  {ngo.rank <= 3 ? (
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#FFB703]">
                      <Award className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                      {ngo.rank}
                    </span>
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                <div className="flex items-center">
                  <div className="relative mr-3 h-8 w-8 overflow-hidden rounded-full">
                    <Image src={ngo.logo || "/placeholder.svg"} alt={ngo.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Link href={`/ngo/${ngo.id}`} className="font-medium text-[#1E293B] hover:text-[#00C896]">
                        {ngo.name}
                      </Link>
                      {ngo.verified && <CheckCircle className="ml-1 h-4 w-4 text-[#00C896]" />}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-[#1E293B]">{ngo.points.toLocaleString()}</td>
              <td className="whitespace-nowrap px-4 py-4 text-[#1E293B]">{ngo.cleanups}</td>
              <td className="whitespace-nowrap px-4 py-4 text-[#1E293B]">{ngo.city}</td>
              <td className="whitespace-nowrap px-4 py-4 text-right">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-[#FFB703] text-[#FFB703] hover:bg-[#FFB703]/10"
                >
                  <Link href={`/ngo/${ngo.id}`}>Donate</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

