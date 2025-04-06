"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin, Calendar, Upload, CheckCircle } from "lucide-react"
import Image from "next/image"
import { ImageUploader } from "@/components/image-uploader"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import Link from "next/link"

interface TaskProps {
  task: {
    id: string
    image: string
    location: string
    latitude: number
    longitude: number
    daysAgo: number
    status: "available" | "assigned" | "completed"
    afterImage?: string
    score?: number
  }
  onAccept?: () => void
  onUpload?: () => void
}

export function TaskCard({ task, onAccept, onUpload }: TaskProps) {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAccept = () => {
    if (onAccept) {
      onAccept()
    }
  }

  const handleUploadClick = () => {
    setShowUploadModal(true)
  }

  const handleSubmitUpload = () => {
    if (!uploadedImage) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowUploadModal(false)
      if (onUpload) {
        onUpload()
      }
    }, 1500)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative aspect-video w-full">
          <Image
            src={task.image || "/placeholder.svg"}
            alt={`Waste site at ${task.location}`}
            fill
            className="object-cover"
          />
          {task.status === "completed" && (
            <div className="absolute right-2 top-2 rounded-full bg-[#00C896] p-1">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1 text-sm text-[#1E293B]/70">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{task.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#1E293B]/60">
              <Calendar className="h-3 w-3" />
              <span>
                {task.daysAgo} {task.daysAgo === 1 ? "day" : "days"} ago
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {task.status === "completed" && task.score !== undefined && (
            <div className="mb-4 flex items-center justify-between rounded-lg bg-[#EEF5DB] p-3">
              <span className="text-sm font-medium">Cleanup Score</span>
              <span className="font-semibold text-[#00C896]">{task.score}%</span>
            </div>
          )}

          <div className="h-24 rounded-md bg-[#EEF5DB] p-3">
            <div className="flex h-full items-center justify-center">
              <a
                href={`https://maps.google.com/?q=${task.latitude},${task.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#00C896] hover:underline"
              >
                <MapPin className="h-4 w-4" />
                View on Map
              </a>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          {task.status === "available" && (
            <Button className="w-full bg-[#00C896] text-white hover:bg-[#00C896]/90" onClick={handleAccept}>
              Accept Task
            </Button>
          )}

          {task.status === "assigned" && (
            <Button className="w-full bg-[#FFB703] text-white hover:bg-[#FFB703]/90" onClick={handleUploadClick}>
              <Upload className="mr-2 h-4 w-4" /> Upload After Image
            </Button>
          )}

          {task.status === "completed" && (
            <Button asChild variant="outline" className="w-full border-[#00C896] text-[#00C896] hover:bg-[#00C896]/10">
              <Link href={`/results/${task.id}`}>View Results</Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload After Cleanup Image</DialogTitle>
            <DialogDescription>Upload a photo of the site after your cleanup efforts.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ImageUploader onImageSelected={setUploadedImage} selectedImage={uploadedImage} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#00C896] text-white hover:bg-[#00C896]/90"
              disabled={!uploadedImage || isSubmitting}
              onClick={handleSubmitUpload}
            >
              {isSubmitting ? "Uploading..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

