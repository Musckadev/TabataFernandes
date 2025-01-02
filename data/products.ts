function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

import { Product } from "@/app/admin/produtos/columns"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice?: number
  category: string
  collection: string
  material: string
  images: string[]
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
  slug?: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Colar Delicado Coração",
    description: "Colar delicado em prata 925 com pingente de coração",
    price: 199.90,
    salePrice: 159.90,
    category: "Colares",
    collection: "Clássica",
    material: "Prata 925",
    images: [
      "https://source.unsplash.com/random/800x800?jewelry,necklace&1",
      "https://source.unsplash.com/random/800x800?jewelry,necklace&2"
    ],
    inStock: true,
    isNew: true,
    isSale: true
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
    isSale: false
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
    isSale: false
  }
]
