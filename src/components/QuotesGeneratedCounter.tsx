'use client'

import { useState } from "react"

export default function QuotesGeneratedCounter() {
    const [numberOfQuotes, setNumberOfQuotes] = useState<number | null>(0)
    return <>
        Quotes Generated {numberOfQuotes}
    </>
}