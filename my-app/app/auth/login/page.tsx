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
