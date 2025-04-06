"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ImageUploader from "@/components/ImageUploader"
import LocationPicker from "@/components/LocationPicker"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ReportWastePage() {
  const [image, setImage] = useState<File | null>(null)
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      setError("Please upload an image of the waste site")
      return
    }

    if (!location) {
      setError("Please select a location")
      return
    }

    setError(null)
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessModal(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-poppins mb-8 text-center text-3xl font-bold text-foreground md:text-4xl">
            Report a Waste Site
          </h1>

          <div className="rounded-2xl bg-card p-6 shadow-lg md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h2 className="font-poppins mb-4 text-xl font-semibold text-card-foreground">Upload Image</h2>
                  <ImageUploader onImageSelected={setImage} selectedImage={image} />
                </div>

                <div>
                  <h2 className="font-poppins mb-4 text-xl font-semibold text-card-foreground">Location</h2>
                  <LocationPicker onLocationSelected={setLocation} />
                </div>

                <div>
                  <h2 className="font-poppins mb-4 text-xl font-semibold text-card-foreground">
                    Description (Optional)
                  </h2>
                  <Textarea
                    placeholder="Provide additional details about the waste site..."
                    className="min-h-[120px] resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {error && <div className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</div>}

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Report Submitted!</DialogTitle>
            <DialogDescription className="text-center">
              <div className="mt-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <p className="mt-4">Thank you for your report! We'll alert nearby NGOs about this waste site.</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/">Return to Home</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

