'use client'
import { GenerateQuoteButton, GenerateQuoteButtonText } from "./QuoteGeneratorElements";

export default function GenerateQuote({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <GenerateQuoteButton onClick={() => { }}>
            <GenerateQuoteButtonText>
                {children}
            </GenerateQuoteButtonText>
        </GenerateQuoteButton>);
}
