"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { ProgressRing } from "@/components/progress-ring"
import { Share2, Award } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import Link from "next/link"

export default function ResultPage({ params }: { params: { id: string } }) {
  const [showShareModal, setShowShareModal] = useState(false)

  // Mock data for the result
  const result = {
    id: params.id,
    beforeImage: "/placeholder.svg?height=600&width=800",
    afterImage: "/placeholder.svg?height=600&width=800",
    score: 85,
    comment: "Significant cleanup detected. Great job removing most of the waste!",
    pointsGained: 25,
    ngoName: "EcoClean Foundation",
    date: "April 5, 2025",
  }

  return (
    <div className="min-h-screen bg-[#EEF5DB]/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-poppins mb-8 text-center text-3xl font-bold text-[#1E293B] md:text-4xl">
            Cleanup Results
          </h1>

          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            {/* Before-After Slider */}
            <div className="mb-8 overflow-hidden rounded-xl">
              <BeforeAfterSlider beforeImage={result.beforeImage} afterImage={result.afterImage} />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Score */}
              <div className="flex flex-col items-center justify-center">
                <h3 className="font-poppins mb-4 text-lg font-semibold text-[#1E293B]">Cleanup Score</h3>
                <ProgressRing progress={result.score} size={120} strokeWidth={10} color="#00C896" />
              </div>

              {/* AI Comment */}
              <div className="md:col-span-2">
                <h3 className="font-poppins mb-4 text-lg font-semibold text-[#1E293B]">AI Evaluation</h3>
                <div className="rounded-xl bg-[#EEF5DB] p-4">
                  <p className="text-[#1E293B]/80">{result.comment}</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#1E293B]/60">
                      Cleaned by <span className="font-semibold">{result.ngoName}</span>
                    </p>
                    <p className="text-sm text-[#1E293B]/60">{result.date}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[#FFB703]/20 px-4 py-2">
                    <Award className="h-5 w-5 text-[#FFB703]" />
                    <span className="font-semibold text-[#1E293B]">+{result.pointsGained} points</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="border-[#00C896] text-[#00C896] hover:bg-[#00C896]/10"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share Badge on LinkedIn
              </Button>
              <Button asChild className="bg-[#00C896] text-white hover:bg-[#00C896]/90">
                <Link href="/leaderboard">View Leaderboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Badge Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Impact</DialogTitle>
            <DialogDescription>Share your cleanup achievement on LinkedIn and inspire others.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="rounded-xl border border-gray-200 p-4 text-center">
              <div className="mb-4 flex justify-center">
                <Award className="h-12 w-12 text-[#FFB703]" />
              </div>
              <h3 className="font-poppins text-lg font-semibold">Cleanup Champion</h3>
              <p className="mt-2 text-sm text-[#1E293B]/70">
                I helped clean up a waste site with {result.ngoName} and achieved a {result.score}% cleanup score on
                CleanQuest!
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              className="bg-[#0077B5] text-white hover:bg-[#0077B5]/90"
              onClick={() => {
                // In a real app, this would open a LinkedIn share dialog
                window.open(
                  "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(window.location.href),
                  "_blank",
                )
                setShowShareModal(false)
              }}
            >
              Share on LinkedIn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

