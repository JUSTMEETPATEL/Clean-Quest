"use client"

import { useEffect, useState } from "react"

interface ProgressRingProps {
  progress: number
  size: number
  strokeWidth: number
  color: string
}

export function ProgressRing({ progress, size, strokeWidth, color }: ProgressRingProps) {
  const [offset, setOffset] = useState(0)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference
    setOffset(progressOffset)
  }, [progress, circumference])

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} stroke="#E5E7EB" fill="transparent" />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      <div className="absolute flex items-center justify-center">
        <span className="text-xl font-bold">{progress}%</span>
      </div>
    </div>
  )
}

