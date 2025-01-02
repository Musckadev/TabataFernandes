"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { products } from "@/data/products"

export default function Home() {
  // Filtrar produtos por categoria
  const newProducts = products.filter(p => p.isNew)
  const saleProducts = products.filter(p => p.isSale)

  return (
    <div className="flex flex-col gap-8 pb-8">
      <section className="relative h-[600px] w-full">
        <Image
          src="/banner.jpg"
          alt="Banner principal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-white">
          <Badge className="bg-white/10 text-white hover:bg-white/20">
            ✨ Nova Coleção
          </Badge>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Joias Elegantes
          </h1>
          <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
            Descubra nossa coleção de joias delicadas e elegantes, perfeitas para todos os momentos.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/produtos">
              Ver Produtos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Novidades</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Confira nossas últimas peças
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/produtos?filter=new" className="flex items-center gap-2">
              Ver Todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Promoções</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Aproveite nossos descontos especiais
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/produtos?filter=sale" className="flex items-center gap-2">
              Ver Todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {saleProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Categorias</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Explore nossas categorias
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/produtos" className="flex items-center gap-2">
              Ver Todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/produtos?categoria=colares"
            className="group relative h-48 overflow-hidden rounded-lg"
          >
            <Image
              src="/categoria-colares.jpg"
              alt="Colares"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Colares</h3>
            </div>
          </Link>
          <Link
            href="/produtos?categoria=brincos"
            className="group relative h-48 overflow-hidden rounded-lg"
          >
            <Image
              src="/categoria-brincos.jpg"
              alt="Brincos"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Brincos</h3>
            </div>
          </Link>
          <Link
            href="/produtos?categoria=aneis"
            className="group relative h-48 overflow-hidden rounded-lg"
          >
            <Image
              src="/categoria-aneis.jpg"
              alt="Anéis"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Anéis</h3>
            </div>
          </Link>
          <Link
            href="/produtos?categoria=pulseiras"
            className="group relative h-48 overflow-hidden rounded-lg"
          >
            <Image
              src="/categoria-pulseiras.jpg"
              alt="Pulseiras"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Pulseiras</h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}