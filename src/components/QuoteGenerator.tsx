"use client"
import { useState } from "react";
import QuoteGeneratorModal from "./QuoteGeneratorModal";

export default function QuoteGenerator() {
    const [processingQuote, setProcessingQuote] = useState<boolean>(false)
    const [quoteReceived, setQuoteReceived] = useState<String | null>(null)
    return <>
        <QuoteGeneratorModal
            processingQuote={processingQuote}
            quoteReceived={quoteReceived}
            setProcessingQuote={setProcessingQuote}
            setQuoteReceived={setQuoteReceived}
        />
    </>
}