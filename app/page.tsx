"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 overflow-hidden">
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-300/15 rounded-full blur-3xl animate-soft-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl animate-soft-pulse animation-delay-500" />

        <div className="relative z-20 text-center">
          {/* Chan Image */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chan-Z0cBMtpnQiBOJ4Icx6ERWNZgImfds9.png"
                alt="Chan AI Agent"
                className="w-48 h-48 object-contain drop-shadow-xl animate-float"
              />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 mb-6">
            Agent Chan 
          </h1>

          <p className="text-xl md:text-2xl text-teal-700 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Your legendary AI trading companion. Analyze crypto tokens with precision, wisdom, and legendary vibes.
          </p>

          <div className="flex flex-col gap-4 items-center justify-center">
            <Button
              onClick={() => router.push("/agent")}
              className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl shadow-lg shadow-emerald-300/50 transition-all hover:scale-105"
            >
              Start Talking to Agent Chan
            </Button>

            <Button
              onClick={() => router.push("/about")}
              variant="outline"
              className="px-8 py-6 text-lg font-bold border-2 border-teal-500 text-teal-600 hover:bg-teal-50 rounded-xl hover:shadow-md transition-all"
            >
              Learn Chan's Story
            </Button>
          </div>

          {/* Footer text */}
          <p className="mt-16 text-teal-600/60 text-sm font-light">
            Powered by advanced crypto analysis • Chan Agent of Pump Fun
          </p>
        </div>
      </div>
    </div>
  )
}
