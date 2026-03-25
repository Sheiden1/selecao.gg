import type { Metadata, Viewport } from "next"
import { Barlow_Condensed, DM_Sans, Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const headingFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
})

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
})

const labelFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-label",
})

export const metadata: Metadata = {
  title: "SELECAO.gg | Camisas de futebol",
  description:
    "Camisas de futebol de clubes e selecoes com apresentacao clara e atendimento direto.",
}

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${labelFont.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
