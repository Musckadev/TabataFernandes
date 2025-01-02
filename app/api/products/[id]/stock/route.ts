import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [product] = await query(
      "SELECT inStock, stockQuantity FROM products WHERE id = ?",
      [params.id]
    )

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      inStock: product.inStock,
      availableQuantity: product.stockQuantity || 0
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
