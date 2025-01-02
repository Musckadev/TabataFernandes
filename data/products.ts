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
  collection: string
  material: string
  inStock: boolean
  isSale?: boolean
  isNew?: boolean
  salePrice?: number
  slug: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Colar Delicado Coração",
    description: "Colar delicado em prata 925 com pingente de coração",
    price: 199.90,
    images: ["/products/colar-1.jpg"],
    category: "Colares",
    collection: "Clássica",
    material: "Prata 925",
    inStock: true,
    isNew: true,
    slug: "colar-delicado-coracao"
  },
  {
    id: "2",
    name: "Brinco Argola Moderna",
    description: "Brinco argola em aço inoxidável com design moderno",
    price: 89.90,
    images: ["/products/brinco-1.jpg"],
    category: "Brincos",
    collection: "Moderna",
    material: "Aço Inoxidável",
    inStock: true,
    isSale: true,
    salePrice: 69.90,
    slug: "brinco-argola-moderna"
  },
  {
    id: "3",
    name: "Anel Solitário",
    description: "Anel solitário em ouro 18k com zircônia",
    price: 599.90,
    images: ["/products/anel-1.jpg"],
    category: "Anéis",
    collection: "Luxo",
    material: "Ouro 18k",
    inStock: true,
    isNew: true,
    slug: "anel-solitario"
  },
  {
    id: "4",
    name: "Pulseira Pérolas",
    description: "Pulseira de pérolas naturais com fecho em prata",
    price: 299.90,
    images: ["/products/pulseira-1.jpg"],
    category: "Pulseiras",
    collection: "Clássica",
    material: "Pérola",
    inStock: true,
    slug: "pulseira-perolas"
  },
  {
    id: "5",
    name: "Colar Gargantilha",
    description: "Colar gargantilha em prata 925 com zircônias",
    price: 249.90,
    images: ["/products/colar-2.jpg"],
    category: "Colares",
    collection: "Moderna",
    material: "Prata 925",
    inStock: true,
    isSale: true,
    salePrice: 199.90,
    slug: "colar-gargantilha"
  },
  {
    id: "6",
    name: "Brinco Cascata",
    description: "Brinco cascata em ouro 18k com zircônias",
    price: 899.90,
    images: ["/products/brinco-2.jpg"],
    category: "Brincos",
    collection: "Luxo",
    material: "Ouro 18k",
    inStock: true,
    isNew: true,
    slug: "brinco-cascata"
  },
  {
    id: "7",
    name: "Anel Aliança",
    description: "Aliança em prata 925 com acabamento fosco",
    price: 149.90,
    images: ["/products/anel-2.jpg"],
    category: "Anéis",
    collection: "Minimalista",
    material: "Prata 925",
    inStock: true,
    isSale: true,
    salePrice: 129.90,
    slug: "anel-alianca"
  },
  {
    id: "8",
    name: "Pulseira Corrente",
    description: "Pulseira corrente em aço inoxidável",
    price: 79.90,
    images: ["/products/pulseira-2.jpg"],
    category: "Pulseiras",
    collection: "Moderna",
    material: "Aço Inoxidável",
    inStock: true,
    isNew: true,
    slug: "pulseira-corrente"
  }
]
