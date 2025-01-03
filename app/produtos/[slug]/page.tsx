import Image from "next/image"
import { Star, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductDetails } from "@/components/product/product-details"
import { notFound } from "next/navigation"
import { query } from "@/lib/db"
import type { Product } from "@/types"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface ProductPageProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const products = await query<Product>(
      "SELECT * FROM products WHERE slug = ?",
      [slug]
    )
    return products[0] || null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <AspectRatio ratio={1}>
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </AspectRatio>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((image, index) => (
              <AspectRatio key={index} ratio={1}>
                <Image
                  src={image.url}
                  alt={`${product.name} ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            ))}
          </div>
        </div>

        {/* Detalhes do Produto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < (product.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviewsCount || 0} avaliações)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
            {product.salePrice && (
              <p className="text-sm text-gray-500 line-through">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.salePrice)}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Frete grátis para todo o Brasil</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Garantia de 30 dias</span>
            </div>
          </div>

          <div className="space-x-2">
            {product.isNew && (
              <Badge className="bg-secondary text-secondary-foreground">Novo</Badge>
            )}
            {product.isSale && (
              <Badge className="bg-destructive text-destructive-foreground">Promoção</Badge>
            )}
          </div>

          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const products = await query<Product>("SELECT slug FROM products")
    return products.map((product) => ({
      slug: product.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}
