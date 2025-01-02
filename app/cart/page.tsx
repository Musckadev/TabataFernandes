"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import { formatPrice } from "@/lib/utils"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] py-16">
        <div className="rounded-full bg-gray-100 p-3 mb-4">
          <ShoppingBag className="h-6 w-6 text-gray-500" />
        </div>
        <h2 className="text-xl font-medium text-gray-900 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-6">Explore nossa loja e encontre produtos incríveis</p>
        <Link href="/products">
          <Button>
            Continuar Comprando
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Carrinho de Compras</h1>
        <Link href="/products">
          <Button variant="outline" className="text-sm">
            Continuar Comprando
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">
                          <Link href={`/product/${item.slug}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.salePrice ? (
                            <span className="flex items-center gap-2">
                              <span className="text-gray-900 font-medium">{formatPrice(item.salePrice)}</span>
                              <span className="text-sm text-gray-500 line-through">{formatPrice(item.price)}</span>
                            </span>
                          ) : (
                            formatPrice(item.price)
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-medium text-gray-900">
                          {formatPrice((item.salePrice || item.price) * item.quantity)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="w-12 text-center">
                          <span className="text-sm font-medium">{item.quantity}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Resumo do Pedido</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                {subtotal >= 299 && (
                  <div className="rounded-lg bg-green-50 p-4 text-green-800">
                    <p className="text-sm font-medium">Parabéns! Você ganhou Frete Grátis</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Finalizar Compra
                </Button>
              </Link>
              <div className="mt-4">
                <p className="text-sm text-gray-500 text-center">
                  Frete grátis em compras acima de {formatPrice(299)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
