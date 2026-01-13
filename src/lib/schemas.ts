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
  images: z.array(z.string()).min(1, "Debe cargar al menos una imagen"),
})
