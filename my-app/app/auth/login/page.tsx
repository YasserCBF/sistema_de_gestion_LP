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
            src="data:image/png;base64,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"
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
