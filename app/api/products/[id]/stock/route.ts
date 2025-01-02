import { NextResponse } from "next/server"
import { query, QueryResult } from "@/lib/db"
import { z } from "zod"

const stockSchema = z.object({
  inStock: z.boolean(),
  stockQuantity: z.number().min(0)
})

type StockProduct = z.infer<typeof stockSchema>

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const products = await query<StockProduct>(
      "SELECT inStock, stockQuantity FROM products WHERE id = ?",
      [params.id]
    )

    const product = products[0]
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    const validatedStock = stockSchema.parse(product)

    return NextResponse.json({
      inStock: validatedStock.inStock,
      availableQuantity: validatedStock.stockQuantity
    })
  } catch (error) {
    console.error("Database error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid stock data format" },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
