"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product/product-card"
import { products } from "@/data/products"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const sortOptions = [
  { label: "Mais Recentes", value: "newest" },
  { label: "Preço: Menor para Maior", value: "price-asc" },
  { label: "Preço: Maior para Menor", value: "price-desc" },
  { label: "Mais Vendidos", value: "best-sellers" },
]

const categories = [
  { label: "Anéis", value: "aneis" },
  { label: "Brincos", value: "brincos" },
  { label: "Colares", value: "colares" },
  { label: "Pulseiras", value: "pulseiras" },
  { label: "Conjuntos", value: "conjuntos" },
]

const collections = [
  { label: "Lançamentos", value: "lancamentos" },
  { label: "Clássicos", value: "classicos" },
  { label: "Verão 2024", value: "verao-2024" },
  { label: "Festa", value: "festa" },
]

const priceRanges = [
  { label: "Até R$ 99", value: "0-99" },
  { label: "R$ 100 - R$ 199", value: "100-199" },
  { label: "R$ 200 - R$ 299", value: "200-299" },
  { label: "R$ 300 ou mais", value: "300-up" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const tipo = searchParams.get("tipo")
  
  const [selectedSort, setSelectedSort] = useState("newest")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    tipo ? [tipo] : []
  )
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) {
          return false
        }
      }

      if (selectedCollections.length > 0) {
        if (!selectedCollections.includes(product.collection)) {
          return false
        }
      }

      if (selectedPriceRanges.length > 0) {
        const price = product.salePrice || product.price
        return selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number)
          if (max === 0) {
            return price >= min
          }
          return price >= min && price <= max
        })
      }

      return true
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "price-asc":
          return (a.salePrice || a.price) - (b.salePrice || b.price)
        case "price-desc":
          return (b.salePrice || b.price) - (a.salePrice || a.price)
        case "best-sellers":
          return (b.soldCount || 0) - (a.soldCount || 0)
        default:
          return b.id - a.id // newest first
      }
    })

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {tipo ? collections.find((c) => c.value === tipo)?.label : "Produtos"}
          </h1>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown for Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Label htmlFor="sort" className="text-sm font-medium">
                Ordenar por
              </Label>
              <select
                id="sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="rounded-md border-gray-200 bg-white text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Button for Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Mobile Sort */}
                  <div>
                    <h3 className="font-medium">Ordenar por</h3>
                    <RadioGroup
                      value={selectedSort}
                      onValueChange={setSelectedSort}
                      className="mt-3 space-y-3"
                    >
                      {sortOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`sort-${option.value}-mobile`}
                          />
                          <Label htmlFor={`sort-${option.value}-mobile`}>
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Mobile Categories */}
                  <div>
                    <h3 className="font-medium">Categorias</h3>
                    <div className="mt-3 space-y-3">
                      {categories.map((category) => (
                        <div
                          key={category.value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${category.value}-mobile`}
                            checked={selectedCategories.includes(category.value)}
                            onCheckedChange={(checked) => {
                              setSelectedCategories(
                                checked
                                  ? [...selectedCategories, category.value]
                                  : selectedCategories.filter(
                                      (c) => c !== category.value
                                    )
                              )
                            }}
                          />
                          <Label htmlFor={`category-${category.value}-mobile`}>
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Mobile Collections */}
                  <div>
                    <h3 className="font-medium">Coleções</h3>
                    <div className="mt-3 space-y-3">
                      {collections.map((collection) => (
                        <div
                          key={collection.value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`collection-${collection.value}-mobile`}
                            checked={selectedCollections.includes(collection.value)}
                            onCheckedChange={(checked) => {
                              setSelectedCollections(
                                checked
                                  ? [...selectedCollections, collection.value]
                                  : selectedCollections.filter(
                                      (c) => c !== collection.value
                                    )
                              )
                            }}
                          />
                          <Label htmlFor={`collection-${collection.value}-mobile`}>
                            {collection.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Mobile Price Ranges */}
                  <div>
                    <h3 className="font-medium">Faixa de Preço</h3>
                    <div className="mt-3 space-y-3">
                      {priceRanges.map((range) => (
                        <div
                          key={range.value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`price-${range.value}-mobile`}
                            checked={selectedPriceRanges.includes(range.value)}
                            onCheckedChange={(checked) => {
                              setSelectedPriceRanges(
                                checked
                                  ? [...selectedPriceRanges, range.value]
                                  : selectedPriceRanges.filter(
                                      (r) => r !== range.value
                                    )
                              )
                            }}
                          />
                          <Label htmlFor={`price-${range.value}-mobile`}>
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Desktop Filters */}
          <Card className="hidden h-fit space-y-6 p-6 md:block">
            <div>
              <h3 className="font-medium">Categorias</h3>
              <div className="mt-3 space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.value}`}
                      checked={selectedCategories.includes(category.value)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories(
                          checked
                            ? [...selectedCategories, category.value]
                            : selectedCategories.filter(
                                (c) => c !== category.value
                              )
                        )
                      }}
                    />
                    <Label htmlFor={`category-${category.value}`}>
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium">Coleções</h3>
              <div className="mt-3 space-y-3">
                {collections.map((collection) => (
                  <div
                    key={collection.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`collection-${collection.value}`}
                      checked={selectedCollections.includes(collection.value)}
                      onCheckedChange={(checked) => {
                        setSelectedCollections(
                          checked
                            ? [...selectedCollections, collection.value]
                            : selectedCollections.filter(
                                (c) => c !== collection.value
                              )
                        )
                      }}
                    />
                    <Label htmlFor={`collection-${collection.value}`}>
                      {collection.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium">Faixa de Preço</h3>
              <div className="mt-3 space-y-3">
                {priceRanges.map((range) => (
                  <div
                    key={range.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`price-${range.value}`}
                      checked={selectedPriceRanges.includes(range.value)}
                      onCheckedChange={(checked) => {
                        setSelectedPriceRanges(
                          checked
                            ? [...selectedPriceRanges, range.value]
                            : selectedPriceRanges.filter(
                                (r) => r !== range.value
                              )
                        )
                      }}
                    />
                    <Label htmlFor={`price-${range.value}`}>
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Product Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium text-gray-900">
                  Nenhum produto encontrado
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Tente ajustar os filtros para encontrar o que procura
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
