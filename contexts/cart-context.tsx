"use client"

import { Product } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"

export type CartProduct = Pick<Product, 'id' | 'name' | 'price' | 'salePrice' | 'images' | 'slug'>

interface CartItem extends CartProduct {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: CartProduct) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemsCount: number
  subtotal: number
  shipping: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: CartProduct) => {
    console.log('Adding item to cart:', product);
    setItems(currentItems => {
      console.log('Current items:', currentItems);
      const existingItem = currentItems.find(item => item.id === product.id)
      
      if (existingItem) {
        console.log('Updating existing item quantity');
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      console.log('Adding new item');
      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemsCount = items.reduce((total, item) => total + item.quantity, 0)
  
  const subtotal = items.reduce(
    (total, item) => total + (item.salePrice || item.price) * item.quantity,
    0
  )

  const shipping = subtotal > 299 ? 0 : 19.90
  const total = subtotal + shipping

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemsCount,
        subtotal,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
