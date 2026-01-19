"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, Loader2 } from "lucide-react"
import { useState } from "react"
import { usePropertyStore, Property } from "@/store"

// Schema simplificado para el form
const PropertyFormSchema = z.object({
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

type FormData = z.infer<typeof PropertyFormSchema>

interface PropertyFormProps {
  onClose: () => void
  onSuccess: () => void
  initialData?: Property | null
}

export function PropertyForm({ onClose, onSuccess, initialData }: PropertyFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addProperty, updateProperty } = usePropertyStore()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({
    resolver: zodResolver(PropertyFormSchema) as any,
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      price: initialData.price,
      currency: initialData.currency,
      location: initialData.location,
      type: initialData.type,
      operation: initialData.operation,
      bedrooms: initialData.bedrooms ?? undefined,
      bathrooms: initialData.bathrooms ?? undefined,
      area: initialData.area ?? undefined,
      featured: initialData.featured,
      status: initialData.status,
      images: initialData.images,
    } : {
      currency: "USD",
      status: "AVAILABLE",
      images: [],
      featured: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)

    try {
      await new Promise((r) => setTimeout(r, 300))

      if (initialData) {
        updateProperty(initialData.id, data)
      } else {
        addProperty(data)
      }
      
      onSuccess()
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado")
    } finally {
      setLoading(false)
    }
  }

  const currentImages = watch("images")

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
        <div className="sticky top-0 bg-[#111111] p-6 border-b border-white/5 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">{initialData ? "Editar" : "Añadir"} Propiedad</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Título</label>
              <input 
                {...register("title")} 
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#C5A059]"
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Ubicación</label>
              <input 
                {...register("location")} 
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#C5A059]"
              />
              {errors.location && <p className="text-red-500 text-xs">{errors.location.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Tipo</label>
              <select {...register("type")} className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#C5A059]">
                <option value="CASA">Casa</option>
                <option value="DEPTO">Departamento</option>
                <option value="LOTE">Lote</option>
                <option value="LOCAL">Local Comercial</option>
                <option value="OTRO">Otro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Operación</label>
              <select {...register("operation")} className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#C5A059]">
                <option value="VENTA">Venta</option>
                <option value="ALQUILER">Alquiler</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Precio</label>
              <div className="flex gap-2">
                <select {...register("currency")} className="bg-[#1A1A1A] border border-white/5 rounded-xl p-3 w-24">
                  <option value="USD">USD</option>
                  <option value="ARS">ARS</option>
                </select>
                <input 
                  type="number"
                  {...register("price")} 
                  className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              {errors.price && <p className="text-red-500 text-xs">{errors.price.message as string}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Habitaciones</label>
                <input type="number" {...register("bedrooms")} className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Baños</label>
                <input type="number" {...register("bathrooms")} className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">M²</label>
                <input type="number" {...register("area")} className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Descripción</label>
            <textarea 
              {...register("description")} 
              rows={4}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#C5A059] resize-none"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message as string}</p>}
          </div>

          <div className="space-y-4">
            <label className="text-sm text-gray-400">URLs de Imágenes (una por línea)</label>
            <textarea 
              placeholder="https://example.com/image1.jpg"
              onChange={(e) => setValue("images", e.target.value.split("\n").filter((v: string) => v.trim() !== ""))}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-3 focus:outline-none focus:border-[#C5A059] font-mono text-sm"
              rows={3}
              defaultValue={currentImages?.join("\n")}
            />
            {errors.images && <p className="text-red-500 text-xs">{errors.images.message as string}</p>}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-white/10 hover:bg-white/5 py-4 rounded-2xl font-bold transition-all text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#C5A059] hover:bg-[#B38F48] text-black py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Guardar Propiedad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
