"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

// Usuario demo para pruebas
const DEMO_USER: User = {
  id: "demo-admin",
  email: "admin@inmoapp.com",
  name: "Admin Demo",
  role: "ADMIN",
}

const DEMO_PASSWORD = "admin123"

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (email, password) => {
        // Autenticación demo simple
        if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
          set({ user: DEMO_USER, isAuthenticated: true })
          return true
        }
        return false
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'inmoapp-auth',
    }
  )
)
