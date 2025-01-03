import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { productSchema, productUpdateSchema } from "@/lib/validations"
import { z } from "zod"
import { Prisma } from "@prisma/client"
import { ProductUpdateInput } from "@/types/prisma"
import { FormData, UpdateFormData } from "@/types/form"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Convert form data to match schema
    const formData: UpdateFormData = {
      ...body,
      id: params.id,
      price: body.price.toString(),
      salePrice: body.salePrice ? body.salePrice.toString() : null,
      stockQuantity: parseInt(body.stockQuantity || "0"),
      reviewsCount: body.reviewsCount || 0,
      soldCount: body.soldCount || 0,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
      rating: body.rating || null,
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

    const validatedData = productUpdateSchema.parse({
      ...formData,
      price: parseFloat(formData.price),
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null
    })

    // Verificar se o produto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        sizes: true,
        stones: true
      }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Verificar se já existe outro produto com o mesmo nome ou slug
    const duplicateProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { name: validatedData.name },
          { slug: validatedData.slug },
        ],
        NOT: {
          id: params.id,
        },
      },
    })

    if (duplicateProduct) {
      return NextResponse.json(
        { error: "Já existe outro produto com este nome ou slug" },
        { status: 400 }
      )
    }

    const updateData: ProductUpdateInput = {
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
      images: {
        deleteMany: {},
        create: validatedData.images.length > 0 ? validatedData.images : undefined
      },
      sizes: {
        deleteMany: {},
        create: validatedData.sizes.length > 0 ? validatedData.sizes : undefined
      },
      stones: validatedData.stones && validatedData.stones.length > 0 ? {
        deleteMany: {},
        create: validatedData.stones
      } : { deleteMany: {} },
      sku: validatedData.sku,
      weight: validatedData.weight,
      dimensions: validatedData.dimensions,
      metaTitle: validatedData.metaTitle,
      metaDescription: validatedData.metaDescription,
      keywords: validatedData.keywords
    }

    // Atualizar o produto
    const product = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
      include: {
        images: true,
        sizes: true,
        stones: true
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_PUT]', error)
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: true,
        sizes: true,
        stones: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_GET]', error)
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
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
        where: { productId: params.id },
      }),
      prisma.productSize.deleteMany({
        where: { productId: params.id },
      }),
      prisma.productStone.deleteMany({
        where: { productId: params.id },
      }),
      prisma.product.delete({
        where: { id: params.id },
      }),
    ])

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error)
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    )
  }
}
