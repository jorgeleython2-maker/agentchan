export type TokenData = {
  market_cap_usd?: number
  volume_24h_usd?: number
  liquidity_usd?: number
  holders_count?: number
  burn_percentage?: number
  dev_holds?: number
  engagement_score?: number
  age_hours?: number
  price_change_1h?: number
  scam_alerts?: boolean
  symbol?: string
}

type CriteriaCheck = (data: TokenData) => boolean

interface CriteriaItem {
  name: string
  check: CriteriaCheck
  phrases: string[]
}

interface MatchedCriteria {
  name: string
  value: string
  explanation: string
}

export class CryptoAgent {
  private data: TokenData = {}
  private score = 5
  private evaluation = ""
  private matchedGood: MatchedCriteria[] = []
  private matchedBad: MatchedCriteria[] = []

  private goodCriteria: CriteriaItem[] = [
    {
      name: "Low market cap (<1M) with growth potential",
      check: (d) => (d.market_cap_usd ?? Number.POSITIVE_INFINITY) < 1000000,
      phrases: [
        "Microcap gem alert! Room to 100x if the apes show up.",
        "Tiny cap = big multiplier potential, bro.",
        "Undiscovered alpha — this could moon from nothing.",
      ],
    },
    {
      name: "High 24h volume (>100K) indicating interest",
      check: (d) => (d.volume_24h_usd ?? 0) > 100000,
      phrases: [
        "Volume is POPPING! Real traders in the trenches.",
        "This thing's got legs — people are aping.",
        "High volume = real interest, not just bots.",
      ],
    },
    {
      name: "High liquidity (≥10% of MC)",
      check: (d) => (d.liquidity_usd ?? 0) >= 0.1 * (d.market_cap_usd ?? 0),
      phrases: [
        "Liquidity is THICC — safe to swing trade.",
        "No slippage hell here, bro.",
        "You can actually exit without crying.",
      ],
    },
    {
      name: "Number of holders >500",
      check: (d) => (d.holders_count ?? 0) > 500,
      phrases: [
        "Community spreading like wildfire.",
        "Not just 3 whales — real distribution.",
        "Holders growing = less dump risk.",
      ],
    },
    {
      name: "Burn percentage >20%",
      check: (d) => (d.burn_percentage ?? 0) > 20,
      phrases: [
        "Supply getting TORCHED — deflationary beast mode.",
        "Burn baby burn! Scarcity incoming.",
        "Less tokens = higher price if demand holds.",
      ],
    },
    {
      name: "Dev holds <5%",
      check: (d) => (d.dev_holds ?? 100) < 5,
      phrases: [
        "Devs not holding the bag — low rug risk.",
        "Clean dev wallet — trust level up.",
        "No insider dump incoming (probably).",
      ],
    },
    {
      name: "Social engagement >1000",
      check: (d) => (d.engagement_score ?? 0) > 1000,
      phrases: [
        "Twitter's on fire — memes flying everywhere.",
        "FOMO building in the replies.",
        "Hype train leaving the station!",
      ],
    },
    {
      name: "Age <24h + pumping",
      check: (d) => (d.age_hours ?? 0) < 24 && (d.price_change_1h ?? 0) > 0,
      phrases: [
        "Fresh launch, already green — early momentum!",
        "Just born and already walking.",
        "Newborn with gains? That's alpha.",
      ],
    },
    {
      name: "1h pump >5%",
      check: (d) => (d.price_change_1h ?? 0) > 5,
      phrases: ["Short-term momentum STRONG.", "Chart looking juicy — upward pressure.", "Buyers stepping in hard."],
    },
    {
      name: "No scam flags",
      check: (d) => !(d.scam_alerts ?? true),
      phrases: [
        "Clean scan — no honeypot, no mint authority.",
        "Audit tools say: ✅",
        "No red flags in sight — green light.",
      ],
    },
  ]

