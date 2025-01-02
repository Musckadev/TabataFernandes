import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { productSchema } from "@/lib/validations"
import { ZodError } from "zod"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
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

    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCT_GET]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)

    // Verificar se o produto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
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

    // Atualizar o produto
    const product = await prisma.product.update({
      where: { id: params.id },
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
    console.error("[PRODUCT_PUT]", error)
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o produto existe
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
