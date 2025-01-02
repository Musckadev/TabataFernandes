import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    })

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      customer: order.user.name,
      date: order.createdAt.toISOString().split("T")[0],
      status: order.status,
      total: order.total,
    }))

    return NextResponse.json(formattedOrders)
  } catch (error) {
    console.error("[ADMIN_RECENT_ORDERS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
