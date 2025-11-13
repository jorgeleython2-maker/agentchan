"use client"

import { useState, useEffect } from "react"

interface KimaAgentProps {
  isAnalyzing: boolean
  currentResponse?: string
  messageOpacity?: number
  score?: number
}

export default function KimaAgent({ isAnalyzing, currentResponse, messageOpacity = 1, score = 5 }: KimaAgentProps) {
  const [displayedResponse, setDisplayedResponse] = useState("")
  const [emojis, setEmojis] = useState<Array<{ id: number; text: string; left: number; delay: number }>>([])
  const emojiCounterRef = { current: 0 }

  useEffect(() => {
    if (!isAnalyzing && currentResponse && score !== undefined) {
      const isSuccess = score >= 5
      const emojiList = isSuccess
        ? ["✨", "💖", "🎀", "💅", "🌸", "⭐", "💫", "🦋", "👑", "💝"]
        : ["😭", "💔", "😢", "⚠️", "🔴", "📉", "💀", "🥀", "😤", "🚨"]

      const newEmojis = Array.from({ length: 15 }).map(() => ({
        id: emojiCounterRef.current++,
        text: emojiList[Math.floor(Math.random() * emojiList.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
      }))

      setEmojis(newEmojis)

      const timer = setTimeout(() => setEmojis([]), 3000)
      return () => clearTimeout(timer)
    }
  }, [currentResponse, score, isAnalyzing])

  useEffect(() => {
    if (currentResponse) {
      let index = 0
      const interval = setInterval(() => {
        if (index < currentResponse.length) {
          setDisplayedResponse(currentResponse.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
        }
      }, 20)
      return () => clearInterval(interval)
    } else {
      setDisplayedResponse("")
    }
  }, [currentResponse])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-2 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {emojis.map((emoji) => (
          <div
            key={emoji.id}
            className="fixed text-2xl"
            style={{
              left: `${emoji.left}%`,
              top: "-20px",
              animation: `fall 2.5s ease-in forwards`,
              animationDelay: `${emoji.delay}s`,
            }}
          >
            {emoji.text}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Speech bubble - compact sizing */}
      {(currentResponse || isAnalyzing) && (
        <div
          className={`w-full max-w-xs transition-opacity duration-500 mb-2 flex-shrink-0 ${messageOpacity === 0 ? "opacity-0" : "opacity-100"}`}
        >
          <div className="bg-gradient-to-br from-rose-300/95 to-pink-300/95 rounded-2xl p-4 shadow-lg shadow-pink-400/30 relative border border-pink-300/50">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-pink-300/95" />
            <p className="text-xs font-semibold text-white text-center leading-relaxed min-h-4">
              {displayedResponse || (isAnalyzing ? "Analizando... 💭" : "")}
            </p>
          </div>
        </div>
      )}

      {/* Kima image - fixed proportional size */}
      <div className="w-48 h-48 flex items-center justify-center flex-shrink-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chan-Z0cBMtpnQiBOJ4Icx6ERWNZgImfds9.png"
          alt="Agent Chan"
          className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300"
          style={{
            filter: isAnalyzing
              ? "drop-shadow(0 0 15px rgba(236, 72, 153, 0.8))"
              : "drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))",
          }}
        />
      </div>

      {/* Status indicator - minimal height */}
      <div className="h-6 mt-2 flex-shrink-0">
        {isAnalyzing && (
          <div className="flex items-center gap-1 animate-pulse">
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <span className="text-xs text-pink-400 font-bold uppercase">Chan analizando...</span>
          </div>
        )}
        {!isAnalyzing && currentResponse && (
          <span className="text-xs text-emerald-400 font-bold uppercase">Listo! ✨</span>
        )}
      </div>
    </div>
  )
}
