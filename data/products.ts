function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  material: string
  stones?: string
  dimensions?: string
  weight?: string
  isNew?: boolean
  isSale?: boolean
  salePrice?: number
  rating: number
  reviews: number
  stock?: number
  soldCount?: number
  slug: string
  collection?: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Colar Banhado a Ouro com Zircônia",
    price: 159.99,
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"],
    category: "Colares",
    rating: 4.8,
    description: "Colar delicado banhado a ouro 18k com pingente cravejado em zircônia",
    material: "Banho de Ouro 18k",
    stones: "Zircônia",
    dimensions: "45cm + extensor de 5cm",
    weight: "3.2g",
    reviews: 28,
    isNew: true,
    collection: "lancamentos",
    slug: generateSlug("Colar Banhado a Ouro com Zircônia")
  },
  {
    id: "2",
    name: "Brinco Gota Cristal",
    price: 89.99,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"],
    category: "Brincos",
    rating: 4.7,
    description: "Brinco em formato gota com cristal e acabamento em ródio",
    material: "Ródio",
    stones: "Cristal",
    dimensions: "2.5cm x 1cm",
    weight: "2.8g",
    reviews: 15,
    isSale: true,
    salePrice: 69.99,
    collection: "classicos",
    slug: generateSlug("Brinco Gota Cristal")
  },
  {
    id: "colar-veneziana-ouro",
    name: "Colar Veneziana Banhado a Ouro 18k",
    description: "Colar elegante com corrente estilo veneziana, banho de ouro 18k, ideal para uso diário ou ocasiões especiais.",
    price: 189.90,
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478527-c3c5866a3b45?auto=format&fit=crop&q=80"
    ],
    category: "Colares",
    material: "Banho de Ouro 18k",
    dimensions: "45cm",
    weight: "3.2g",
    isNew: true,
    rating: 0,
    reviews: 0,
    collection: "verao-2024",
    slug: generateSlug("Colar Veneziana Banhado a Ouro 18k")
  },
  {
    id: "brinco-cristal-gota",
    name: "Brinco Gota Cristal Zircônia",
    description: "Brinco delicado em formato de gota com cristais de zircônia, acabamento em banho de ouro rosé.",
    price: 159.90,
    images: [
      "https://images.unsplash.com/photo-1635767798638-3665c86726c4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1635767798599-82cc0d84d58d?auto=format&fit=crop&q=80"
    ],
    category: "Brincos",
    material: "Banho de Ouro Rosé",
    stones: "Zircônia",
    isNew: true,
    rating: 0,
    reviews: 0,
    collection: "festa",
    slug: generateSlug("Brinco Gota Cristal Zircônia")
  },
  {
    id: "anel-solitario-zirconia",
    name: "Anel Solitário com Zircônia",
    description: "Anel solitário com zircônia central e acabamento em banho de ouro 18k.",
    price: 129.90,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80"
    ],
    category: "Anéis",
    material: "Banho de Ouro 18k",
    stones: "Zircônia",
    dimensions: "Aro 18",
    weight: "2.5g",
    rating: 5,
    reviews: 3,
    collection: "classicos",
    slug: generateSlug("Anel Solitário com Zircônia")
  },
  {
    id: "pulseira-elos-portuguesa",
    name: "Pulseira Elos Portuguesa",
    description: "Pulseira com elos estilo portuguesa, acabamento em banho de ouro 18k.",
    price: 199.90,
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80"
    ],
    category: "Pulseiras",
    material: "Banho de Ouro 18k",
    dimensions: "19cm",
    weight: "4.8g",
    isNew: true,
    rating: 0,
    reviews: 0,
    collection: "verao-2024",
    slug: generateSlug("Pulseira Elos Portuguesa")
  },
  {
    id: "conjunto-colar-brinco-festa",
    name: "Conjunto Colar e Brincos Festa",
    description: "Conjunto elegante com colar e brincos cravejados em zircônia, ideal para festas.",
    price: 299.90,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80"
    ],
    category: "Conjuntos",
    material: "Ródio",
    stones: "Zircônia",
    isSale: true,
    salePrice: 249.90,
    rating: 5,
    reviews: 7,
    collection: "festa",
    slug: generateSlug("Conjunto Colar e Brincos Festa")
  },
  {
    id: "anel-aparador-zirconia",
    name: "Anel Aparador com Zircônias",
    description: "Anel aparador cravejado com zircônias, perfeito para usar com solitários.",
    price: 149.90,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80"
    ],
    category: "Anéis",
    material: "Banho de Ouro 18k",
    stones: "Zircônia",
    dimensions: "Aro 18",
    weight: "2.2g",
    rating: 4.5,
    reviews: 4,
    collection: "classicos",
    slug: generateSlug("Anel Aparador com Zircônias")
  },
  {
    id: "colar-choker-zirconia",
    name: "Colar Choker com Zircônias",
    description: "Colar estilo choker com zircônias, moderno e sofisticado.",
    price: 199.90,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611591437277-308c3bca8b43?auto=format&fit=crop&q=80"
    ],
    category: "Colares",
    material: "Banho de Ouro Rosé",
    stones: "Zircônia",
    dimensions: "35cm",
    rating: 0,
    reviews: 0,
    collection: "festa",
    slug: generateSlug("Colar Choker com Zircônias")
  },
  {
    id: "brinco-argola-pequena",
    name: "Brinco Argola Pequena",
    description: "Brinco argola pequena, design minimalista e versátil para qualquer ocasião.",
    price: 89.90,
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80"
    ],
    category: "Brincos",
    material: "Banho de Ouro 18k",
    isNew: true,
    rating: 0,
    reviews: 0,
    collection: "lancamentos",
    slug: generateSlug("Brinco Argola Pequena")
  },
  {
    id: "anel-alianca-zirconia",
    name: "Aliança com Zircônias",
    description: "Aliança delicada com zircônias em toda volta, ideal para uso diário ou como anel de compromisso.",
    price: 159.90,
    images: [
      "https://images.unsplash.com/photo-1595781572981-d63151b232ed?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595781572981-d63151b232ed?auto=format&fit=crop&q=80"
    ],
    category: "Anéis",
    material: "Banho de Ouro 18k",
    stones: "Zircônia",
    rating: 0,
    reviews: 0,
    collection: "classicos",
    slug: generateSlug("Aliança com Zircônias")
  },
  {
    id: "pulseira-tennis-zirconia",
    name: "Pulseira Tennis com Zircônias",
    description: "Pulseira estilo tennis com zircônias em toda extensão, acabamento premium em banho de ródio.",
    price: 249.90,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611591437277-308c3bca8b43?auto=format&fit=crop&q=80"
    ],
    category: "Pulseiras",
    material: "Banho de Ródio",
    stones: "Zircônia",
    dimensions: "18cm",
    rating: 0,
    reviews: 0,
    collection: "festa",
    slug: generateSlug("Pulseira Tennis com Zircônias")
  },
  {
    id: "conjunto-colar-brinco-perola",
    name: "Conjunto Colar e Brincos Pérola",
    description: "Conjunto elegante com colar e brincos de pérolas cultivadas, acabamento em banho de ouro 18k.",
    price: 299.90,
    salePrice: 259.90,
    images: [
      "https://images.unsplash.com/photo-1620656798579-1984d9e87c24?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620656798528-1fda3c5e2f1c?auto=format&fit=crop&q=80"
    ],
    category: "Conjuntos",
    material: "Banho de Ouro 18k",
    stones: "Pérola",
    isSale: true,
    rating: 0,
    reviews: 0,
    collection: "classicos",
    slug: generateSlug("Conjunto Colar e Brincos Pérola")
  }
]