  private badCriteria: CriteriaItem[] = [
    {
      name: "High cap, low volume",
      check: (d) => (d.market_cap_usd ?? 0) > 10000000 && (d.volume_24h_usd ?? 0) < 10000,
      phrases: [
        "Overvalued ghost — cap high, volume dead.",
        "Looks pumped already — where's the exit liquidity?",
        "High MC + no volume = trap city.",
      ],
    },
    {
      name: "Volume <10K",
      check: (d) => (d.volume_24h_usd ?? 0) < 10000,
      phrases: ["Volume drier than my ex's texts.", "Nobody's trading — this is a cemetery.", "No action = no future."],
    },
    {
      name: "Liquidity <5% of MC",
      check: (d) => (d.liquidity_usd ?? 0) < 0.05 * (d.market_cap_usd ?? 0),
      phrases: [
        "Liquidity so thin you can see through it.",
        "One whale can nuke this in 2 seconds.",
        "Slippage will eat your gains alive.",
      ],
    },
    {
      name: "Holders <100",
      check: (d) => (d.holders_count ?? 0) < 100,
      phrases: [
        "Like 5 wallets control 90% — whale playground.",
        "Concentration risk maxed.",
        "One dump and it's over.",
      ],
    },
    {
      name: "Burn <10%",
      check: (d) => (d.burn_percentage ?? 0) < 10,
      phrases: ["Supply not shrinking — no scarcity play.", "Infinite inflation vibes.", "No burn = no magic."],
    },
    {
      name: "Dev holds >10%",
      check: (d) => (d.dev_holds ?? 0) > 10,
      phrases: [
        "Dev sitting on a fat bag — rug alarm.",
        "Insiders loaded — when's the dump?",
        "High dev hold = high exit risk.",
      ],
    },
    {
      name: "Engagement <100",
      check: (d) => (d.engagement_score ?? 0) < 100,
      phrases: [
        "Crickets on Twitter — fake hype?",
        "No one's talking — dead narrative.",
        "Zero community = zero future.",
      ],
    },
    {
      name: "Age <1h",
      check: (d) => (d.age_hours ?? 0) < 1,
      phrases: ["Just launched — total wildcard.", "No history = max risk.", "Could be genius or rug in 5 mins."],
    },
    {
      name: "Price dumping",
      check: (d) => (d.price_change_1h ?? 0) < 0,
      phrases: ["Bleeding out — sellers in control.", "Downtrend city — avoid.", "Momentum dead."],
    },
    {
      name: "Scam alerts active",
      check: (d) => d.scam_alerts ?? false,
      phrases: ["SCAM ALERT — honeypot detected.", "Mint authority enabled — RUN.", "Tools screaming: DANGER."],
    },
  ]

  private evaluationsByScore: { [key: number]: string[] } = {
    10: [
      "ABSOLUTE ROCKET FUEL! 1000x INCOMING!",
      "This is the one, bro. Diamond hands only.",
      "I'd mortgage my mom's house for this.",
    ],
    9: [
      "Moon mission confirmed. Strap in.",
      "Top tier gem — low risk, high reward.",
      "This is why we browse Pump.fun at 3 AM.",
    ],
    8: ["Strong contender. Worth a swing.", "Good fundamentals — could 10x easy.", "Add to watchlist, set alerts."],
    7: ["Decent play. Not trash, not lambo.", "Has legs — but don't YOLO.", "Watch for breakout above resistance."],
    6: ["Mid. Could go either way.", "Need more volume to confirm.", "Not rekt yet — but not moon either."],
    5: ["Meh. Flip or dip — 50/50.", "Neutral zone. Wait for signal.", "Too early to call — grab popcorn."],
    4: ["Sketchy. Red flags waving.", "Smells like a rug in disguise.", "High risk — small bag only."],
    3: ["Danger zone. Proceed with caution.", "Multiple red flags — DYOR hard.", "Could get rekt in one whale sell."],
    2: ["Nah bro, hard pass.", "This one's cooked.", "Smells like dev's cousin's wallet."],
    1: ["INSTANT RUG. EXIT LIQUIDITY ONLY.", "Scam written all over it.", "Don't even screenshot this."],
  }

