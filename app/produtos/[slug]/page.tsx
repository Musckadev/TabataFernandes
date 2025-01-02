import Image from "next/image"
import { Star, Truck, Shield, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductDetails } from "@/components/product/product-details"
import { notFound } from "next/navigation"
import { products } from "@/data/products"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Imagens do Produto */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-square cursor-pointer overflow-hidden rounded-md border hover:border-primary">
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="ml-1 text-muted-foreground">
                  ({product.reviews} avaliações)
                </span>
              </div>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-3xl font-bold">R$ {product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              Em até 12x de R$ {(product.price / 12).toFixed(2)}
            </p>
          </div>

          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  )
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}
