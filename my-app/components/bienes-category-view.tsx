"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Search, Package } from "lucide-react"

interface Bien {
  id: number
  nombre: string
  codigo: string
  categoria: string
  cantidad: number
  disponibles: number
  estado: "disponible" | "en-uso" | "mantenimiento" | "descartado"
  valor: number
  ubicacion: string
}

const CATEGORIAS = ["Tecnología", "Laboratorio", "Mobiliario", "Deportes", "Materiales", "Seguridad"]

export default function BienesCategoryView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [bienes, setBienes] = useState<Bien[]>([
    {
      id: 1,
      nombre: "Proyector",
      codigo: "BN-001",
      categoria: "Tecnología",
      cantidad: 5,
      disponibles: 3,
      estado: "disponible",
      valor: 450000,
      ubicacion: "Sala de Tecnología 1",
    },
    {
      id: 2,
      nombre: "Microscopio",
      codigo: "BN-002",
      categoria: "Laboratorio",
      cantidad: 12,
      disponibles: 10,
      estado: "disponible",
      valor: 150000,
      ubicacion: "Laboratorio de Ciencias",
    },
    {
      id: 3,
      nombre: "Escritorio",
      codigo: "BN-003",
      categoria: "Mobiliario",
      cantidad: 20,
      disponibles: 18,
      estado: "disponible",
      valor: 80000,
      ubicacion: "Aula General",
    },
    {
      id: 4,
      nombre: "Balon de Futbol",
      codigo: "BN-004",
      categoria: "Deportes",
      cantidad: 10,
      disponibles: 8,
      estado: "disponible",
      valor: 25000,
      ubicacion: "Cancha Principal",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBienes = bienes.filter((bien) => {
    const matchCategory = selectedCategory === null || bien.categoria === selectedCategory
    const matchSearch =
      bien.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bien.codigo.includes(searchTerm) ||
      bien.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este bien?")) {
      setBienes(bienes.filter((bien) => bien.id !== id))
    }
  }

  const getStatusBadge = (estado: Bien["estado"]) => {
    switch (estado) {
      case "disponible":
        return <Badge className="bg-green-100 text-green-800">Disponible</Badge>
      case "en-uso":
        return <Badge className="bg-blue-100 text-blue-800">En Uso</Badge>
      case "mantenimiento":
        return <Badge className="bg-yellow-100 text-yellow-800">Mantenimiento</Badge>
      case "descartado":
        return <Badge variant="destructive">Descartado</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <Card className="border-bienes-accent/20 bg-bienes-light">
        <CardHeader>
          <CardTitle className="text-bienes-primary flex items-center gap-2">
            <Package className="w-5 h-5" />
            Categorías de Bienes
          </CardTitle>
          <CardDescription>Selecciona una categoría para ver los bienes disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-bienes-primary hover:bg-bienes-primary/90" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              Todos ({bienes.length})
            </Button>
            {CATEGORIAS.map((cat) => {
              const count = bienes.filter((b) => b.categoria === cat).length
              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={
                    selectedCategory === cat
                      ? "bg-bienes-primary hover:bg-bienes-primary/90"
                      : "text-bienes-primary border-bienes-primary/30"
                  }
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} ({count})
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bienes Table */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedCategory ? `Bienes - ${selectedCategory}` : "Todos los Bienes"}</CardTitle>
          <CardDescription>Gestiona el inventario de activos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, código o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-bienes-light">
                  <TableHead>Nombre</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Disponibles</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBienes.map((bien) => (
                  <TableRow key={bien.id}>
                    <TableCell className="font-medium">{bien.nombre}</TableCell>
                    <TableCell>{bien.codigo}</TableCell>
                    <TableCell>
                      <Badge className="bg-bienes-accent/20 text-bienes-accent">{bien.categoria}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{bien.cantidad}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={bien.disponibles > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {bien.disponibles}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(bien.estado)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="ghost">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(bien.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBienes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron bienes que coincidan con tu búsqueda
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