  private recommendationsByScore: { [key: number]: string } = {
    10: "YOLO the rent money. NGMI if you fade.",
    9: "Ape in heavy. This is alpha.",
    8: "Solid entry — take a position.",
    7: "Worth a nibble. Don't FOMO.",
    6: "Wait for confirmation candle.",
    5: "Chill. Observe. Maybe small bag.",
    4: "Tiny bag or skip. Your call.",
    3: "Avoid unless you love adrenaline.",
    2: "Bounce. Hunt better gems.",
    1: "RUN. Don't look back.",
  }

  update(info?: TokenData) {
    if (info) {
      this.data = { ...this.data, ...info }
    }

    this.matchedGood = []
    this.matchedBad = []
    let goodPoints = 0
    let badPoints = 0

    for (const { name, check, phrases } of this.goodCriteria) {
      if (check(this.data)) {
        goodPoints++
        const value = this.getRelevantValue(name)
        const explanation = phrases[Math.floor(Math.random() * phrases.length)]
        this.matchedGood.push({ name, value, explanation })
      }
    }

    for (const { name, check, phrases } of this.badCriteria) {
      if (check(this.data)) {
        badPoints++
        const value = this.getRelevantValue(name)
        const explanation = phrases[Math.floor(Math.random() * phrases.length)]
        this.matchedBad.push({ name, value, explanation })
      }
    }

    this.score = Math.max(1, Math.min(10, 5 + goodPoints - badPoints))
    const evaluations = this.evaluationsByScore[this.score] || this.evaluationsByScore[5]
    this.evaluation = evaluations[Math.floor(Math.random() * evaluations.length)]
  }

  private getRelevantValue(crit: string): string {
    if (crit.toLowerCase().includes("market cap")) {
      const mc = this.data.market_cap_usd ?? 0
      return `$${this.formatCurrency(mc)}`
    }
    if (crit.toLowerCase().includes("volume")) {
      const vol = this.data.volume_24h_usd ?? 0
      return `$${this.formatCurrency(vol)}`
    }
    if (crit.toLowerCase().includes("liquidity")) {
      const liq = this.data.liquidity_usd ?? 0
      const mc = this.data.market_cap_usd ?? 1
      const percent = ((liq / mc) * 100).toFixed(1)
      return `$${this.formatCurrency(liq)} (${percent}%)`
    }
    if (crit.toLowerCase().includes("holders")) {
      return `${this.data.holders_count ?? 0} holders`
    }
    if (crit.toLowerCase().includes("burn")) {
      return `${this.data.burn_percentage ?? 0}%`
    }
    if (crit.toLowerCase().includes("dev holds")) {
      return `${this.data.dev_holds ?? 0}%`
    }
    if (crit.toLowerCase().includes("engagement")) {
      return `${this.data.engagement_score ?? 0} score`
    }
    if (crit.toLowerCase().includes("age")) {
      return `${this.data.age_hours ?? 0}h`
    }
    if (crit.toLowerCase().includes("price change")) {
      return `${(this.data.price_change_1h ?? 0).toFixed(2)}%`
    }
    if (crit.toLowerCase().includes("scam")) {
      return this.data.scam_alerts ? "Yes" : "No"
    }
    return "Data available"
  }

  // Helper method to format currency with K/M suffixes
  private formatCurrency(value: number): string {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toFixed(0)
  }

  respond(): {
    evaluation: string
    score: number
    data: TokenData
    matchedGood: MatchedCriteria[]
    matchedBad: MatchedCriteria[]
    recommendation: string
  } {
    const recommendation = this.recommendationsByScore[this.score] || "DYOR."
    return {
      evaluation: this.evaluation,
      score: this.score,
      data: this.data,
      matchedGood: this.matchedGood,
      matchedBad: this.matchedBad,
      recommendation,
    }
  }
}
