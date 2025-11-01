"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import DashboardLayout from "@/components/dashboard-layout"
import SolicitudBienView from "@/components/solicitud-bien-view"
import SolicitudLibroView from "@/components/solicitud-libro-view"
import HistorialSolicitudesView from "@/components/historial-solicitudes-view"

type Tab = "solicitar-bien" | "solicitar-libro" | "historial"

export default function DocentePage() {
  const [activeTab, setActiveTab] = useState<Tab>("historial")

  return (
    <AuthGuard requiredRole="docente">
      <DashboardLayout
        role="docente"
        tabs={[
          { id: "historial", label: "Mis Solicitudes" },
          { id: "solicitar-bien", label: "Solicitar Bien" },
          { id: "solicitar-libro", label: "Solicitar Préstamo" },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as Tab)}
      >
        {activeTab === "historial" && <HistorialSolicitudesView />}
        {activeTab === "solicitar-bien" && <SolicitudBienView />}
        {activeTab === "solicitar-libro" && <SolicitudLibroView />}
      </DashboardLayout>
    </AuthGuard>
  )
}
