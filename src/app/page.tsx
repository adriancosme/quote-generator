// Components
import { BackgroundImage1, BackgroundImage2, FooterContainer, FooterLink, GradientBackgroundContainer, QuoteGeneratorContainer, QuoteGeneratorInnerContainer, QuoteGeneratorSubtitle, QuoteGeneratorTitle } from "@/components/QuoteGeneratorElements"
import QuotesGeneratedCounter from "@/components/QuotesGeneratedCounter"
// Assets
import Cloud1 from '@/assets/cloud-and-thunder.png'
import Cloud2 from '@/assets/cloudy-weather.png'
import GenerateQuoteButton from "@/components/GenerateQuoteButton"
import QuoteGenerator from "@/components/QuoteGenerator"
export default function Home() {

  return (

    <GradientBackgroundContainer>

      {/* <QuoteGeneratorModal /> */}
      <QuoteGenerator />

      <QuoteGeneratorContainer>
        <QuoteGeneratorInnerContainer>
          <QuoteGeneratorTitle>Daily Inspiration Generator</QuoteGeneratorTitle>
          <QuoteGeneratorSubtitle>Looking for a splash of inspiration? Generate a quote card with a random inspirational quote provided by <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.</QuoteGeneratorSubtitle>
          <GenerateQuoteButton>
            Make a quote!
          </GenerateQuoteButton>
        </QuoteGeneratorInnerContainer>
      </QuoteGeneratorContainer>

      {/* Images */}
      <BackgroundImage1 src={Cloud1} alt="cloud" height={300} />
      <BackgroundImage2 src={Cloud2} alt="cloud" height={300} />
      {/* Footer */}
      <FooterContainer>
        <>
          <QuotesGeneratedCounter  />
          <br />
          Developed by <FooterLink href="https://github.com/adriancosme" target="_blank" rel="noopener noreferrer">@adriancosme</FooterLink>
        </>
      </FooterContainer>
    </GradientBackgroundContainer>
  )
}
