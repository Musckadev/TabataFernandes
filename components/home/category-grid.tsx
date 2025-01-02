import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const categories = [
  {
    name: "Eletrônicos",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147",
    href: "/categoria/eletronicos",
  },
  {
    name: "Moda",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    href: "/categoria/moda",
  },
  {
    name: "Casa",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
    href: "/categoria/casa",
  },
  {
    name: "Esporte",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    href: "/categoria/esporte",
  },
  {
    name: "Beleza",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    href: "/categoria/beleza",
  },
  {
    name: "Livros",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    href: "/categoria/livros",
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <Link key={category.name} href={category.href}>
          <Card className="group relative aspect-square overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20">
              <div className="absolute bottom-0 p-4">
                <h3 className="font-semibold text-card-foreground">
                  {category.name}
                </h3>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}