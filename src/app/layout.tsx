import type { Metadata } from 'next'
import { DM_Sans, Lora } from 'next/font/google'

import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Loren.thinks — notes on the AI shift',
    template: '%s · Loren.thinks',
  },
  description:
    'A technology executive writing honestly about how AI is rewriting business, life, and society — with a public scoreboard of predictions vs. reality.',
  metadataBase: new URL('https://loren.thinks'),
  openGraph: {
    title: 'Loren.thinks — notes on the AI shift',
    description:
      'Honest notes on the AI shift, graded in public, written from the deployment side.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lora.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
