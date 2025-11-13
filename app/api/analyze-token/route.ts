import { type NextRequest, NextResponse } from "next/server"
import { CryptoAgent, type TokenData } from "@/lib/crypto-agent"

export async function POST(request: NextRequest) {
  try {
    const { tokenData } = await request.json()

    if (!tokenData) {
      return NextResponse.json({ error: "Token data missing" }, { status: 400 })
    }

    const agent = new CryptoAgent()
    agent.update(tokenData as TokenData)
    const result = agent.respond()

    return NextResponse.json({
      evaluation: result.evaluation,
      score: result.score,
      data: result.data,
      matchedGood: result.matchedGood,
      matchedBad: result.matchedBad,
      recommendation: result.recommendation,
    })
  } catch (error) {
    console.error("[v0] Agent error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
