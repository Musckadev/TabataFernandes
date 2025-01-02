"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    role: ["ADMIN", "MANAGER", "STAFF"],
  },
  {
    title: "Produtos",
    href: "/admin/produtos",
    icon: Package,
    role: ["ADMIN", "MANAGER", "STAFF"],
  },
  {
    title: "Pedidos",
    href: "/admin/pedidos",
    icon: ShoppingCart,
    role: ["ADMIN", "MANAGER", "STAFF"],
  },
  {
    title: "Clientes",
    href: "/admin/clientes",
    icon: Users,
    role: ["ADMIN", "MANAGER"],
  },
  {
    title: "Categorias",
    href: "/admin/categorias",
    icon: Box,
    role: ["ADMIN", "MANAGER"],
  },
  {
    title: "Fretes",
    href: "/admin/fretes",
    icon: Truck,
    role: ["ADMIN", "MANAGER"],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    role: ["ADMIN"],
  },
  {
    title: "Configurações",
    href: "/admin/configuracoes",
    icon: Settings,
    role: ["ADMIN"],
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <LoadingSkeleton />
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  const userRole = session?.user?.role || "STAFF"
  const filteredItems = sidebarItems.filter(item => 
    item.role.includes(userRole)
  )

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/login")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-white md:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-6 w-6" />
              <span className="font-semibold">Admin</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-1">
              {filteredItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2 h-5 w-5" />
                      {item.title}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={session?.user?.image || ""} />
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-2">{session?.user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              {filteredItems.find((item) => item.href === pathname)?.title ||
                "Admin"}
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-6 py-8">{children}</main>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden w-64 border-r bg-white md:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-4">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex-1 px-3 py-4">
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="border-b bg-white px-6 py-4">
          <Skeleton className="h-8 w-48" />
        </header>
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="grid gap-4">
            <Skeleton className="h-48 w-full" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
