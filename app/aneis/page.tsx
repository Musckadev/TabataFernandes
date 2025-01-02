"use client"

import { ProductCard } from "@/components/product/product-card"
import { products } from "@/data/products"

export default function AneisPage() {
  const aneis = products.filter((product) => product.category === "Anéis")

  return (
    <div className="container py-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Anéis</h1>
        <p className="text-muted-foreground">
          Encontre o anel perfeito para cada ocasião
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {aneis.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
