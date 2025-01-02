"use client"

import Link from "next/link"
import { Search, ShoppingCart, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileNav } from "@/components/layout/mobile-nav"
import { MainNav } from "@/components/layout/main-nav"
import { useCart } from "@/components/cart/cart-context"
import { CartButton } from "@/components/cart/cart-button"

export function Header() {
  const { items } = useCart()

  const cartItemsCount = items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container text-center text-sm">
          <p>Frete Grátis nas compras acima de R$ 299 | Até 6x sem juros</p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <MobileNav />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-serif font-medium">Joalheria</span>
          </Link>

          {/* Desktop Navigation */}
          <MainNav className="hidden lg:flex" />

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Pesquisar produtos..."
                className="w-full bg-gray-50 border-gray-200 pl-10 pr-4 focus:border-gray-300 focus:ring-gray-300"
              />
            </div>
            <nav className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100" asChild>
                <Link href="/favoritos">
                  <Heart className="h-5 w-5 text-gray-600" />
                  <span className="sr-only">Favoritos</span>
                </Link>
              </Button>
              <CartButton />
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Search - Shown below header on mobile */}
      <div className="border-b border-gray-200 py-3 lg:hidden">
        <div className="container">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Pesquisar produtos..."
              className="w-full bg-gray-50 border-gray-200 pl-10 pr-4 focus:border-gray-300 focus:ring-gray-300"
            />
          </div>
        </div>
      </div>
    </header>
  )
}