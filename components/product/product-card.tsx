import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types"
import { formatPrice } from "@/lib/utils"
import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from '@/hooks/use-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  if (!product || typeof product !== 'object' || !('id' in product)) {
    return null
  }

  const handleAddToCart = () => {
    addToCart(product) 
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`
    })
  }

  const discount = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  return (
    <Card className="group relative overflow-hidden border-0 bg-gray-50/50">
      <Link href={`/produto/${product.id}`} className="block">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {product.images && product.images.length > 0 && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            )}
            
            {/* Badges */}
            <div className="absolute left-2 right-2 top-2 flex justify-between">
              <div className="flex gap-1.5">
                {product.isNew && (
                  <Badge className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                    Novo
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-rose-500 text-white hover:bg-rose-600">
                    -{discount}%
                  </Badge>
                )}
              </div>
              <Button
                className="h-7 w-7 rounded-full bg-white/80 backdrop-blur hover:bg-white"
              >
                <Heart className="h-3.5 w-3.5" />
                <span className="sr-only">Adicionar aos favoritos</span>
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Product Info */}
        <CardFooter className="flex flex-col items-start gap-1.5 p-3">
          {/* Title */}
          <h3 className="line-clamp-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-1.5">
            {product.salePrice ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-gray-900">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-base font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {product.material && (
              <Badge className="bg-gray-100 text-xs text-gray-700 hover:bg-gray-200">
                {product.material}
              </Badge>
            )}
            {product.stones && (
              <Badge className="bg-gray-100 text-xs text-gray-700 hover:bg-gray-200">
                {product.stones}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Link>

      {/* Add to Cart Button - Always visible */}
      <div className="px-3 pb-3">
        <Button
          className="w-full bg-gray-900 text-white hover:bg-gray-800"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-3.5 w-3.5" />
          Adicionar
        </Button>
      </div>
    </Card>
  )
}