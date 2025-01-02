"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface ProductFiltersProps {
  minPrice?: number
  maxPrice?: number
  onFilter: (filters: FilterState) => void
  defaultFilters?: FilterState
}

interface FilterState {
  priceRange: [number, number]
  collections: string[]
  materials: string[]
  onSale: boolean
  inStock: boolean
}

const collections = [
  "Clássica",
  "Moderna",
  "Vintage",
  "Minimalista",
  "Luxo",
]

const materials = [
  "Ouro 18k",
  "Prata 925",
  "Aço Inoxidável",
  "Zircônia",
  "Pérola",
]

export function ProductFilters({
  minPrice = 0,
  maxPrice = 1000,
  onFilter,
  defaultFilters,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [minPrice, maxPrice],
    collections: [],
    materials: [],
    onSale: false,
    inStock: false,
    ...defaultFilters,
  })

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: value as [number, number],
    }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleCollectionToggle = (collection: string) => {
    const newCollections = filters.collections.includes(collection)
      ? filters.collections.filter((c) => c !== collection)
      : [...filters.collections, collection]

    const newFilters = {
      ...filters,
      collections: newCollections,
    }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleMaterialToggle = (material: string) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material]

    const newFilters = {
      ...filters,
      materials: newMaterials,
    }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleCheckboxChange = (key: keyof FilterState) => {
    const newFilters = {
      ...filters,
      [key]: !filters[key],
    }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilters = () => {
    const newFilters: FilterState = {
      priceRange: [minPrice, maxPrice],
      collections: [],
      materials: [],
      onSale: false,
      inStock: false,
    }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filtros</h3>
        <Button variant="ghost" onClick={clearFilters} className="h-8 text-sm">
          Limpar
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Faixa de Preço</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                min={minPrice}
                max={maxPrice}
                step={10}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between text-sm">
                <span>R$ {filters.priceRange[0]}</span>
                <span>R$ {filters.priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="collections">
          <AccordionTrigger>Coleções</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {collections.map((collection) => (
                <div key={collection} className="flex items-center space-x-2">
                  <Checkbox
                    id={collection}
                    checked={filters.collections.includes(collection)}
                    onCheckedChange={() => handleCollectionToggle(collection)}
                  />
                  <label
                    htmlFor={collection}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {collection}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materials">
          <AccordionTrigger>Materiais</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={material}
                    checked={filters.materials.includes(material)}
                    onCheckedChange={() => handleMaterialToggle(material)}
                  />
                  <label
                    htmlFor={material}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Disponibilidade</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onSale"
                  checked={filters.onSale}
                  onCheckedChange={() => handleCheckboxChange("onSale")}
                />
                <label
                  htmlFor="onSale"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Em Promoção
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock}
                  onCheckedChange={() => handleCheckboxChange("inStock")}
                />
                <label
                  htmlFor="inStock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Em Estoque
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
