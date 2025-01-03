import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { productSchema, productUpdateSchema } from "@/lib/validations"
import { z } from "zod"
import { Prisma } from "@prisma/client"
import { ProductCreateInput } from "@/types/prisma"
import { FormData } from "@/types/form"

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

    const products = await prisma.product.findMany({
      where,
      include: {
        images: true,
        sizes: true,
        stones: true
      },
      orderBy: {
        [sort]: order
      },
      skip: (page - 1) * limit,
      take: limit
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Convert form data to match schema
    const formData: FormData = {
      ...body,
      price: body.price.toString(),
      salePrice: body.salePrice ? body.salePrice.toString() : null,
      stockQuantity: parseInt(body.stockQuantity || "0"),
      reviewsCount: 0,
      soldCount: 0,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
      rating: null,
      // Convert sizes array to match schema
      sizes: Array.isArray(body.sizes) ? body.sizes.map((size: { size: string, stockQuantity: number | string }) => ({
        size: size.size,
        stockQuantity: parseInt(size.stockQuantity.toString())
      })) : [],
      // Convert images array to match schema
      images: Array.isArray(body.images) ? body.images.map((image: { url: string, position: number }) => ({
        url: image.url,
        position: image.position
      })) : [],
      // Convert stones array to match schema
      stones: Array.isArray(body.stones) ? body.stones.map((stone: { stone: string }) => ({
        stone: stone.stone
      })) : null,
      // Optional fields
      sku: body.sku || "",
      weight: body.weight || "",
      dimensions: body.dimensions || "",
      metaTitle: body.metaTitle || "",
      metaDescription: body.metaDescription || "",
      keywords: body.keywords || ""
    }

    const validatedData = productSchema.parse({
      ...formData,
      price: parseFloat(formData.price),
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null
    })

    // Verificar se já existe um produto com o mesmo nome ou slug
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

    const createData: ProductCreateInput = {
      name: validatedData.name,
      description: validatedData.description,
      price: new Prisma.Decimal(validatedData.price),
      salePrice: validatedData.salePrice ? new Prisma.Decimal(validatedData.salePrice) : null,
      category: validatedData.category,
      collection: validatedData.collection,
      material: validatedData.material,
      stockQuantity: validatedData.stockQuantity,
      inStock: validatedData.inStock,
      isNew: validatedData.isNew,
      isSale: validatedData.isSale,
      featured: validatedData.featured,
      slug: validatedData.slug,
      rating: validatedData.rating ? new Prisma.Decimal(validatedData.rating) : null,
      reviewsCount: validatedData.reviewsCount,
      soldCount: validatedData.soldCount,
      images: validatedData.images.length > 0 ? {
        create: validatedData.images
      } : undefined,
      sizes: validatedData.sizes.length > 0 ? {
        create: validatedData.sizes
      } : undefined,
      stones: validatedData.stones && validatedData.stones.length > 0 ? {
        create: validatedData.stones
      } : undefined,
      sku: validatedData.sku,
      weight: validatedData.weight,
      dimensions: validatedData.dimensions,
      metaTitle: validatedData.metaTitle,
      metaDescription: validatedData.metaDescription,
      keywords: validatedData.keywords
    }

    // Criar o produto
    const product = await prisma.product.create({
      data: createData,
      include: {
        images: true,
        sizes: true,
        stones: true
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.log('[PRODUCTS_POST]', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation Error", details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    interface SizeInput {
      size: string
      stockQuantity: number | string
    }

    interface ImageInput {
      url: string
      position: number
    }

    interface StoneInput {
      stone: string
    }

    // Convert form data to match schema
    const formData = {
      ...body,
      price: parseFloat(body.price),
      salePrice: body.salePrice ? parseFloat(body.salePrice) : undefined,
      stockQuantity: parseInt(body.stockQuantity || "0"),
      reviewsCount: 0,
      soldCount: 0,
      // Convert sizes array to match schema
      sizes: Array.isArray(body.sizes) ? body.sizes.map((size: SizeInput) => ({
        size: size.size,
        stockQuantity: parseInt(size.stockQuantity.toString())
      })) : [],
      // Convert images array to match schema
      images: Array.isArray(body.images) ? body.images.map((image: ImageInput) => ({
        url: image.url,
        position: image.position
      })) : [],
      // Convert stones array to match schema
      stones: Array.isArray(body.stones) ? body.stones.map((stone: StoneInput) => ({
        stone: stone.stone
      })) : []
    }

    const validatedData = productUpdateSchema.parse(formData)

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
        price: new Prisma.Decimal(validatedData.price),
        salePrice: validatedData.salePrice ? new Prisma.Decimal(validatedData.salePrice) : null,
        category: validatedData.category,
        collection: validatedData.collection,
        material: validatedData.material,
        inStock: validatedData.inStock,
        isNew: validatedData.isNew,
        isSale: validatedData.isSale,
        featured: validatedData.featured,
        slug: validatedData.slug,
        rating: validatedData.rating ? new Prisma.Decimal(validatedData.rating) : null,
        soldCount: validatedData.soldCount,
        stockQuantity: parseInt(validatedData.stockQuantity.toString()),
        reviewsCount: validatedData.reviewsCount,
        images: {
          deleteMany: {},
          createMany: {
            data: validatedData.images.map(image => ({
              url: image.url,
              position: image.position
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
                stone: stone.stone
              }))
            }
          })
        },
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
    if (error instanceof z.ZodError) {
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
