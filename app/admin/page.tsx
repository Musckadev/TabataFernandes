"use client"

import { Card } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"

const stats = [
  {
    title: "Vendas Totais",
    value: "R$ 45.231,89",
    icon: DollarSign,
    change: {
      value: "12%",
      positive: true,
    },
  },
  {
    title: "Pedidos",
    value: "356",
    icon: ShoppingCart,
    change: {
      value: "8%",
      positive: true,
    },
  },
  {
    title: "Clientes",
    value: "2,345",
    icon: Users,
    change: {
      value: "5%",
      positive: true,
    },
  },
  {
    title: "Produtos",
    value: "789",
    icon: Package,
    change: {
      value: "3%",
      positive: false,
    },
  },
]

const recentOrders = [
  {
    id: "1",
    customer: "Maria Silva",
    date: "2024-01-02",
    status: "Pendente",
    total: 299.99,
  },
  {
    id: "2",
    customer: "João Santos",
    date: "2024-01-02",
    status: "Pago",
    total: 459.99,
  },
  {
    id: "3",
    customer: "Ana Oliveira",
    date: "2024-01-01",
    status: "Enviado",
    total: 189.99,
  },
  {
    id: "4",
    customer: "Pedro Costa",
    date: "2024-01-01",
    status: "Entregue",
    total: 749.99,
  },
]

const topProducts = [
  {
    name: "Colar Elegance",
    sales: 124,
    revenue: 24800,
  },
  {
    name: "Anel Glamour",
    sales: 98,
    revenue: 14700,
  },
  {
    name: "Brinco Crystal",
    sales: 85,
    revenue: 12750,
  },
  {
    name: "Pulseira Divine",
    sales: 72,
    revenue: 10800,
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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
                      order.status === "Pendente"
                        ? "text-yellow-500"
                        : order.status === "Pago"
                        ? "text-green-500"
                        : order.status === "Enviado"
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {order.status}
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
