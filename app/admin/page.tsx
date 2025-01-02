"use client"

import { Card } from "@/components/ui/card"
import { Loading } from "@/components/ui/loading"
import { formatPrice } from "@/lib/utils"
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  salesChange: number
  ordersChange: number
  customersChange: number
  productsChange: number
}

interface RecentOrder {
  id: string
  customer: string
  date: string
  status: string
  total: number
}

interface TopProduct {
  name: string
  sales: number
  revenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [statsRes, ordersRes, productsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/recent-orders"),
          fetch("/api/admin/top-products"),
        ])

        if (!statsRes.ok || !ordersRes.ok || !productsRes.ok) {
          throw new Error("Falha ao carregar dados do dashboard")
        }

        const [statsData, ordersData, productsData] = await Promise.all([
          statsRes.json(),
          ordersRes.json(),
          productsRes.json(),
        ])

        setStats(statsData)
        setRecentOrders(ordersData)
        setTopProducts(productsData)
      } catch (error) {
        toast.error("Erro ao carregar dados do dashboard")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  const statsCards = [
    {
      title: "Vendas Totais",
      value: formatPrice(stats?.totalSales || 0),
      icon: DollarSign,
      change: {
        value: `${stats?.salesChange || 0}%`,
        positive: (stats?.salesChange || 0) > 0,
      },
    },
    {
      title: "Pedidos",
      value: stats?.totalOrders.toString() || "0",
      icon: ShoppingCart,
      change: {
        value: `${stats?.ordersChange || 0}%`,
        positive: (stats?.ordersChange || 0) > 0,
      },
    },
    {
      title: "Clientes",
      value: stats?.totalCustomers.toString() || "0",
      icon: Users,
      change: {
        value: `${stats?.customersChange || 0}%`,
        positive: (stats?.customersChange || 0) > 0,
      },
    },
    {
      title: "Produtos",
      value: stats?.totalProducts.toString() || "0",
      icon: Package,
      change: {
        value: `${stats?.productsChange || 0}%`,
        positive: (stats?.productsChange || 0) > 0,
      },
    },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full bg-gray-100 p-3">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {stat.change.positive ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    stat.change.positive ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  vs. mês anterior
                </span>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Pedidos Recentes</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(order.total)}</p>
                  <p
                    className={`text-sm ${
                      order.status === "PENDING"
                        ? "text-yellow-500"
                        : order.status === "PAID"
                        ? "text-green-500"
                        : order.status === "SHIPPED"
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {order.status === "PENDING"
                      ? "Pendente"
                      : order.status === "PAID"
                      ? "Pago"
                      : order.status === "SHIPPED"
                      ? "Enviado"
                      : "Entregue"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Produtos Mais Vendidos</h2>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.sales} vendas
                  </p>
                </div>
                <p className="font-medium">{formatPrice(product.revenue)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
