"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    birthDate: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateDNI = (dni: string) => {
    return /^\d{7,10}$/.test(dni.replace(/[.\s-]/g, ""))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.dni || !formData.birthDate) {
      setError("Completa todos los campos")
      return
    }

    if (!validateDNI(formData.dni)) {
      setError("DNI inválido. Debe tener 7-10 dígitos")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          dni: formData.dni.replace(/[.\s-]/g, ""),
          birthDate: formData.birthDate,
        }),
      })

      if (!response.ok) {
        setError("Error en el registro. El DNI podría estar registrado.")
        return
      }

      setSuccess("Registro exitoso. Espera la aprobación del administrador.")
      setStep(2)
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    } catch (err) {
      setError("Error en la conexión. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary via-secondary/30 to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/design-mode/descarga-removebg-preview.png"
            alt="GUE Badge"
            width={80}
            height={80}
            className="w-20 h-20 object-contain"
          />
        </div>
        <Card className="shadow-lg border-secondary/30">
          <CardHeader className="text-center space-y-2 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="text-2xl sm:text-3xl text-primary">Crear Cuenta</CardTitle>
            <CardDescription className="text-sm sm:text-base">Sistema de Gestión - GUE</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nombre Completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-base border-secondary/40 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dni" className="text-sm font-medium">
                    DNI
                  </Label>
                  <Input
                    id="dni"
                    name="dni"
                    type="text"
                    placeholder="12345678"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                    className="text-base border-secondary/40 focus:border-primary focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">Formato: 7-10 dígitos</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-sm font-medium">
                    Fecha de Nacimiento
                  </Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className="text-base border-secondary/40 focus:border-primary focus:ring-primary"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? "Registrando..." : "Registrarse"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-accent mx-auto" />
                <div>
                  <p className="font-semibold text-foreground mb-2">Registro exitoso</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tu cuenta está pendiente de aprobación. Recibirás una notificación cuando sea aprobada.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-foreground/70">
              ¿Ya tienes cuenta?{" "}
              <button onClick={() => router.push("/auth/login")} className="text-primary hover:underline font-semibold">
                Inicia sesión
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
