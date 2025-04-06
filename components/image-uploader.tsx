"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploaderProps {
  onImageSelected: (file: File | null) => void
  selectedImage: File | null
}

export function ImageUploader({ onImageSelected, selectedImage }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file: File): boolean => {
    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP file")
      return false
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      setError("File size must be less than 5MB")
      return false
    }

    setError(null)
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      handleFile(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onImageSelected(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      onImageSelected(null)
      setPreviewUrl(null)
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const handleRemove = () => {
    onImageSelected(null)
    setPreviewUrl(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="w-full">
      {!previewUrl ? (
        <div
          className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-colors ${
            dragActive
              ? "border-[#00C896] bg-[#00C896]/10"
              : "border-gray-300 hover:border-[#00C896]/50 hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <input ref={inputRef} type="file" className="hidden" accept=".jpg,.jpeg,.png,.webp" onChange={handleChange} />

          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF5DB]">
              <Upload className="h-6 w-6 text-[#00C896]" />
            </div>
            <p className="mb-2 text-sm font-medium text-[#1E293B]">
              <span className="font-semibold text-[#00C896]">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-[#1E293B]/60">JPG, PNG or WEBP (max. 5MB)</p>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200">
          <div className="relative aspect-video w-full">
            <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 text-[#1E293B] hover:bg-white"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

