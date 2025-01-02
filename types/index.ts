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
  isNew: boolean
  isSale: boolean
  sizes: string[]
  featured: boolean
  slug: string
  stones?: string[]
  rating?: number
  reviews?: number
  soldCount?: number
  createdAt?: string
}
