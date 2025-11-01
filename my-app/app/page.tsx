"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Spinner } from "@/components/ui/spinner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, loading, user, logout } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && user) {
        router.push(`/dashboard/${user.role}`)
      }
    }
  }, [isAuthenticated, loading, user, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner />
      </div>
    )
  }

  // Not authenticated - show role selection or redirect to login
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Gestión de Libros y Bienes</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Sistema de administración educativo</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Card
              className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              <div className="flex items-center gap-3 mb-2">
                <LogIn className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground text-sm sm:text-base">¿Ya tienes cuenta?</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">Inicia sesión con tus credenciales</p>
              <Button className="w-full text-sm" onClick={() => router.push("/auth/login")}>
                Iniciar Sesión
              </Button>
            </Card>

            <Card
              className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/auth/signup")}
            >
              <div className="flex items-center gap-3 mb-2">
                <UserPlus className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground text-sm sm:text-base">¿Eres nuevo?</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">Crea una nueva cuenta en el sistema</p>
              <Button
                variant="outline"
                className="w-full text-sm bg-transparent"
                onClick={() => router.push("/auth/signup")}
              >
                Registrarse
              </Button>
            </Card>
          </div>
        </div>
      </main>
    )
  }

  return null
}
