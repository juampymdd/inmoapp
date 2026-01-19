import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { PropertySchema, parsePropertyImages } from "@/lib/schemas"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id }
    })
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(parsePropertyImages(property))
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedFields = PropertySchema.partial().safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json({ error: validatedFields.error.flatten() }, { status: 400 })
    }

    const property = await prisma.property.update({
      where: { id: params.id },
      data: validatedFields.data
    })

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await prisma.property.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: "Property deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 })
  }
}
