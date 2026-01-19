import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida",
  }),
})

export const PropertySchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  description: z.string().min(20, "La descripción debe ser más detallada"),
  price: z.coerce.number().positive("El precio debe ser un número positivo"),
  currency: z.string().default("USD"),
  location: z.string().min(3, "La ubicación es requerida"),
  type: z.enum(["CASA", "DEPTO", "LOTE", "LOCAL", "OTRO"]),
  operation: z.enum(["VENTA", "ALQUILER"]),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().int().nonnegative().optional(),
  area: z.coerce.number().positive().optional(),
  featured: z.boolean().default(false),
  status: z.enum(["AVAILABLE", "SOLD", "RENTED"]).default("AVAILABLE"),
  images: z.array(z.string()).min(1, "Debe cargar al menos una imagen").transform(arr => JSON.stringify(arr)),
})

// Schema for reading properties (transforms JSON string back to array)
export const PropertyOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  currency: z.string(),
  location: z.string(),
  type: z.string(),
  operation: z.string(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  area: z.number().nullable(),
  featured: z.boolean(),
  status: z.string(),
  images: z.string().transform(str => JSON.parse(str) as string[]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Helper to parse property images from DB
export function parsePropertyImages(property: any) {
  return {
    ...property,
    images: typeof property.images === 'string' ? JSON.parse(property.images) : property.images
  }
}
