import { z } from "zod"

const baseProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  salePrice: z.number().min(0).nullable(),
  category: z.string().min(1),
  collection: z.string().min(1),
  material: z.string().min(1),
  stockQuantity: z.number().int().min(0),
  inStock: z.boolean(),
  isNew: z.boolean(),
  isSale: z.boolean(),
  featured: z.boolean(),
  slug: z.string().min(1),
  rating: z.number().min(0).max(5).nullable(),
  reviewsCount: z.number().int().min(0),
  soldCount: z.number().int().min(0),
  images: z.array(z.object({
    url: z.string().url(),
    position: z.number().int().min(0)
  })),
  sizes: z.array(z.object({
    size: z.string().min(1),
    stockQuantity: z.number().int().min(0)
  })),
  stones: z.array(z.object({
    stone: z.string().min(1)
  })).nullable(),
  sku: z.string().min(1),
  weight: z.string().min(1),
  dimensions: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  keywords: z.string().min(1)
})

// Schema para criação de produto (sem id)
export const productSchema = baseProductSchema.omit({ id: true })

// Schema para atualização de produto (com id)
export const productUpdateSchema = baseProductSchema

export type ProductSchema = z.infer<typeof productSchema>
export type ProductUpdateSchema = z.infer<typeof productUpdateSchema>

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().min(1).max(10),
  size: z.string().min(1)
})

export type CartItemSchema = z.infer<typeof cartItemSchema>
