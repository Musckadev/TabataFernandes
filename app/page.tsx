"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"
import { HeroCarousel } from "@/components/home/hero-carousel"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero Banner */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Categorias */}
      <section className="relative overflow-hidden bg-gray-100 px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nossas Categorias</h2>
          <p className="mt-4 text-lg text-gray-600">Explore nossa coleção exclusiva de semijoias</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          <Link href="/produtos?categoria=colares" className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
              alt="Colares"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Colares</h3>
                <p className="text-sm text-white/80">Elegância para seu dia a dia</p>
              </div>
            </div>
          </Link>
          <Link href="/produtos?categoria=brincos" className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
              alt="Brincos"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Brincos</h3>
                <p className="text-sm text-white/80">Realce sua beleza natural</p>
              </div>
            </div>
          </Link>
          <Link href="/produtos?categoria=pulseiras" className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1611085583191-a3b181a88401"
              alt="Pulseiras"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Pulseiras</h3>
                <p className="text-sm text-white/80">Charme em cada detalhe</p>
              </div>
            </div>
          </Link>
          <Link href="/produtos?categoria=aneis" className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e"
              alt="Anéis"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Anéis</h3>
                <p className="text-sm text-white/80">Símbolos de sofisticação</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Lançamentos */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Lançamentos</h2>
            <p className="mt-2 text-gray-600">Conheça nossas novidades</p>
          </div>
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/produtos?tipo=lancamentos">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            product={{
              id: "1",
              name: "Colar Banhado a Ouro com Zircônia",
              price: 159.99,
              images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"],
              category: "Colares",
              rating: 4.8,
              description: "Colar delicado banhado a ouro 18k com pingente cravejado em zircônia",
              material: "Banho de Ouro 18k",
              stones: "Zircônia",
              reviews: 28,
              isNew: true
            }}
          />
          <ProductCard
            product={{
              id: "5",
              name: "Conjunto Elegance",
              price: 299.99,
              images: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9"],
              category: "Conjuntos",
              rating: 5.0,
              description: "Conjunto de colar e brincos com zircônias e banho de ouro rosé",
              material: "Banho de Ouro Rosé",
              stones: "Zircônia",
              reviews: 12,
              isNew: true
            }}
          />
          <ProductCard
            product={{
              id: "6",
              name: "Bracelete Infinito",
              price: 129.99,
              images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0"],
              category: "Pulseiras",
              rating: 4.9,
              description: "Bracelete ajustável com design infinito e acabamento em ródio",
              material: "Ródio",
              stones: "Cristal",
              reviews: 8,
              isNew: true
            }}
          />
          <ProductCard
            product={{
              id: "7",
              name: "Brinco Cascata",
              price: 179.99,
              images: ["https://images.unsplash.com/photo-1635767798638-3665c671c0bb"],
              category: "Brincos",
              rating: 4.7,
              description: "Brinco longo estilo cascata com zircônias e banho de ouro",
              material: "Banho de Ouro 18k",
              stones: "Zircônia",
              reviews: 15,
              isNew: true
            }}
          />
        </div>
      </section>

      {/* Mais Vendidos */}
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mais Vendidos</h2>
            <p className="mt-2 text-gray-600">As escolhas favoritas das nossas clientes</p>
          </div>
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/produtos?tipo=mais-vendidos">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            product={{
              id: "8",
              name: "Gargantilha Delicada",
              price: 89.99,
              images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"],
              category: "Colares",
              rating: 4.9,
              description: "Gargantilha fina com pingente de coração cravejado",
              material: "Banho de Ouro 18k",
              stones: "Zircônia",
              reviews: 156
            }}
          />
          <ProductCard
            product={{
              id: "9",
              name: "Anel Solitário Classic",
              price: 149.99,
              images: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9"],
              category: "Anéis",
              rating: 4.8,
              description: "Anel solitário clássico com zircônia central",
              material: "Ródio",
              stones: "Zircônia",
              reviews: 98
            }}
          />
          <ProductCard
            product={{
              id: "10",
              name: "Brinco Argola Cravejada",
              price: 119.99,
              images: ["https://images.unsplash.com/photo-1632740913784-b8e2c06c4850"],
              category: "Brincos",
              rating: 4.7,
              description: "Argola média cravejada com zircônias",
              material: "Banho de Ouro 18k",
              stones: "Zircônia",
              reviews: 87
            }}
          />
          <ProductCard
            product={{
              id: "11",
              name: "Pulseira Veneziana",
              price: 79.99,
              images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a"],
              category: "Pulseiras",
              rating: 4.8,
              description: "Pulseira estilo veneziana com pingente",
              material: "Banho de Ouro 18k",
              reviews: 124
            }}
          />
        </div>
      </section>

      {/* Promoções */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Promoções</h2>
            <p className="mt-2 text-gray-600">Aproveite nossos descontos especiais</p>
          </div>
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/produtos?tipo=promocoes">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            product={{
              id: "12",
              name: "Conjunto Festa",
              price: 399.99,
              images: ["https://images.unsplash.com/photo-1599643477877-530eb83abc8e"],
              category: "Conjuntos",
              rating: 4.6,
              description: "Conjunto completo para festas com colar e brincos",
              material: "Ródio",
              stones: "Zircônia",
              reviews: 45,
              isSale: true,
              salePrice: 299.99
            }}
          />
          <ProductCard
            product={{
              id: "2",
              name: "Brinco Gota Cristal",
              price: 89.99,
              images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"],
              category: "Brincos",
              rating: 4.7,
              description: "Brinco em formato gota com cristal e acabamento em ródio",
              material: "Ródio",
              stones: "Cristal",
              reviews: 15,
              isSale: true,
              salePrice: 69.99
            }}
          />
          <ProductCard
            product={{
              id: "13",
              name: "Anel Meia Aliança",
              price: 199.99,
              images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e"],
              category: "Anéis",
              rating: 4.5,
              description: "Anel meia aliança com zircônias",
              material: "Banho de Ouro 18k",
              stones: "Zircônia",
              reviews: 34,
              isSale: true,
              salePrice: 149.99
            }}
          />
          <ProductCard
            product={{
              id: "14",
              name: "Tornozeleira Boho",
              price: 59.99,
              images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a"],
              category: "Tornozeleiras",
              rating: 4.4,
              description: "Tornozeleira estilo boho com pingentes",
              material: "Banho de Ouro 18k",
              reviews: 23,
              isSale: true,
              salePrice: 39.99
            }}
          />
        </div>
      </section>

      {/* Banner Coleção Especial */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0"
              alt="Coleção Especial"
              className="h-full w-full object-cover object-center opacity-50"
              fill
            />
          </div>
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:py-20 xl:py-24">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              <span className="block mb-2">Coleção Especial</span>
              <span className="block text-yellow-400">Banhado a Ouro 18k</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-gray-100">
              Descubra nossa nova coleção de semijoias banhadas a ouro 18k. 
              Peças exclusivas com acabamento premium e garantia de qualidade.
            </p>
            <Button asChild className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900">
              <Link href="/produtos?colecao=especial">
                Ver Coleção
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}