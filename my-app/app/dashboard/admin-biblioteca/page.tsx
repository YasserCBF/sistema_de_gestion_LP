"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import DashboardLayout from "@/components/dashboard-layout"
import LibroRegisterView from "@/components/libro-register-view"
import LibrosCategoryView from "@/components/libros-category-view"
import LibrosRequestsView from "@/components/libros-requests-view"

type Tab = "categorias" | "register" | "requests"

export default function AdminBibliotecaPage() {
  const [activeTab, setActiveTab] = useState<Tab>("categorias")

  return (
    <AuthGuard requiredRole="admin-biblioteca">
      <DashboardLayout
        role="admin-biblioteca"
        tabs={[
          { id: "categorias", label: "Biblioteca" },
          { id: "register", label: "Registrar Nuevo Libro" },
          { id: "requests", label: "Aprobar Préstamos" },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as Tab)}
      >
        {activeTab === "categorias" && <LibrosCategoryView />}
        {activeTab === "register" && <LibroRegisterView />}
        {activeTab === "requests" && <LibrosRequestsView />}
      </DashboardLayout>
    </AuthGuard>
  )
}
