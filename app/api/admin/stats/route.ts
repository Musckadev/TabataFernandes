import { prisma } from "@/lib/prisma"
import { OrderStatus, Role } from "@prisma/client"
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
      currentMonthUsers,
      totalProducts,
    ] = await Promise.all([
      // Total de vendas do mês atual
      prisma.order.aggregate({
        where: {
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
          status: OrderStatus.DELIVERED,
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

      // Total de usuários do mês atual
      prisma.user.count({
        where: {
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
      }),

      // Total de produtos
      prisma.product.count(),
    ])

    // Buscar dados do mês anterior
    const [lastMonthSales, lastMonthOrders, lastMonthUsers] =
      await Promise.all([
        // Total de vendas do mês anterior
        prisma.order.aggregate({
          where: {
            createdAt: {
              gte: firstDayOfLastMonth,
              lte: lastDayOfLastMonth,
            },
            status: OrderStatus.DELIVERED,
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

        // Total de usuários do mês anterior
        prisma.user.count({
          where: {
            createdAt: {
              gte: firstDayOfLastMonth,
              lte: lastDayOfLastMonth,
            },
          },
        }),
      ])

    // Calcular variações percentuais
    const salesChange = lastMonthSales._sum.total
      ? ((Number(currentMonthSales._sum.total || 0) - Number(lastMonthSales._sum.total)) /
          Number(lastMonthSales._sum.total)) *
        100
      : 0

    const ordersChange = lastMonthOrders
      ? ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100
      : 0

    const usersChange = lastMonthUsers
      ? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100
      : 0

    // Buscar total de produtos do mês anterior
    const lastMonthProducts = await prisma.product.count({
      where: {
        createdAt: {
          lte: lastDayOfLastMonth,
        },
      },
    })

    const productsChange = lastMonthProducts
      ? ((totalProducts - lastMonthProducts) / lastMonthProducts) * 100
      : 0

    return NextResponse.json({
      totalSales: currentMonthSales._sum.total || 0,
      totalOrders: currentMonthOrders,
      totalUsers: currentMonthUsers,
      totalProducts,
      salesChange: Number(salesChange.toFixed(2)),
      ordersChange: Number(ordersChange.toFixed(2)),
      usersChange: Number(usersChange.toFixed(2)),
      productsChange: Number(productsChange.toFixed(2)),
    })
  } catch (error) {
    console.error("[ADMIN_STATS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
