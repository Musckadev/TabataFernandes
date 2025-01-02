import { Product } from "@/types"

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Dados dos produtos
export const products: Product[] = [
  {
    id: "1",
    name: "Colar Delicado Coração",
    description: "Um colar delicado com pingente de coração em prata 925",
    price: 129.90,
    category: "Colares",
    collection: "Romântica",
    material: "Prata 925",
    images: ["/images/products/colar-coracao-1.jpg"],
    inStock: true,
    isNew: true,
    isSale: false,
    sizes: ["Único"],
    featured: false,
    slug: "colar-delicado-coracao",
    stones: ["Zircônia"],
    rating: 4.5,
    reviews: 12,
    soldCount: 25,
    createdAt: "2024-01-01"
  },
  {
    id: "2",
    name: "Brinco Argola Dourada",
    description: "Brinco de argola dourada em aço inoxidável",
    price: 79.90,
    category: "Brincos",
    collection: "Moderna",
    material: "Aço Inoxidável",
    images: ["/images/products/brinco-argola-1.jpg"],
    inStock: true,
    isNew: false,
    isSale: false,
    sizes: ["Único"],
    featured: true,
    slug: "brinco-argola-dourada",
    stones: [],
    rating: 4.8,
    reviews: 8,
    soldCount: 15,
    createdAt: "2024-01-02"
  },
  {
    id: "3",
    name: "Anel Solitário Diamante",
    description: "Anel solitário em ouro 18k com diamante",
    price: 2999.90,
    category: "Anéis",
    collection: "Luxo",
    material: "Ouro 18k",
    images: ["/images/products/anel-solitario-1.jpg"],
    inStock: false,
    isNew: false,
    isSale: false,
    sizes: ["Único"],
    featured: true,
    slug: "anel-solitario-diamante",
    stones: ["Diamante"],
    rating: 5.0,
    reviews: 3,
    soldCount: 5,
    createdAt: "2024-01-03"
  }
]
