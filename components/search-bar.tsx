"use client"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"

interface SearchBarProps {
  onSearch: (ca: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("5TfqNKZbn9AnNtzq8bbkyhKgcPGTfNDc9wNzFrTBpump")
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  const handleSearch = async () => {
    if (!input.trim()) return
    setIsLoading(true)
    try {
      onSearch(input)
      setRecentSearches((prev) => [input, ...prev.slice(0, 4)])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickSearch = (ca: string) => {
    setInput(ca)
    setIsLoading(true)
    try {
      onSearch(ca)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Paste Pump.fun token CA (Mint Address)..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
          <Search className="absolute right-3 top-3 w-5 h-5 text-slate-500" />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-400 text-slate-950 font-semibold rounded-lg hover:from-cyan-400 hover:to-green-300 disabled:opacity-50 transition duration-200 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {recentSearches.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-2">Recent:</p>
          <div className="flex gap-2 flex-wrap">
            {recentSearches.map((ca) => (
              <button
                key={ca}
                onClick={() => handleQuickSearch(ca)}
                className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition"
              >
                {ca.slice(0, 8)}...
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
