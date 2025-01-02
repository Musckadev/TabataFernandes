import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminPanel = req.nextUrl.pathname.startsWith("/admin")
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")

    // Redirecionar para login se não estiver autenticado
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Verificar permissões para rotas do admin
    if (isAdminPanel) {
      const userRole = token.role as string

      // Verificar acesso baseado na rota e role
      if (req.nextUrl.pathname === "/admin/analytics" && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url))
      }

      if (req.nextUrl.pathname === "/admin/configuracoes" && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url))
      }

      if (
        (req.nextUrl.pathname === "/admin/clientes" ||
          req.nextUrl.pathname === "/admin/categorias" ||
          req.nextUrl.pathname === "/admin/fretes") &&
        !["ADMIN", "MANAGER"].includes(userRole)
      ) {
        return NextResponse.redirect(new URL("/admin", req.url))
      }
    }

    // Verificar permissões para rotas da API
    if (isApiRoute) {
      const userRole = token.role as string

      // Proteger rotas sensíveis da API
      if (
        (req.nextUrl.pathname.startsWith("/api/users") ||
          req.nextUrl.pathname.startsWith("/api/settings")) &&
        userRole !== "ADMIN"
      ) {
        return new NextResponse(null, { status: 403 })
      }

      if (
        (req.nextUrl.pathname.startsWith("/api/categories") ||
          req.nextUrl.pathname.startsWith("/api/collections") ||
          req.nextUrl.pathname.startsWith("/api/materials") ||
          req.nextUrl.pathname.startsWith("/api/stones")) &&
        !["ADMIN", "MANAGER"].includes(userRole)
      ) {
        return new NextResponse(null, { status: 403 })
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
}
