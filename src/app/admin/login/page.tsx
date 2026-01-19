"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { LoginSchema } from "@/lib/schemas"
import { useAuthStore } from "@/store"
import { z } from "zod"
import { Loader2, Lock, Mail } from "lucide-react"

type FormData = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { login, isAuthenticated } = useAuthStore()

  useEffect(() => {
    setMounted(true)
    if (isAuthenticated) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)

    // Pequeño delay para simular request
    await new Promise((r) => setTimeout(r, 500))

    const success = login(data.email, data.password)
    
    if (success) {
      router.push("/admin/dashboard")
    } else {
      setError("Credenciales inválidas")
    }
    
    setLoading(false)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">INMO<span className="text-[#C5A059]">APP</span></h1>
          <p className="text-gray-400">Acceso Administrativo</p>
          <p className="text-gray-600 text-xs mt-2">Demo: admin@inmoapp.com / admin123</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                {...register("email")}
                type="email"
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#C5A059] transition-colors"
                placeholder="admin@inmoapp.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                {...register("password")}
                type="password"
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#C5A059] transition-colors"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C5A059] hover:bg-[#B38F48] text-black font-bold py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  )
}
