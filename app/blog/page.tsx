import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

const posts = [
  {
    title: "Tendências de Moda para 2024",
    excerpt: "Descubra as principais tendências que vão dominar o mundo da moda no próximo ano...",
    image: "/images/blog/fashion-trends.jpg",
    author: "Maria Silva",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Moda",
    slug: "tendencias-moda-2024"
  },
  {
    title: "Como Montar um Guarda-Roupa Cápsula",
    excerpt: "Aprenda a criar um guarda-roupa versátil e sustentável com peças essenciais...",
    image: "/images/blog/capsule-wardrobe.jpg",
    author: "João Santos",
    date: "2024-01-10",
    readTime: "7 min",
    category: "Estilo",
    slug: "guarda-roupa-capsula"
  },
  {
    title: "Dicas de Cuidados com Roupas",
    excerpt: "Confira as melhores práticas para manter suas roupas em ótimo estado por mais tempo...",
    image: "/images/blog/clothes-care.jpg",
    author: "Ana Oliveira",
    date: "2024-01-05",
    readTime: "4 min",
    category: "Dicas",
    slug: "cuidados-roupas"
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground">
          Dicas, tendências e novidades do mundo da moda
        </p>
      </div>

      {/* Featured Post */}
      <Link href={`/blog/${posts[0].slug}`} className="block mb-12">
        <Card className="group relative overflow-hidden">
          <div className="relative aspect-[21/9]">
            <Image
              src={posts[0].image}
              alt={posts[0].title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge className="mb-3">{posts[0].category}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {posts[0].title}
              </h2>
              <p className="text-white/90 mb-4 max-w-2xl">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{posts[0].author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(posts[0].date).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{posts[0].readTime} de leitura</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Post Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(1).map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="group overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <Badge className="mb-2">{post.category}</Badge>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
