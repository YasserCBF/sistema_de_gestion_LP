"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Clock } from "lucide-react"

interface SolicitudBien {
  id: number
  docente: string
  bien: string
  cantidad: number
  motivo: string
  estado: "pendiente" | "aprobada" | "rechazada"
  fechaSolicitud: string
}

export default function BienesRequestsView() {
  const [solicitudes, setSolicitudes] = useState<SolicitudBien[]>([
    {
      id: 1,
      docente: "Juan Pérez",
      bien: "Proyector",
      cantidad: 1,
      motivo: "Clase de presentaciones",
      estado: "pendiente",
      fechaSolicitud: "2024-10-25",
    },
    {
      id: 2,
      docente: "María García",
      bien: "Microscopio",
      cantidad: 5,
      motivo: "Práctica de laboratorio",
      estado: "pendiente",
      fechaSolicitud: "2024-10-24",
    },
    {
      id: 3,
      docente: "Carlos López",
      bien: "Escritorio",
      cantidad: 3,
      motivo: "Adecuación de aula",
      estado: "aprobada",
      fechaSolicitud: "2024-10-20",
    },
  ])

  const handleApprove = (id: number) => {
    setSolicitudes(solicitudes.map((s) => (s.id === id ? { ...s, estado: "aprobada" as const } : s)))
  }

  const handleReject = (id: number) => {
    setSolicitudes(solicitudes.map((s) => (s.id === id ? { ...s, estado: "rechazada" as const } : s)))
  }

  const getStatusBadge = (estado: SolicitudBien["estado"]) => {
    switch (estado) {
      case "pendiente":
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "aprobada":
        return (
          <Badge className="bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Aprobada
          </Badge>
        )
      case "rechazada":
        return (
          <Badge variant="destructive">
            <X className="w-3 h-3 mr-1" />
            Rechazada
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Solicitudes de Uso de Bienes</CardTitle>
          <CardDescription>Revisa y aprueba solicitudes de uso de activos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>Docente</TableHead>
                  <TableHead>Bien</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solicitudes.map((solicitud) => (
                  <TableRow key={solicitud.id}>
                    <TableCell className="font-medium">{solicitud.docente}</TableCell>
                    <TableCell>{solicitud.bien}</TableCell>
                    <TableCell className="text-center">{solicitud.cantidad}</TableCell>
                    <TableCell className="text-sm">{solicitud.motivo}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(solicitud.estado)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      {solicitud.estado === "pendiente" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:text-green-700 bg-transparent"
                            onClick={() => handleApprove(solicitud.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive bg-transparent"
                            onClick={() => handleReject(solicitud.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
