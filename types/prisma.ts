import { Prisma } from "@prisma/client"

export type ProductCreateInput = Omit<Prisma.ProductCreateInput, 'images' | 'sizes' | 'stones'> & {
  images?: {
    create?: Array<{
      url: string
      position: number
    }>
  }
  sizes?: {
    create?: Array<{
      size: string
      stockQuantity: number
    }>
  }
  stones?: {
    create?: Array<{
      stone: string
    }>
  }
  sku: string
  weight: string
  dimensions: string
  metaTitle: string
  metaDescription: string
  keywords: string
}

export type ProductUpdateInput = Omit<Prisma.ProductUpdateInput, 'images' | 'sizes' | 'stones'> & {
  images?: {
    deleteMany?: Record<string, never>
    create?: Array<{
      url: string
      position: number
    }>
  }
  sizes?: {
    deleteMany?: Record<string, never>
    create?: Array<{
      size: string
      stockQuantity: number
    }>
  }
  stones?: {
    deleteMany?: Record<string, never>
    create?: Array<{
      stone: string
    }>
  }
  sku: string
  weight: string
  dimensions: string
  metaTitle: string
  metaDescription: string
  keywords: string
}

export type ProductImageCreateInput = {
  url: string
  position: number
}

export type ProductSizeCreateInput = {
  size: string
  stockQuantity: number
}

export type ProductStoneCreateInput = {
  stone: string
}

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true
    sizes: true
    stones: true
  }
}>
