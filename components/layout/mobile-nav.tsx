"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, Grid, Tag, BookOpen, Mail, User, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartButton } from "@/components/cart/cart-button"

const items = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Lançamentos",
    href: "/lancamentos",
    icon: Package,
  },
  {
    title: "Colares",
    href: "/colares",
    icon: Grid,
  },
  {
    title: "Brincos",
    href: "/brincos",
    icon: Grid,
  },
  {
    title: "Anéis",
    href: "/aneis",
    icon: Grid,
  },
  {
    title: "Pulseiras",
    href: "/pulseiras",
    icon: Grid,
  },
  {
    title: "Promoções",
    href: "/promocoes",
    icon: Tag,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <CartButton />
          </div>

          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="flex flex-col gap-2">
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-accent",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}