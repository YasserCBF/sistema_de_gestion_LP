import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

import { Geist, Geist_Mono } from "next/font/google"

// Initialize fonts
const _geistSans = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

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
      <body className={`${_geistSans.className} antialiased`}>{children}</body>
    </html>
  )
}
