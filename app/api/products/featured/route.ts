import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get("limit")) || 8
    const category = searchParams.get("category")
    const collection = searchParams.get("collection")

    const where = {
      featured: true,
      ...(category && { category }),
      ...(collection && { collection }),
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        images: {
          orderBy: {
            position: 'asc'
          }
        },
        sizes: true,
      },
      orderBy: [
        { soldCount: 'desc' },
        { rating: 'desc' },
      ],
      take: limit,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("[PRODUCTS_FEATURED_GET]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
