import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { productSchema } from "@/lib/validations"

export async function GET() {
  try {
    const products = await query("SELECT * FROM products")
    return NextResponse.json(products)
  } catch (error) {
    console.error("Database error:", error)
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
    
    const result = await query(
      `INSERT INTO products (
        name, description, price, salePrice, category,
        collection, material, images, inStock, isNew,
        isSale, sizes, featured, slug, stones,
        rating, reviews, soldCount, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        validatedData.name,
        validatedData.description,
        validatedData.price,
        validatedData.salePrice,
        validatedData.category,
        validatedData.collection,
        validatedData.material,
        JSON.stringify(validatedData.images),
        validatedData.inStock,
        validatedData.isNew,
        validatedData.isSale,
        JSON.stringify(validatedData.sizes),
        validatedData.featured,
        validatedData.slug,
        JSON.stringify(validatedData.stones),
        validatedData.rating,
        validatedData.reviews,
        validatedData.soldCount,
        validatedData.createdAt || new Date().toISOString()
      ]
    )
    
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    if (error.name === "ZodError") {
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
