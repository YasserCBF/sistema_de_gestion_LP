"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [dni, setDni] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!dni || !password) {
      setError("Completa todos los campos")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni, password }),
      })

      if (!response.ok) {
        setError("DNI o contraseña inválidos")
        return
      }

      const data = await response.json()

      if (data.user.status === "pendiente") {
        setError("Tu cuenta está pendiente de aprobación por el administrador")
        return
      }

      if (data.user.status === "rechazado") {
        setError("Tu cuenta ha sido rechazada")
        return
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      router.push(`/dashboard/${data.user.role}`)
    } catch (err) {
      setError("Error en la conexión. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen login-animated-bg flex items-center justify-center p-4">
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
            <CardTitle className="text-2xl sm:text-3xl text-primary">Iniciar Sesión</CardTitle>
            <CardDescription className="text-sm sm:text-base">Gestión de Libros y Bienes - GUE</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="dni" className="text-sm font-medium">
                  DNI
                </Label>
                <Input
                  id="dni"
                  type="text"
                  placeholder="12345678"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                  className="text-base border-secondary/40 focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-base border-secondary/40 focus:border-primary focus:ring-primary"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-foreground/70">
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => router.push("/auth/signup")}
                className="text-primary hover:underline font-semibold"
              >
                Regístrate aquí
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
