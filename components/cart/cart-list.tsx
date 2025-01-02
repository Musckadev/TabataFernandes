"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart/cart-context"
import { CartItem } from "./cart-item"

export function CartList() {
  const { items, subtotal, shipping, total } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    // Implementar checkout
    console.log("Checkout", { items, subtotal, shipping, total })
  }

  if (items.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Seu carrinho está vazio
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold">Resumo do pedido</h3>
        <Separator className="my-4" />
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frete</span>
            <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
        <Button onClick={handleCheckout} className="mt-6 w-full">
          Finalizar compra
        </Button>
      </Card>
    </div>
  )
}
