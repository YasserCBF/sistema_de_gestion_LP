"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Check, Camera, Upload, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LibroRegisterView() {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    editorial: "",
    año: "",
    cantidad: "",
    descripcion: "",
    imagen: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Por favor selecciona un archivo de imagen")
        return
      }
      setFormData({ ...formData, imagen: file })
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
      setError("")
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (err) {
      setError("No se pudo acceder a la cámara")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)

        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" })
            setFormData({ ...formData, imagen: file })
            const reader = new FileReader()
            reader.onload = (event) => {
              setImagePreview(event.target?.result as string)
            }
            reader.readAsDataURL(file)
          }
        })

        stopCamera()
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setShowCamera(false)
    }
  }

  const removeImage = () => {
    setFormData({ ...formData, imagen: null })
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!formData.titulo || !formData.autor || !formData.cantidad) {
      setError("Por favor completa los campos requeridos")
      return
    }

    // Frontend only - no mock API
    console.log("Datos del libro para enviar:", formData)
    setSuccess(true)

    // Reset form
    setFormData({
      titulo: "",
      autor: "",
      isbn: "",
      editorial: "",
      año: "",
      cantidad: "",
      descripcion: "",
      imagen: null,
    })
    removeImage()

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Registrar Nuevo Libro</CardTitle>
          <CardDescription>Añade un nuevo libro al acervo bibliográfico</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">Datos listos para procesar</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  placeholder="Título del libro"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="autor">Autor</Label>
                <Input
                  id="autor"
                  name="autor"
                  placeholder="Nombre del autor"
                  value={formData.autor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  name="isbn"
                  placeholder="978-84-00-00000-0"
                  value={formData.isbn}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editorial">Editorial</Label>
                <Input
                  id="editorial"
                  name="editorial"
                  placeholder="Editorial"
                  value={formData.editorial}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="año">Año de Publicación</Label>
                <Input
                  id="año"
                  name="año"
                  type="number"
                  placeholder="2024"
                  value={formData.año}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  placeholder="0"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Descripción del libro..."
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="space-y-4 border-t pt-6">
              <Label>Portada del Libro</Label>

              {!showCamera ? (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Cargar Imagen
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 gap-2 bg-transparent" onClick={startCamera}>
                    <Camera className="h-4 w-4" />
                    Tomar Foto
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <video ref={videoRef} autoPlay playsInline className="w-full rounded-md bg-black" />
                  <div className="flex gap-2">
                    <Button type="button" className="flex-1" onClick={capturePhoto}>
                      Capturar Foto
                    </Button>
                    <Button type="button" variant="destructive" className="flex-1" onClick={stopCamera}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

              <canvas ref={canvasRef} className="hidden" />

              {imagePreview && (
                <div className="relative w-full">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              Registrar Libro
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
