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
    stones: ["Zircônia"]
  },
  {
    id: "2",
    name: "Brinco Argola Dourada",
    description: "Brinco argola em ouro 18k",
    price: 899.90,
    category: "Brincos",
    collection: "Moderna",
    material: "Ouro 18k",
    images: [
      "https://source.unsplash.com/random/800x800?jewelry,earring&1"
    ],
    inStock: true,
    isNew: false,
    isSale: false,
    sizes: ["Único"],
    featured: false,
    slug: generateSlug("Brinco Argola Dourada"),
    stones: []
  },
  {
    id: "3",
    name: "Anel Solitário Diamante",
    description: "Anel solitário em ouro 18k com diamante",
    price: 2999.90,
    category: "Anéis",
    collection: "Luxo",
    material: "Ouro 18k",
    images: [
      "https://source.unsplash.com/random/800x800?jewelry,ring&1",
      "https://source.unsplash.com/random/800x800?jewelry,ring&2",
      "https://source.unsplash.com/random/800x800?jewelry,ring&3"
    ],
    inStock: false,
    isNew: false,
    isSale: false,
    sizes: ["Único"],
    featured: false,
    slug: generateSlug("Anel Solitário Diamante"),
    stones: ["Diamante"]
  }
]
