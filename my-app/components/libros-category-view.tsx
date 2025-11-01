"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Search, Book } from "lucide-react"

interface Libro {
  id: number
  titulo: string
  autor: string
  isbn: string
  cantidad: number
  disponibles: number
  editorial: string
  año: number
  categoria: string
}

const CATEGORIAS = ["Ficción", "No Ficción", "Referencia", "Infantil", "Técnico", "Literatura"]

export default function LibrosCategoryView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [libros, setLibros] = useState<Libro[]>([
    {
      id: 1,
      titulo: "Don Quijote",
      autor: "Miguel de Cervantes",
      isbn: "978-84-00-00001-0",
      cantidad: 5,
      disponibles: 3,
      editorial: "Planeta",
      año: 1605,
      categoria: "Ficción",
    },
    {
      id: 2,
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      isbn: "978-84-00-00002-0",
      cantidad: 3,
      disponibles: 1,
      editorial: "Sudamericana",
      año: 1967,
      categoria: "Ficción",
    },
    {
      id: 3,
      titulo: "El Quijote Anotado",
      autor: "Varios",
      isbn: "978-84-00-00003-0",
      cantidad: 2,
      disponibles: 2,
      editorial: "Crítica",
      año: 2004,
      categoria: "Referencia",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLibros = libros.filter((libro) => {
    const matchCategory = selectedCategory === null || libro.categoria === selectedCategory
    const matchSearch =
      libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.isbn.includes(searchTerm)
    return matchCategory && matchSearch
  })

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este libro?")) {
      setLibros(libros.filter((libro) => libro.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <Card className="border-biblioteca-accent/20 bg-biblioteca-light">
        <CardHeader>
          <CardTitle className="text-biblioteca-primary flex items-center gap-2">
            <Book className="w-5 h-5" />
            Categorías de Libros
          </CardTitle>
          <CardDescription>Selecciona una categoría para ver los libros disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-biblioteca-primary hover:bg-biblioteca-primary/90" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              Todos ({libros.length})
            </Button>
            {CATEGORIAS.map((cat) => {
              const count = libros.filter((l) => l.categoria === cat).length
              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={
                    selectedCategory === cat
                      ? "bg-biblioteca-primary hover:bg-biblioteca-primary/90"
                      : "text-biblioteca-primary border-biblioteca-primary/30"
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

      {/* Books Table */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedCategory ? `Libros - ${selectedCategory}` : "Todos los Libros"}</CardTitle>
          <CardDescription>Gestiona el acervo bibliográfico</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, autor o ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-biblioteca-light">
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Disponibles</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLibros.map((libro) => (
                  <TableRow key={libro.id}>
                    <TableCell className="font-medium">{libro.titulo}</TableCell>
                    <TableCell>{libro.autor}</TableCell>
                    <TableCell>
                      <Badge className="bg-biblioteca-accent/20 text-biblioteca-accent">{libro.categoria}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{libro.cantidad}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={libro.disponibles > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {libro.disponibles}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="ghost">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(libro.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLibros.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron libros que coincidan con tu búsqueda
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
