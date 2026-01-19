"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Property {
  id: string
  title: string
  description: string
  price: number
  currency: string
  location: string
  type: string
  operation: string
  bedrooms?: number
  bathrooms?: number
  area?: number
  images: string[]
  featured: boolean
  status: string
  createdAt: string
  updatedAt: string
}

interface PropertyStore {
  properties: Property[]
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Property
  updateProperty: (id: string, data: Partial<Property>) => void
  deleteProperty: (id: string) => void
  getProperty: (id: string) => Property | undefined
}

// Datos de ejemplo para la demo
const demoProperties: Property[] = [
  {
    id: "demo-1",
    title: "Casa Moderna en Palermo",
    description: "Hermosa casa moderna de 3 pisos con jardín, pileta y parrilla. Ubicada en una zona residencial tranquila de Palermo. Cuenta con 4 dormitorios, 3 baños completos, cocina integrada y living amplio con doble altura.",
    price: 450000,
    currency: "USD",
    location: "Palermo, Buenos Aires",
    type: "CASA",
    operation: "VENTA",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
    featured: true,
    status: "AVAILABLE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    title: "Departamento de Lujo en Puerto Madero",
    description: "Exclusivo departamento con vista al río en el piso 25. Amenities de primer nivel: gimnasio, pileta climatizada, SUM, seguridad 24hs. Cochera doble incluida.",
    price: 380000,
    currency: "USD",
    location: "Puerto Madero, Buenos Aires",
    type: "DEPTO",
    operation: "VENTA",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
    featured: true,
    status: "AVAILABLE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-3",
    title: "Local Comercial en Microcentro",
    description: "Local a la calle en excelente ubicación comercial. Ideal para gastronomía o retail. Habilitación al día. 2 baños, depósito y oficina.",
    price: 2500,
    currency: "USD",
    location: "Microcentro, Buenos Aires",
    type: "LOCAL",
    operation: "ALQUILER",
    area: 120,
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
    featured: false,
    status: "AVAILABLE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-4",
    title: "Lote en Country Club",
    description: "Terreno de 1000m² en exclusivo country con seguridad, club house, canchas de tenis y golf. Ideal para construir la casa de tus sueños.",
    price: 95000,
    currency: "USD",
    location: "Pilar, Buenos Aires",
    type: "LOTE",
    operation: "VENTA",
    area: 1000,
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"],
    featured: false,
    status: "AVAILABLE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set, get) => ({
      properties: demoProperties,
      
      addProperty: (propertyData) => {
        const newProperty: Property = {
          ...propertyData,
          id: `prop-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          properties: [newProperty, ...state.properties]
        }))
        return newProperty
      },
      
      updateProperty: (id, data) => {
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
          )
        }))
      },
      
      deleteProperty: (id) => {
        set((state) => ({
          properties: state.properties.filter((p) => p.id !== id)
        }))
      },
      
      getProperty: (id) => {
        return get().properties.find((p) => p.id === id)
      },
    }),
    {
      name: 'inmoapp-properties',
    }
  )
)
