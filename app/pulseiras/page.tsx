"use client"

import { ProductCard } from "@/components/product/product-card"
import { products } from "@/data/products"

export default function PulseirasPage() {
  const pulseiras = products.filter((product) => product.category === "Pulseiras")

  return (
    <div className="container py-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Pulseiras</h1>
        <p className="text-muted-foreground">
          Conheça nossas pulseiras exclusivas
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pulseiras.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
