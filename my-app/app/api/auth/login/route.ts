import { type NextRequest, NextResponse } from "next/server"

const MOCK_USERS = [
  // Docente - Yassr
  {
    id: 1,
    dni: "123456789",
    password: "123",
    role: "docente",
    name: "Yassr",
    birthDate: "1995-01-15",
    status: "activo",
  },
  // Admin Bienes - Yassr
  {
    id: 2,
    dni: "12345678",
    password: "1234",
    role: "admin-bienes",
    name: "Yasser",
    birthDate: "1995-01-15",
    status: "activo",
  },
  // Admin Biblioteca - Yasser
  {
    id: 3,
    dni: "87654321",
    password: "12345",
    role: "admin-biblioteca",
    name: "Yasser",
    birthDate: "1995-01-15",
    status: "activo",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { dni, password } = await request.json()

    const user = MOCK_USERS.find((u) => u.dni === dni && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "DNI o contraseña inválidos" }, { status: 401 })
    }

    // Generate mock JWT token
    const token = btoa(JSON.stringify({ userId: user.id, role: user.role, dni: user.dni }))

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        dni: user.dni,
        name: user.name,
        role: user.role,
        birthDate: user.birthDate,
        status: user.status,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Error en la conexión" }, { status: 500 })
  }
}
