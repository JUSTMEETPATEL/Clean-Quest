"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search } from "lucide-react"

interface LocationPickerProps {
  onLocationSelected: (location: string) => void
}

export function LocationPicker({ onLocationSelected }: LocationPickerProps) {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Mock suggestions - in a real app, this would use Google Maps API
  const mockSuggestions = [
    "123 Main Street, New York, NY",
    "456 Park Avenue, New York, NY",
    "789 Broadway, New York, NY",
    "321 5th Avenue, New York, NY",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.length > 2) {
      // Filter mock suggestions based on input
      const filtered = mockSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion)
    onLocationSelected(suggestion)
    setShowSuggestions(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue) {
      onLocationSelected(inputValue)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter location"
            className="pl-10"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-gray-400"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            <ul className="max-h-60 overflow-auto py-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{suggestion}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      <div className="mt-4 rounded-md bg-[#EEF5DB] p-4">
        <p className="text-sm text-[#1E293B]/70">
          <span className="font-medium">Note:</span> For accurate cleanup verification, please provide the most precise
          location possible.
        </p>
      </div>
    </div>
  )
}

