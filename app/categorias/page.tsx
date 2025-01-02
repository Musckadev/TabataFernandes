import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const categories = [
  {
    name: "Colares",
    image: "/images/categories/colares.jpg",
    count: 45,
    href: "/produtos?categoria=colares",
    description: "Colares delicados e elegantes banhados a ouro"
  },
  {
    name: "Anéis",
    image: "/images/categories/aneis.jpg",
    count: 38,
    href: "/produtos?categoria=aneis",
    description: "Anéis sofisticados para todas as ocasiões"
  },
  {
    name: "Brincos",
    image: "/images/categories/brincos.jpg",
    count: 52,
    href: "/produtos?categoria=brincos",
    description: "Brincos exclusivos com acabamento premium"
  },
  {
    name: "Pulseiras",
    image: "/images/categories/pulseiras.jpg",
    count: 33,
    href: "/produtos?categoria=pulseiras",
    description: "Pulseiras delicadas com banho de ouro"
  },
  {
    name: "Conjuntos",
    image: "/images/categories/conjuntos.jpg",
    count: 28,
    href: "/produtos?categoria=conjuntos",
    description: "Conjuntos completos para ocasiões especiais"
  },
  {
    name: "Berloques",
    image: "/images/categories/berloques.jpg",
    count: 65,
    href: "/produtos?categoria=berloques",
    description: "Berloques e pingentes para personalizar suas joias"
  }
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categorias</h1>
        <p className="text-muted-foreground">
          Explore nossa coleção exclusiva de semijoias
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="group relative overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/90 mb-2">
                    {category.description}
                  </p>
                  <p className="text-sm text-white/80">
                    {category.count} produtos
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
