import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") || "desc"
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 12
    const collection = searchParams.get("collection")
    const material = searchParams.get("material")
    const minPrice = Number(searchParams.get("minPrice")) || undefined
    const maxPrice = Number(searchParams.get("maxPrice")) || undefined
    const inStock = searchParams.get("inStock") === "true"

    const where = {
      category: params.category,
      ...(collection && { collection }),
      ...(material && { material }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { lte: maxPrice } }),
      ...(inStock && { inStock: true }),
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: {
            orderBy: {
              position: 'asc'
            }
          },
          sizes: true,
        },
        orderBy: {
          [sort]: order,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    // Buscar filtros disponíveis
    const [collections, materials, prices] = await Promise.all([
      prisma.product.findMany({
        where: { category: params.category },
        select: { collection: true },
        distinct: ["collection"],
      }),
      prisma.product.findMany({
        where: { category: params.category },
        select: { material: true },
        distinct: ["material"],
      }),
      prisma.product.aggregate({
        where: { category: params.category },
        _min: { price: true },
        _max: { price: true },
      }),
    ])

    const filters = {
      collections: collections.map(c => c.collection),
      materials: materials.map(m => m.material),
      priceRange: {
        min: prices._min.price,
        max: prices._max.price,
      },
    }

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      filters,
    })
  } catch (error) {
    console.error("[PRODUCTS_CATEGORY_GET]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
