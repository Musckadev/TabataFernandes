"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { CartItem } from "./cart-item"
import { useRouter } from "next/navigation"

export function CartList() {
  const { items, subtotal, shipping, total } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-semibold">Seu carrinho está vazio</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Adicione alguns produtos para começar suas compras
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="lg:col-span-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Resumo do Pedido</h3>
          <Separator className="my-4" />
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-sm">Subtotal</span>
              <span className="text-sm font-semibold">
                R$ {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Frete</span>
              <span className="text-sm font-semibold">
                {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
              </span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
              <span className="text-base font-semibold">Total</span>
              <span className="text-base font-semibold">
                R$ {total.toFixed(2)}
              </span>
            </div>
          </div>
          <Button 
            className="w-full mt-6"
            onClick={handleCheckout}
          >
            Finalizar Compra
          </Button>
        </Card>
      </div>
    </div>
  )
}
