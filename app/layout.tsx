import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Legal Document Generator | Global Legal Documents",
  description:
    "Create customized legal documents globally. NDAs, contracts, privacy policies, and more. AI-powered, jurisdiction-aware, trusted by thousands.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon/favicon-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/favicon-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/docgen-ai-logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "//favicon/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
