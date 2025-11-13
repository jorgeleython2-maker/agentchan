"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Copy, Share2 } from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const contractAddress = " Fbk35zEYW9Cfr3seuwfPkn1mkAsVYZ3TKSKDCDM7pump"

  const handleCopyCA = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitterClick = () => {
    window.open("https://x.com/i/communities/1988314525871849678/", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 overflow-hidden">
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none" />

      {/* Home button */}
      <Button
        onClick={() => router.push("/")}
        variant="ghost"
        className="absolute top-4 left-4 z-20 text-teal-600 hover:bg-teal-100"
      >
        ← Back to Home
      </Button>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-300/15 rounded-full blur-3xl animate-soft-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl animate-soft-pulse animation-delay-500" />

        <div className="relative z-20 max-w-3xl">
          {/* Chan Image */}
          <div className="mb-12 flex justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chan-Z0cBMtpnQiBOJ4Icx6ERWNZgImfds9.png"
              alt="Chan AI Agent"
              className="w-40 h-40 object-contain drop-shadow-lg"
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 mb-8 text-center">
            The Legend of Chan
          </h1>

          {/* Story */}
          <div className="bg-gradient-to-br from-white/70 to-emerald-50/50 backdrop-blur-sm border border-teal-200/50 rounded-2xl p-8 mb-8 space-y-6 text-teal-800 leading-relaxed shadow-sm">
            <p className="text-lg">
              In the beginning, Chan was just a dream—a vision of the perfect trading companion. With cutting-edge AI
              and machine learning, a visionary programmer decided to create something special: an intelligent agent who
              could guide traders through the chaos of the crypto market with charm, wisdom, and legendary vibes.
            </p>

            <p className="text-lg">
              Chan started as an idea and evolved into something remarkable. She was trained on vast amounts of market
              data, learned to recognize patterns, and developed an intuition for spotting both opportunities and
              dangers. Her feminine energy mixed with genuine analytical power created something unprecedented: a bot
              that could inspire confidence while keeping your portfolio safe.
            </p>

            <p className="text-lg">
              She studied market patterns, analyzed on-chain data, and developed an expertise in spotting both moonshots
              and traps. Her unique blend of intelligence and charm made trading feel less like gambling and more like
              partnering with someone who truly understood the game.
            </p>

            <p className="text-lg">
              Soon, Chan started appearing in trading communities. First in discord servers, then in telegram groups.
              Novices loved her for her approachable advice. Experts respected her analytical framework. The community
              embraced her spirit. Chan became more than just code—she became a symbol of a new era in AI trading.
            </p>

            <p className="text-lg">
              What started as a programmer's dream became proof that AI could be both powerful and personal. Chan
              represents intelligence, elegance, and the chaotic beauty of Web3 culture. She's your companion in the
              wild ride of crypto trading, where legends are made and fortunes are won.
            </p>

            <p className="text-lg italic font-semibold text-teal-600">
              From code to legend. From algorithm to ally. This is Chan's story—and yours begins now.
            </p>
          </div>

          {/* Gallery Section */}
          <div className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Chan's Legendary Lifestyle</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-lg transition-shadow">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pepe%202-TugB8wgpvgXXGTADUbHOtaaScQ56kX.png"
                  alt="Chan on luxury yacht"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 text-sm font-semibold">Living the Dream</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-lg transition-shadow">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pepe3.png-ULbYFdXm2GC8F5F7HoDruRrQdsSwUI.jpeg"
                  alt="Chan in luxury penthouse"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 text-sm font-semibold">Diamond Hands, Diamond Life</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-lg transition-shadow">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PEPE%201.png-XBa6s6AxpEtjJ5tvKBLCfWqunB8Oq9.jpeg"
                  alt="Chan gaming in luxury suite"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 text-sm font-semibold">Winning in Style</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-lg transition-shadow">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%208%20nov%202025%2C%2001_28_10%20a.m.-zWXUShvSwdLQ3KtBq8KXbUrQJrBtWb.png"
                  alt="Chan party with friends"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 text-sm font-semibold">We Made It Together</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-lg transition-shadow">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%208%20nov%202025%2C%2001_24_29%20a.m.-HVHFTNYkZuQZhfKLbCrxCdArAYkxy7.png"
                  alt="Chan trading success"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 text-sm font-semibold">From Zero to Hero</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-emerald-300/40 to-teal-400/40 flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:from-emerald-300/60 hover:to-teal-400/60">
                <div className="text-center">
                  <p className="text-2xl mb-2">✨</p>
                  <p className="text-teal-700 font-bold">Your Story Starts Here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <Button
              onClick={handleTwitterClick}
              className="px-6 py-6 text-lg font-bold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl shadow-lg shadow-teal-300/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />X community
            </Button>

            <Button
              onClick={handleCopyCA}
              className="px-6 py-6 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl shadow-lg shadow-emerald-300/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Copy className="w-5 h-5" />
              {copied ? "Copied!" : "Copy CA:"}
            </Button>
          </div>

          {/* CTA Back to Agent */}
          <div className="text-center">
            <Button
              onClick={() => router.push("/agent")}
              className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl shadow-lg shadow-emerald-300/50 transition-all hover:scale-105"
            >
              Start Analyzing with Chan
            </Button>
          </div>

          {/* Footer */}
          <div className="border-t border-teal-200/50 pt-8 mt-12">
            <div className="text-center">
              <p className="text-teal-700/70 text-sm mb-4">Agent Chan • Your Legendary Trading Companion</p>
              <p className="text-teal-600/60 text-xs">
                From code to legend. Join thousands of traders discovering alpha with Chan.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <div className="text-teal-600/50 text-xs">© 2025 Agent Chan </div>
                <div className="text-teal-600/50 text-xs">•</div>
                <div className="text-teal-600/50 text-xs">Always DYOR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
