"use client"

import { useState } from "react"
import Image from "next/image"
import { Product } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
            {product.isNew && (
              <Badge className="absolute left-2 top-2" variant="secondary">
                Novo
              </Badge>
            )}
            {product.isSale && (
              <Badge className="absolute right-2 top-2" variant="destructive">
                Oferta
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {product.category}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-bold text-primary">
                    R$ {product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    R$ {product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold">
                  R$ {product.price.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Em até 10x de R$ {(product.salePrice || product.price / 10).toFixed(2)} sem juros
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">{product.description}</p>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{product.material}</Badge>
              {product.stones && <Badge variant="outline">{product.stones}</Badge>}
              {product.dimensions && (
                <Badge variant="outline">
                  Dimensões: {product.dimensions}
                </Badge>
              )}
              {product.weight && (
                <Badge variant="outline">
                  Peso: {product.weight}
                </Badge>
              )}
            </div>
          </div>

          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button className="flex-1 gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Garantia vitalícia no banho</p>
                <p>✓ Frete grátis para todo Brasil em compras acima de R$ 299</p>
                <p>✓ Embalagem para presente</p>
                <p>✓ Troca grátis em até 30 dias</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
