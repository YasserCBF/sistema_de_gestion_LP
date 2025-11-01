"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Check, Camera, Upload, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BienesRegisterView() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    codigo: "",
    valor: "",
    cantidad: "",
    estado: "disponible",
    ubicacion: "",
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
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

    if (!formData.nombre || !formData.codigo || !formData.cantidad) {
      setError("Por favor completa los campos requeridos")
      return
    }

    // Frontend only - no mock API
    console.log("Datos del bien para enviar:", formData)
    setSuccess(true)

    // Reset form
    setFormData({
      nombre: "",
      descripcion: "",
      categoria: "",
      codigo: "",
      valor: "",
      cantidad: "",
      estado: "disponible",
      ubicacion: "",
      imagen: null,
    })
    removeImage()

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Registrar Nuevo Bien</CardTitle>
          <CardDescription>Añade un nuevo activo al inventario</CardDescription>
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
                <Label htmlFor="nombre">Nombre del Bien</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Ej: Proyector"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo">Código de Bien</Label>
                <Input
                  id="codigo"
                  name="codigo"
                  placeholder="BN-001"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={formData.categoria} onValueChange={(value) => handleSelectChange("categoria", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tecnologia">Tecnología</SelectItem>
                    <SelectItem value="mobiliario">Mobiliario</SelectItem>
                    <SelectItem value="laboratorio">Laboratorio</SelectItem>
                    <SelectItem value="deportes">Deportes</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
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

              <div className="space-y-2">
                <Label htmlFor="valor">Valor Unitario (COP)</Label>
                <Input
                  id="valor"
                  name="valor"
                  type="number"
                  placeholder="0"
                  value={formData.valor}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={formData.estado} onValueChange={(value) => handleSelectChange("estado", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disponible">Disponible</SelectItem>
                    <SelectItem value="en-uso">En Uso</SelectItem>
                    <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                    <SelectItem value="descartado">Descartado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Input
                  id="ubicacion"
                  name="ubicacion"
                  placeholder="Ej: Sala de Tecnología 1"
                  value={formData.ubicacion}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Detalles adicionales del bien..."
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="space-y-4 border-t pt-6">
              <Label>Foto del Bien</Label>

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
              Registrar Bien
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
