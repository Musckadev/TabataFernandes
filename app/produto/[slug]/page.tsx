"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/cart-context"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      images: product.images,
      price: product.price,
      salePrice: product.salePrice
    })
  }

  return (
    <div className="container py-10">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product gallery */}
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={600}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <div className="flex items-center gap-3">
              {product.salePrice ? (
                <>
                  <p className="text-3xl font-bold tracking-tight text-gray-900">
                    {formatPrice(product.salePrice)}
                  </p>
                  <p className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </p>
                </>
              ) : (
                <p className="text-3xl font-bold tracking-tight text-gray-900">
                  {formatPrice(product.price)}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Adicionar ao carrinho
              </Button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
