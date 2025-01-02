import { NextResponse } from "next/server"
import { query, QueryResult } from "@/lib/db"

interface StockProduct {
  inStock: boolean;
  stockQuantity: number;
}

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
