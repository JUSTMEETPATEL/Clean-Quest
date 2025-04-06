"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("monthly")

  return (
    <div className="min-h-screen bg-[#EEF5DB]/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <h1 className="font-poppins text-3xl font-bold text-[#1E293B] md:text-4xl">NGO Leaderboard</h1>

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="allTime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <LeaderboardTable timeframe={timeframe} />
          </div>

          <div className="mt-8 rounded-2xl bg-[#00C896]/10 p-6 shadow-lg">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="font-poppins text-xl font-bold text-[#1E293B]">Are you an NGO?</h2>
                <p className="mt-2 text-[#1E293B]/80">
                  Join CleanQuest and start making a real impact in your community.
                </p>
              </div>
              <Button className="bg-[#00C896] text-white hover:bg-[#00C896]/90">Register Your NGO</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

