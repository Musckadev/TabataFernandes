"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { Product } from "@/types"

interface CartItemProps {
  item: Product & { quantity: number }
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart()

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(event.target.value)
    updateQuantity(item.id, newQuantity)
  }

  return (
    <Card className="flex items-start gap-4 p-4">
      {/* Imagem do Produto */}
      <div className="relative aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        {item.images.length > 0 && (
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Detalhes do Produto */}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <select
            value={item.quantity}
            onChange={handleQuantityChange}
            className="rounded-md border px-2 py-1"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <p className="font-medium">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </Card>
  )
}
