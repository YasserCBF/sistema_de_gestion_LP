"use client"

import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Spinner } from "@/components/ui/spinner"

interface AuthGuardProps {
  children: ReactNode
  requiredRole?: "docente" | "admin-bienes" | "admin-biblioteca"
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { isAuthenticated, loading, user } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push("/auth/login")
    return null
  }

  if (requiredRole && user?.role !== requiredRole) {
    router.push("/dashboard")
    return null
  }

  return <>{children}</>
}
