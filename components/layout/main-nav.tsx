"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Lançamentos",
    href: "/lancamentos",
  },
  {
    title: "Colares",
    href: "/colares",
  },
  {
    title: "Brincos",
    href: "/brincos",
  },
  {
    title: "Anéis",
    href: "/aneis",
  },
  {
    title: "Pulseiras",
    href: "/pulseiras",
  },
  {
    title: "Promoções",
    href: "/promocoes",
  },
]

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-8 text-sm font-medium", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "relative py-2 transition-colors hover:text-gray-900",
            pathname === item.href
              ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-yellow-400"
              : "text-gray-600"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}