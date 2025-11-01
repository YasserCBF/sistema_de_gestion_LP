import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    // Mock: In production, save to database
    console.log("User signup:", { name, email, role })

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { name, email, role },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
