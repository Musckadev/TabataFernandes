import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Obter dados do mês atual
    const currentDate = new Date()
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    )
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    )

    // Obter dados do mês anterior
    const firstDayOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    )
    const lastDayOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    )

    // Buscar dados do mês atual
    const [
      currentMonthSales,
      currentMonthOrders,
      currentMonthCustomers,
      totalProducts,
    ] = await Promise.all([
      // Total de vendas do mês atual
      prisma.order.aggregate({
        where: {
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
          status: "COMPLETED",
        },
        _sum: {
          total: true,
        },
      }),

      // Total de pedidos do mês atual
      prisma.order.count({
        where: {
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
      }),

      // Total de clientes do mês atual
      prisma.user.count({
        where: {
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
          role: "CUSTOMER",
        },
      }),

      // Total de produtos ativos
      prisma.product.count({
        where: {
          active: true,
        },
      }),
    ])

    // Buscar dados do mês anterior
    const [lastMonthSales, lastMonthOrders, lastMonthCustomers] =
      await Promise.all([
        // Total de vendas do mês anterior
        prisma.order.aggregate({
          where: {
            createdAt: {
              gte: firstDayOfLastMonth,
              lte: lastDayOfLastMonth,
            },
            status: "COMPLETED",
          },
          _sum: {
            total: true,
          },
        }),

        // Total de pedidos do mês anterior
        prisma.order.count({
          where: {
            createdAt: {
              gte: firstDayOfLastMonth,
              lte: lastDayOfLastMonth,
            },
          },
        }),

        // Total de clientes do mês anterior
        prisma.user.count({
          where: {
            createdAt: {
              gte: firstDayOfLastMonth,
              lte: lastDayOfLastMonth,
            },
            role: "CUSTOMER",
          },
        }),
      ])

    // Calcular variações percentuais
    const salesChange = lastMonthSales._sum.total
      ? ((currentMonthSales._sum.total || 0) - lastMonthSales._sum.total) /
        lastMonthSales._sum.total *
        100
      : 0

    const ordersChange = lastMonthOrders
      ? ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100
      : 0

    const customersChange = lastMonthCustomers
      ? ((currentMonthCustomers - lastMonthCustomers) / lastMonthCustomers) * 100
      : 0

    // Buscar total de produtos do mês anterior
    const lastMonthProducts = await prisma.product.count({
      where: {
        createdAt: {
          lte: lastDayOfLastMonth,
        },
        active: true,
      },
    })

    const productsChange = lastMonthProducts
      ? ((totalProducts - lastMonthProducts) / lastMonthProducts) * 100
      : 0

    return NextResponse.json({
      totalSales: currentMonthSales._sum.total || 0,
      totalOrders: currentMonthOrders,
      totalCustomers: currentMonthCustomers,
      totalProducts,
      salesChange: Number(salesChange.toFixed(2)),
      ordersChange: Number(ordersChange.toFixed(2)),
      customersChange: Number(customersChange.toFixed(2)),
      productsChange: Number(productsChange.toFixed(2)),
    })
  } catch (error) {
    console.error("[ADMIN_STATS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
