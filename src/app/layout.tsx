import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'
import AmplifyProvider from '@/lib/amplify'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quote Generator',
  description: 'Project to learn AWS Amplify and AWS Cognito with a Quote Generator',
  viewport: 'width=device-width, initial-scale=1'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AmplifyProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </AmplifyProvider>
      </body>
    </html>
  )
}
