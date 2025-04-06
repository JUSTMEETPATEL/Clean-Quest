"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import LeaderboardTable from "@/components/LeaderboardTable"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("monthly")

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-4 flex items-center">
                <div className="relative h-8 w-8">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      className="stroke-primary"
                      strokeWidth="2"
                    />
                    <path
                      d="M7.5 12.5L10.5 15.5L16.5 9.5"
                      className="stroke-primary"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-poppins ml-2 text-xl font-bold text-foreground">CleanQuest</span>
              </Link>
              <h1 className="font-poppins text-2xl font-bold text-foreground md:text-3xl">NGO Leaderboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
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
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-lg md:p-8">
            <LeaderboardTable timeframe={timeframe} />
          </div>

          <div className="mt-8 rounded-2xl bg-primary/10 p-6 shadow-lg dark:bg-primary/5">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="font-poppins text-xl font-bold text-foreground">Are you an NGO?</h2>
                <p className="mt-2 text-muted-foreground">
                  Join CleanQuest and start making a real impact in your community.
                </p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Register Your NGO</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

