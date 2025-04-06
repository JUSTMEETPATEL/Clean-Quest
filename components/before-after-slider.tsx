"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
}

export function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const containerWidth = rect.width

    const position = Math.max(0, Math.min(100, (x / containerWidth) * 100))
    setSliderPosition(position)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const containerWidth = rect.width

    const position = Math.max(0, Math.min(100, (x / containerWidth) * 100))
    setSliderPosition(position)
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {/* After Image (Full) */}
      <div className="relative h-full w-full">
        <Image src={afterImage || "/placeholder.svg"} alt="After cleanup" fill className="object-cover" />
      </div>

      {/* Before Image (Clipped) */}
      <div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
        <Image
          src={beforeImage || "/placeholder.svg"}
          alt="Before cleanup"
          fill
          className="object-cover"
        />
      </div>

      {/* Slider */}
      <div
        className="absolute top-0 z-10 h-full w-1 cursor-ew-resize bg-white"
        style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C896]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white">
        Before
      </div>
      <div className="absolute bottom-4 right-4 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white">
        After
      </div>
    </div>
  )
}

