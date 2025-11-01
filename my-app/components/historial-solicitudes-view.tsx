"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Clock, CheckCircle, XCircle } from "lucide-react"

interface Solicitud {
  id: number
  tipo: "libro" | "bien"
  item: string
  cantidad?: number
  estado: "pendiente" | "aprobada" | "rechazada" | "completada"
  fechaSolicitud: string
  fechaRespuesta?: string
}

export default function HistorialSolicitudesView() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([
    {
      id: 1,
      tipo: "libro",
      item: "Don Quijote",
      estado: "aprobada",
      fechaSolicitud: "2024-10-20",
      fechaRespuesta: "2024-10-21",
    },
    {
      id: 2,
      tipo: "bien",
      item: "Proyector",
      cantidad: 1,
      estado: "pendiente",
      fechaSolicitud: "2024-10-25",
    },
    {
      id: 3,
      tipo: "libro",
      item: "Cien años de soledad",
      estado: "rechazada",
      fechaSolicitud: "2024-10-23",
      fechaRespuesta: "2024-10-24",
    },
    {
      id: 4,
      tipo: "bien",
      item: "Microscopio",
      cantidad: 5,
      estado: "completada",
      fechaSolicitud: "2024-10-15",
      fechaRespuesta: "2024-10-16",
    },
  ])

  const getStatusIcon = (estado: Solicitud["estado"]) => {
    switch (estado) {
      case "pendiente":
        return <Clock className="w-4 h-4" />
      case "aprobada":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rechazada":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "completada":
        return <CheckCircle className="w-4 h-4 text-green-600" />
    }
  }

  const getStatusBadge = (estado: Solicitud["estado"]) => {
    switch (estado) {
      case "pendiente":
        return <Badge variant="outline">Pendiente</Badge>
      case "aprobada":
        return <Badge className="bg-green-100 text-green-800">Aprobada</Badge>
      case "rechazada":
        return <Badge variant="destructive">Rechazada</Badge>
      case "completada":
        return <Badge className="bg-blue-100 text-blue-800">Completada</Badge>
    }
  }

  const handleCancel = (id: number) => {
    const solicitud = solicitudes.find((s) => s.id === id)
    if (solicitud && solicitud.estado === "pendiente") {
      if (confirm("¿Deseas cancelar esta solicitud?")) {
        setSolicitudes(solicitudes.filter((s) => s.id !== id))
      }
    }
  }

  const solicitudesLibros = solicitudes.filter((s) => s.tipo === "libro")
  const solicitudesBienes = solicitudes.filter((s) => s.tipo === "bien")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historial de Solicitudes</CardTitle>
          <CardDescription>Visualiza el estado de tus solicitudes de préstamo y uso de bienes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todas">
            <TabsList>
              <TabsTrigger value="todas">Todas ({solicitudes.length})</TabsTrigger>
              <TabsTrigger value="libros">Libros ({solicitudesLibros.length})</TabsTrigger>
              <TabsTrigger value="bienes">Bienes ({solicitudesBienes.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="todas" className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead>Tipo</TableHead>
                      <TableHead>Ítem</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                      <TableHead>Fecha Solicitud</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {solicitudes.map((solicitud) => (
                      <TableRow key={solicitud.id}>
                        <TableCell>
                          <Badge variant="outline">{solicitud.tipo === "libro" ? "Libro" : "Bien"}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{solicitud.item}</TableCell>
                        <TableCell className="text-center">{solicitud.cantidad || "-"}</TableCell>
                        <TableCell>{solicitud.fechaSolicitud}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getStatusIcon(solicitud.estado)}
                            {getStatusBadge(solicitud.estado)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {solicitud.estado === "pendiente" && (
                            <Button size="sm" variant="ghost" onClick={() => handleCancel(solicitud.id)}>
                              <X className="w-4 h-4 text-destructive" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="libros" className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead>Libro</TableHead>
                      <TableHead>Fecha Solicitud</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {solicitudesLibros.map((solicitud) => (
                      <TableRow key={solicitud.id}>
                        <TableCell className="font-medium">{solicitud.item}</TableCell>
                        <TableCell>{solicitud.fechaSolicitud}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getStatusIcon(solicitud.estado)}
                            {getStatusBadge(solicitud.estado)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {solicitud.estado === "pendiente" && (
                            <Button size="sm" variant="ghost" onClick={() => handleCancel(solicitud.id)}>
                              <X className="w-4 h-4 text-destructive" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="bienes" className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead>Bien</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                      <TableHead>Fecha Solicitud</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {solicitudesBienes.map((solicitud) => (
                      <TableRow key={solicitud.id}>
                        <TableCell className="font-medium">{solicitud.item}</TableCell>
                        <TableCell className="text-center">{solicitud.cantidad}</TableCell>
                        <TableCell>{solicitud.fechaSolicitud}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getStatusIcon(solicitud.estado)}
                            {getStatusBadge(solicitud.estado)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {solicitud.estado === "pendiente" && (
                            <Button size="sm" variant="ghost" onClick={() => handleCancel(solicitud.id)}>
                              <X className="w-4 h-4 text-destructive" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
