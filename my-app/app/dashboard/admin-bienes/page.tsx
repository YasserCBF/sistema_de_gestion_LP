"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import DashboardLayout from "@/components/dashboard-layout"
import BienesRegisterView from "@/components/bienes-register-view"
import BienesCategoryView from "@/components/bienes-category-view"
import BienesRequestsView from "@/components/bienes-requests-view"
import AdminPendingUsersView from "@/components/admin-pending-users-view"

type Tab = "categorias" | "register" | "requests" | "usuarios"

export default function AdminBienesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("categorias")

  return (
    <AuthGuard requiredRole="admin-bienes">
      <DashboardLayout
        role="admin-bienes"
        tabs={[
          { id: "categorias", label: "Inventario de Bienes" },
          { id: "register", label: "Registrar Nuevo Bien" },
          { id: "requests", label: "Aprobar Solicitudes" },
          { id: "usuarios", label: "Usuarios Pendientes" },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as Tab)}
      >
        {activeTab === "categorias" && <BienesCategoryView />}
        {activeTab === "register" && <BienesRegisterView />}
        {activeTab === "requests" && <BienesRequestsView />}
        {activeTab === "usuarios" && <AdminPendingUsersView />}
      </DashboardLayout>
    </AuthGuard>
  )
}
