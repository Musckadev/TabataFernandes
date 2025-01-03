import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
  try {
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

    const topProducts = await prisma.orderItem.groupBy({
      by: ["productId"],
      where: {
        order: {
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
          status: OrderStatus.DELIVERED,
        },
      },
      _sum: {
        quantity: true,
        total: true,
      },
      orderBy: {
        _sum: {
          total: "desc",
        },
      },
      take: 4,
    })

    const productsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
          select: {
            name: true,
          },
        })

        return {
          name: product?.name || "Produto Removido",
          sales: item._sum.quantity || 0,
          revenue: item._sum.total || 0,
        }
      })
    )

    return NextResponse.json(productsWithDetails)
  } catch (error) {
    console.error("[ADMIN_TOP_PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
