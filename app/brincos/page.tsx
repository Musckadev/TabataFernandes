"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product/product-card"
import { ProductFilters } from "@/components/product/product-filters"
import { products } from "@/data/products"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

export default function BrincosPage() {
  const [filteredProducts, setFilteredProducts] = useState(
    products.filter((product) => product.category === "Brincos")
  )

  const handleFilter = (filters: any) => {
    let filtered = products.filter((product) => product.category === "Brincos")

    // Filtrar por preço
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    )

    // Filtrar por coleção
    if (filters.collections.length > 0) {
      filtered = filtered.filter((product) =>
        filters.collections.includes(product.collection)
      )
    }

    // Filtrar por material
    if (filters.materials.length > 0) {
      filtered = filtered.filter((product) =>
        filters.materials.includes(product.material)
      )
    }

    // Filtrar por promoção
    if (filters.onSale) {
      filtered = filtered.filter((product) => product.isSale)
    }

    // Filtrar por estoque
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="container py-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Brincos</h1>
            <p className="text-muted-foreground">
              Descubra nossa seleção de brincos para todos os estilos
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <ProductFilters
                minPrice={0}
                maxPrice={10000}
                onFilter={handleFilter}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="hidden lg:block">
            <ProductFilters
              minPrice={0}
              maxPrice={10000}
              onFilter={handleFilter}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
