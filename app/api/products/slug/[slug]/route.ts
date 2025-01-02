import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        images: {
          orderBy: {
            position: 'asc'
          }
        },
        sizes: true,
        stones: true,
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Buscar produtos relacionados
    const relatedProducts = await prisma.product.findMany({
      where: {
        OR: [
          { category: product.category },
          { collection: product.collection },
        ],
        NOT: {
          id: product.id,
        },
      },
      include: {
        images: {
          orderBy: {
            position: 'asc'
          }
        },
        sizes: true,
      },
      take: 4,
    })

    return NextResponse.json({ product, relatedProducts })
  } catch (error) {
    console.error("[PRODUCT_SLUG_GET]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
