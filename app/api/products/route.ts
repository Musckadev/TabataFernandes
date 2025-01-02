import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { productSchema } from "@/lib/validations"
import { Product } from "@/types"
import { ZodError } from "zod"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const collection = searchParams.get("collection")
    const featured = searchParams.get("featured") === "true"
    const isNew = searchParams.get("isNew") === "true"
    const isSale = searchParams.get("isSale") === "true"
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") || "desc"
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10

    const where = {
      ...(category && { category }),
      ...(collection && { collection }),
      ...(featured && { featured }),
      ...(isNew && { isNew }),
      ...(isSale && { isSale }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { category: { contains: search, mode: "insensitive" } },
          { collection: { contains: search, mode: "insensitive" } },
        ],
      }),
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
          stones: true,
        },
        orderBy: {
          [sort]: order,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("[PRODUCTS_GET]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)
    
    const existingProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { name: validatedData.name },
          { slug: validatedData.slug },
        ],
      },
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: "Já existe um produto com este nome ou slug" },
        { status: 400 }
      )
    }
    
    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        salePrice: validatedData.salePrice,
        category: validatedData.category,
        collection: validatedData.collection,
        material: validatedData.material,
        stockQuantity: validatedData.stockQuantity,
        inStock: validatedData.inStock,
        isNew: validatedData.isNew,
        isSale: validatedData.isSale,
        featured: validatedData.featured,
        slug: validatedData.slug,
        rating: validatedData.rating,
        reviewsCount: validatedData.reviewsCount,
        soldCount: validatedData.soldCount,
        images: {
          createMany: {
            data: validatedData.images.map((url, index) => ({
              url,
              position: index
            }))
          }
        },
        sizes: {
          createMany: {
            data: validatedData.sizes.map(size => ({
              size: size.size,
              stockQuantity: size.stockQuantity
            }))
          }
        },
        ...(validatedData.stones && {
          stones: {
            createMany: {
              data: validatedData.stones.map(stone => ({
                stone
              }))
            }
          }
        })
      },
      include: {
        images: true,
        sizes: true,
        stones: true
      }
    })
    
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("[PRODUCTS_POST]", error)
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation Error", details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)
    
    const existingProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { name: validatedData.name },
          { slug: validatedData.slug },
        ],
        NOT: {
          id: validatedData.id,
        },
      },
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: "Já existe outro produto com este nome ou slug" },
        { status: 400 }
      )
    }
    
    const product = await prisma.product.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        salePrice: validatedData.salePrice,
        category: validatedData.category,
        collection: validatedData.collection,
        material: validatedData.material,
        stockQuantity: validatedData.stockQuantity,
        inStock: validatedData.inStock,
        isNew: validatedData.isNew,
        isSale: validatedData.isSale,
        featured: validatedData.featured,
        slug: validatedData.slug,
        rating: validatedData.rating,
        reviewsCount: validatedData.reviewsCount,
        soldCount: validatedData.soldCount,
        images: {
          deleteMany: {},
          createMany: {
            data: validatedData.images.map((url, index) => ({
              url,
              position: index
            }))
          }
        },
        sizes: {
          deleteMany: {},
          createMany: {
            data: validatedData.sizes.map(size => ({
              size: size.size,
              stockQuantity: size.stockQuantity
            }))
          }
        },
        stones: {
          deleteMany: {},
          ...(validatedData.stones && {
            createMany: {
              data: validatedData.stones.map(stone => ({
                stone
              }))
            }
          })
        }
      },
      include: {
        images: true,
        sizes: true,
        stones: true
      }
    })
    
    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCTS_PUT]", error)
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation Error", details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }

    // Verificar se o produto existe
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Deletar o produto e seus relacionamentos
    await prisma.$transaction([
      prisma.productImage.deleteMany({
        where: { productId: id },
      }),
      prisma.productSize.deleteMany({
        where: { productId: id },
      }),
      prisma.productStone.deleteMany({
        where: { productId: id },
      }),
      prisma.product.delete({
        where: { id },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[PRODUCTS_DELETE]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
