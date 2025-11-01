"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Check, Search } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface Bien {
  id: number
  nombre: string
  categoria: string
  disponibles: number
}

export default function SolicitudBienView() {
  const [bienes] = useState<Bien[]>([
    { id: 1, nombre: "Proyector", categoria: "Tecnología", disponibles: 3 },
    { id: 2, nombre: "Microscopio", categoria: "Laboratorio", disponibles: 10 },
    { id: 3, nombre: "Escritorio", categoria: "Mobiliario", disponibles: 0 },
  ])

  const [formData, setFormData] = useState({
    bien: "",
    cantidad: "1",
    motivo: "",
    fechaDevolucion: "",
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectBien = (bien: Bien) => {
    if (bien.disponibles > 0) {
      setFormData({ ...formData, bien: bien.nombre })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!formData.bien) {
      setError("Debes seleccionar un bien")
      return
    }

    if (Number.parseInt(formData.cantidad) <= 0) {
      setError("La cantidad debe ser mayor a 0")
      return
    }

    setLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log("Solicitud de bien:", formData)
      setSuccess(true)
      setFormData({ bien: "", cantidad: "1", motivo: "", fechaDevolucion: "" })

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError("Error al enviar solicitud")
    } finally {
      setLoading(false)
    }
  }

  const filteredBienes = bienes.filter(
    (bien) =>
      bien.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bien.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedBien = bienes.find((b) => b.nombre === formData.bien)
  const maxCantidad = selectedBien?.disponibles || 0

  return (
    <div className="max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulario */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitar Bien</CardTitle>
            <CardDescription>Completa el formulario para solicitar un bien</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">Solicitud enviada exitosamente</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="bien">Bien Seleccionado</Label>
                <Input
                  id="bien"
                  name="bien"
                  placeholder="Selecciona un bien de la lista"
                  value={formData.bien}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad {maxCantidad > 0 && `(máximo ${maxCantidad})`}</Label>
                <Input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  min="1"
                  max={maxCantidad}
                  value={formData.cantidad}
                  onChange={handleChange}
                  disabled={!formData.bien}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaDevolucion">Fecha Estimada de Devolución</Label>
                <Input
                  id="fechaDevolucion"
                  name="fechaDevolucion"
                  type="date"
                  value={formData.fechaDevolucion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo de la Solicitud</Label>
                <Textarea
                  id="motivo"
                  name="motivo"
                  placeholder="¿Para qué necesitas este bien?"
                  value={formData.motivo}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading || !formData.bien}>
                {loading ? "Enviando..." : "Solicitar Bien"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de bienes */}
        <Card>
          <CardHeader>
            <CardTitle>Bienes Disponibles</CardTitle>
            <CardDescription>Selecciona un bien de la lista</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar bien..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredBienes.map((bien) => (
                <div
                  key={bien.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.bien === bien.nombre ? "bg-primary/10 border-primary" : "hover:bg-muted"
                  } ${bien.disponibles === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleSelectBien(bien)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-foreground">{bien.nombre}</p>
                      <p className="text-sm text-muted-foreground">{bien.categoria}</p>
                    </div>
                    <Badge variant={bien.disponibles > 0 ? "default" : "destructive"}>
                      {bien.disponibles > 0 ? `${bien.disponibles} disponibles` : "Agotado"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
