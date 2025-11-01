"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError("Token inválido o expirado")
    }
  }, [token])

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!password || !confirmPassword) {
      setError("Completa todos los campos")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      if (!response.ok) {
        setError("Error al establecer la contraseña. Intenta nuevamente.")
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (err) {
      setError("Error en la conexión. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Token inválido o expirado. Solicita un nuevo enlace.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl sm:text-3xl">Establecer Contraseña</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Tu cuenta ha sido aprobada. Crea tu contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                <div>
                  <p className="font-semibold text-foreground mb-2">¡Listo!</p>
                  <p className="text-sm text-muted-foreground">Tu contraseña ha sido establecida. Redirigiendo...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSetPassword} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">Mínimo 8 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm">
                    Confirmar Contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="text-base"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Estableciendo..." : "Establecer Contraseña"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
