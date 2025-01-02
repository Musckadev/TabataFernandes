"use client"

import type { Product } from "@/data/products"
import { products } from "@/data/products"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  category?: string
  filterMaterial?: string
  filterStones?: string
  priceRange?: [number, number]
  isNew?: boolean
  isSale?: boolean
}

export function ProductGrid({
  category,
  filterMaterial,
  filterStones,
  priceRange,
  isNew,
  isSale,
}: ProductGridProps) {
  let filteredProducts: Product[] = [...products]

  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    )
  }

  if (filterMaterial) {
    filteredProducts = filteredProducts.filter(
      (product) => product.material === filterMaterial
    )
  }

  if (filterStones) {
    filteredProducts = filteredProducts.filter(
      (product) => product.stones === filterStones
    )
  }

  if (priceRange) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
  }

  if (isNew) {
    filteredProducts = filteredProducts.filter((product) => product.isNew)
  }

  if (isSale) {
    filteredProducts = filteredProducts.filter((product) => product.isSale)
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
