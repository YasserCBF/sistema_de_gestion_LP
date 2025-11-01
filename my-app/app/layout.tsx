import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Geist_Mono, Assistant as V0_Font_Assistant, Geist_Mono as V0_Font_Geist_Mono, Abril_Fatface as V0_Font_Abril_Fatface } from 'next/font/google'

// Initialize fonts
const _assistant = V0_Font_Assistant({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _abrilFatface = V0_Font_Abril_Fatface({ subsets: ['latin'], weight: ["400"] })

export const metadata: Metadata = {
  title: "Gestión de Libros y Bienes",
  description: "Sistema de administración de inventario educativo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
