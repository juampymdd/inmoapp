import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = ["/", "/venta", "/alquiler", "/emprendimientos", "/inversores", "/contacto"].includes(nextUrl.pathname)
  const isAuthRoute = nextUrl.pathname.startsWith("/admin/login")
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")

  if (isApiAuthRoute) return null

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/admin/dashboard", nextUrl))
    }
    return null
  }

  if (!isLoggedIn && isAdminRoute) {
    return Response.redirect(new URL("/admin/login", nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
