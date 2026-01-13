"use client"

import { useEffect, useState } from "react"
import { Plus, Building2, MapPin, DollarSign, Edit3, Trash2 } from "lucide-react"
import { PropertyForm } from "@/components/admin/PropertyForm"

interface Property {
  id: string
  title: string
  location: string
  type: string
  operation: string
  currency: string
  price: number
}

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/properties")
      const data = await res.json()
      if (Array.isArray(data)) {
        setProperties(data)
      } else {
        console.error("API returned error:", data)
        setProperties([])
      }
    } catch (error) {
      console.error("Error fetching properties:", error)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta propiedad?")) {
      await fetch(`/api/properties/${id}`, { method: "DELETE" })
      fetchProperties()
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gestión de <span className="text-[#C5A059]">Propiedades</span></h1>
            <p className="text-gray-400">Panel administrativo de InmoApp</p>
          </div>
          <button 
            onClick={() => { setEditingProperty(null); setShowForm(true); }}
            className="bg-[#C5A059] hover:bg-[#B38F48] text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" /> Nueva Propiedad
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Propiedades", value: properties.length, icon: Building2 },
            { label: "En Venta", value: properties.filter(p => p.operation === "VENTA").length, icon: DollarSign },
            { label: "Ubicaciones", value: new Set(properties.map(p => p.location)).size, icon: MapPin },
          ].map((stat, i) => (
            <div key={i} className="bg-[#111111] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C5A059]/10 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[#C5A059]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-white">
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Propiedad</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Ubicación</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Tipo/Operación</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Precio</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-400">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">Cargando...</td></tr>
              ) : properties.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">No hay propiedades registradas</td></tr>
              ) : properties.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-gray-500">{p.type}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{p.location}</td>
                  <td className="px-6 py-4">
                    <span className="bg-[#C5A059]/10 text-[#C5A059] text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider">
                      {p.operation}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono">{p.currency} {Number(p.price).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <PropertyForm 
          onClose={() => setShowForm(false)} 
          onSuccess={() => { setShowForm(false); fetchProperties(); }}
          initialData={editingProperty}
        />
      )}
    </div>
  )
}
