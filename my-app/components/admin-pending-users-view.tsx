"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PendingUser {
  id: number
  name: string
  dni: string
  birthDate: string
  registeredAt: string
  role: string
}

export default function AdminPendingUsersView() {
  const [users, setUsers] = useState<PendingUser[]>([
    {
      id: 1,
      name: "Carlos Rodríguez",
      dni: "12345678",
      birthDate: "1985-05-15",
      registeredAt: "2024-10-28",
      role: "docente",
    },
    {
      id: 2,
      name: "María González",
      dni: "87654321",
      birthDate: "1990-03-22",
      registeredAt: "2024-10-29",
      role: "docente",
    },
  ])

  const handleApprove = async (userId: number) => {
    try {
      const response = await fetch("/api/admin/users/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== userId))
      }
    } catch (err) {
      console.error("Error approving user:", err)
    }
  }

  const handleReject = async (userId: number) => {
    try {
      const response = await fetch("/api/admin/users/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== userId))
      }
    } catch (err) {
      console.error("Error rejecting user:", err)
    }
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Usuarios Pendientes de Aprobación</h2>
        <p className="text-sm text-muted-foreground">Revisa y aprueba nuevas solicitudes de registro</p>
      </div>

      {users.length === 0 ? (
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <Alert>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>No hay usuarios pendientes de aprobación.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Solicitudes Pendientes ({users.length})</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Nombre</TableHead>
                  <TableHead className="text-xs sm:text-sm">DNI</TableHead>
                  <TableHead className="text-xs sm:text-sm">Rol</TableHead>
                  <TableHead className="text-xs sm:text-sm">Registrado</TableHead>
                  <TableHead className="text-xs sm:text-sm">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-xs sm:text-sm">{user.name}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{user.dni}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {new Date(user.registeredAt).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white text-xs"
                          onClick={() => handleApprove(user.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aprobar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="text-xs"
                          onClick={() => handleReject(user.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rechazar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
