"use client"

import { Product } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { cartItemSchema } from "@/lib/validations"

export type CartItem = Product & { quantity: number }

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  shipping: number
  total: number
  isLoading: boolean
  error: string | null
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  subtotal: 0,
  shipping: 0,
  total: 0,
  isLoading: false,
  error: null,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [shipping] = useState(0) // Frete grátis por enquanto
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Carregar itens do localStorage
    try {
      const savedItems = localStorage.getItem("cart")
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems)
        // Validar cada item
        parsedItems.forEach((item: CartItem) => {
          cartItemSchema.parse({ productId: item.id, quantity: item.quantity })
        })
        setItems(parsedItems)
      }
    } catch (error) {
      console.error("Error loading cart:", error)
      setError("Erro ao carregar o carrinho")
      toast.error("Erro ao carregar o carrinho")
    }
  }, [])

  useEffect(() => {
    try {
      // Calcular subtotal e total
      const newSubtotal = items.reduce((acc, item) => {
        const price = item.salePrice || item.price
        return acc + price * item.quantity
      }, 0)
      setSubtotal(newSubtotal)
      setTotal(newSubtotal + shipping)

      // Salvar no localStorage
      localStorage.setItem("cart", JSON.stringify(items))
    } catch (error) {
      console.error("Error saving cart:", error)
      setError("Erro ao salvar o carrinho")
      toast.error("Erro ao salvar o carrinho")
    }
  }, [items, shipping])

  const addToCart = async (product: Product) => {
    try {
      setIsLoading(true)
      setError(null)

      // Verificar estoque
      const response = await fetch(`/api/products/${product.id}/stock`)
      const { inStock, availableQuantity } = await response.json()

      if (!inStock) {
        toast.error("Produto fora de estoque")
        return
      }

      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === product.id)
        if (existingItem) {
          // Verificar se não excede o estoque
          if (existingItem.quantity + 1 > availableQuantity) {
            toast.error(`Apenas ${availableQuantity} unidades disponíveis`)
            return currentItems
          }
          
          return currentItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return [...currentItems, { ...product, quantity: 1 }]
      })

      toast.success("Produto adicionado ao carrinho")
    } catch (error) {
      console.error("Error adding to cart:", error)
      setError("Erro ao adicionar ao carrinho")
      toast.error("Erro ao adicionar ao carrinho")
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromCart = (productId: string) => {
    try {
      setItems(currentItems => currentItems.filter(item => item.id !== productId))
      toast.success("Produto removido do carrinho")
    } catch (error) {
      console.error("Error removing from cart:", error)
      setError("Erro ao remover do carrinho")
      toast.error("Erro ao remover do carrinho")
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      setIsLoading(true)
      setError(null)

      // Verificar estoque
      const response = await fetch(`/api/products/${productId}/stock`)
      const { inStock, availableQuantity } = await response.json()

      if (!inStock) {
        toast.error("Produto fora de estoque")
        return
      }

      if (quantity > availableQuantity) {
        toast.error(`Apenas ${availableQuantity} unidades disponíveis`)
        return
      }

      setItems(currentItems =>
        currentItems.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      )
    } catch (error) {
      console.error("Error updating quantity:", error)
      setError("Erro ao atualizar quantidade")
      toast.error("Erro ao atualizar quantidade")
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = () => {
    try {
      setItems([])
      localStorage.removeItem("cart")
      toast.success("Carrinho limpo com sucesso")
    } catch (error) {
      console.error("Error clearing cart:", error)
      setError("Erro ao limpar o carrinho")
      toast.error("Erro ao limpar o carrinho")
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        total,
        isLoading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
