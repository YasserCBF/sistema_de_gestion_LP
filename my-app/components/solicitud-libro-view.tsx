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

interface Libro {
  id: number
  titulo: string
  autor: string
  disponibles: number
}

export default function SolicitudLibroView() {
  const [libros] = useState<Libro[]>([
    { id: 1, titulo: "Don Quijote", autor: "Miguel de Cervantes", disponibles: 3 },
    { id: 2, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", disponibles: 1 },
    { id: 3, titulo: "1984", autor: "George Orwell", disponibles: 0 },
  ])

  const [formData, setFormData] = useState({
    libro: "",
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

  const handleSelectLibro = (libro: Libro) => {
    if (libro.disponibles > 0) {
      setFormData({ ...formData, libro: libro.titulo })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    if (!formData.libro) {
      setError("Debes seleccionar un libro")
      setLoading(false)
      return
    }

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log("Solicitud de préstamo:", formData)
      setSuccess(true)
      setFormData({ libro: "", motivo: "", fechaDevolucion: "" })

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError("Error al enviar solicitud")
    } finally {
      setLoading(false)
    }
  }

  const filteredLibros = libros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.autor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulario */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitar Préstamo de Libro</CardTitle>
            <CardDescription>Completa el formulario para solicitar un libro</CardDescription>
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
                <Label htmlFor="libro">Libro Seleccionado</Label>
                <Input
                  id="libro"
                  name="libro"
                  placeholder="Selecciona un libro de la lista"
                  value={formData.libro}
                  readOnly
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
                  placeholder="¿Para qué necesitas este libro?"
                  value={formData.motivo}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading || !formData.libro}>
                {loading ? "Enviando..." : "Solicitar Préstamo"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de libros */}
        <Card>
          <CardHeader>
            <CardTitle>Libros Disponibles</CardTitle>
            <CardDescription>Selecciona un libro de la lista</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar libro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLibros.map((libro) => (
                <div
                  key={libro.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.libro === libro.titulo ? "bg-primary/10 border-primary" : "hover:bg-muted"
                  } ${libro.disponibles === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleSelectLibro(libro)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-foreground">{libro.titulo}</p>
                      <p className="text-sm text-muted-foreground">{libro.autor}</p>
                    </div>
                    <Badge variant={libro.disponibles > 0 ? "default" : "destructive"}>
                      {libro.disponibles > 0 ? `${libro.disponibles} disponibles` : "Agotado"}
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
