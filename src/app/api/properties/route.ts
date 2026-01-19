import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { PropertySchema, parsePropertyImages } from "@/lib/schemas"

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" }
    })
    // Parse images from JSON string to array
    const parsed = properties.map(parsePropertyImages)
    return NextResponse.json(parsed)
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch properties", details: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedFields = PropertySchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json({ error: validatedFields.error.flatten() }, { status: 400 })
    }

    const property = await prisma.property.create({
      data: validatedFields.data
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
