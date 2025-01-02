"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { Product } from "@/types"

interface CartItemProps {
  item: Product & { quantity: number }
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const price = item.salePrice || item.price

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-lg">
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.material}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                className="h-8 w-16 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                R$ {(price * item.quantity).toFixed(2)}
              </p>
              {item.quantity > 1 && (
                <p className="text-sm text-muted-foreground">
                  R$ {price.toFixed(2)} cada
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
