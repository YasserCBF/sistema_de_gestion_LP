"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface DashboardLayoutProps {
  children: ReactNode
  role: "docente" | "admin-bienes" | "admin-biblioteca"
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (tab: string) => void
}

const roleLabels = {
  docente: "Docente",
  "admin-bienes": "Administrador de Bienes",
  "admin-biblioteca": "Administrador de Biblioteca",
}

const roleBackgroundClass = {
  docente: "role-background-docente",
  "admin-bienes": "role-background-bienes",
  "admin-biblioteca": "role-background-biblioteca",
}

const roleColors = {
  docente: "text-docente-foreground",
  "admin-bienes": "text-bienes-foreground",
  "admin-biblioteca": "text-biblioteca-foreground",
}

const roleHeaderBg = {
  docente: "bg-gradient-to-r from-docente-primary via-docente-accent to-docente-primary",
  "admin-bienes": "bg-gradient-to-r from-bienes-primary via-bienes-accent to-bienes-primary",
  "admin-biblioteca": "bg-gradient-to-r from-biblioteca-primary via-biblioteca-accent to-biblioteca-primary",
}

const roleSidebarBg = {
  docente: "bg-docente-light border-docente-primary/30",
  "admin-bienes": "bg-bienes-light border-bienes-primary/30",
  "admin-biblioteca": "bg-biblioteca-light border-biblioteca-primary/30",
}

export default function DashboardLayout({ children, role, tabs, activeTab, onTabChange }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={`flex h-screen flex-col md:flex-row ${roleBackgroundClass[role]} relative`}>
      <div className="absolute inset-0 z-0 pointer-events-none" />

      <div
        className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 ${roleSidebarBg[role]} border-r-2 transition-all duration-300 overflow-y-auto flex flex-col shadow-xl md:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className={`p-4 sm:p-6 ${roleHeaderBg[role]} text-white shadow-lg rounded-b-lg`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg bg-white/20 p-1">
              <Image
                src="/images/design-mode/descarga-removebg-preview.png"
                alt="GUE Badge"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white drop-shadow-sm">GestioLibros</h2>
              <p className="text-white/90 text-xs sm:text-xs font-medium">GUE</p>
            </div>
          </div>
          <p className="text-white/85 text-xs sm:text-sm font-medium">{roleLabels[role]}</p>
        </div>

        <nav className="flex-1 p-3 sm:p-4">{/* Navigation items will be added here based on role */}</nav>

        <div className={`p-3 sm:p-4 border-t-2 border-current/20 ${roleColors[role]}`}>
          <div className="mb-4 text-xs sm:text-sm bg-white/30 rounded-lg p-3">
            <p className={`${roleColors[role]} opacity-80 text-xs`}>Conectado como:</p>
            <p className={`${roleColors[role]} font-bold truncate text-sm`}>{user?.name || "Usuario"}</p>
          </div>
          <Button
            variant="outline"
            className={`w-full justify-start text-xs sm:text-sm font-medium ${roleColors[role]} hover:bg-black/5 border-current/30`}
            onClick={() => {
              logout()
              setSidebarOpen(false)
            }}
          >
            <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col w-full relative z-10">
        <header
          className={`border-b-2 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between ${roleHeaderBg[role]} text-white shadow-xl`}
        >
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/20 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h1 className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg">{roleLabels[role]}</h1>
          <div className="w-10 md:w-12" />
        </header>

        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b-2 bg-white/95 shadow-sm overflow-x-auto">
          <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            <TabsList className="w-full justify-start bg-white">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="text-xs sm:text-sm font-medium px-4 py-2 transition-all"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-3 sm:p-6 bg-white/98">{children}</div>
        </div>
      </main>
    </div>
  )
}
