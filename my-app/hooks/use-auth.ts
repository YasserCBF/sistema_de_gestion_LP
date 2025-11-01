"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  dni: string
  name: string
  role: "docente" | "admin-bienes" | "admin-biblioteca"
  status: "pendiente" | "activo" | "rechazado"
  birthDate: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
    isAuthenticated: false,
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userStr = localStorage.getItem("user")

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        setState({
          user,
          token,
          loading: false,
          isAuthenticated: true,
        })
      } catch (e) {
        setState((prev) => ({ ...prev, loading: false }))
      }
    } else {
      setState((prev) => ({ ...prev, loading: false }))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setState({
      user: null,
      token: null,
      loading: false,
      isAuthenticated: false,
    })
    router.push("/auth/login")
  }

  return { ...state, logout }
}
