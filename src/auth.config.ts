import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Esta configuración se usa en el middleware (Edge Runtime)
// NO debe importar Prisma ni bcrypt aquí porque no funcionan en Edge
export default {
  providers: [
    Credentials({
      async authorize() {
        // La autorización real se hace en auth.ts (Node.js Runtime)
        // Aquí solo definimos el provider para el middleware
        return null
      },
    }),
  ],
} satisfies NextAuthConfig

