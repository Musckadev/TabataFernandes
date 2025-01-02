import { z } from "zod"

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().min(0),
  salePrice: z.number().min(0).optional(),
  category: z.string().min(1),
  collection: z.string().min(1),
  material: z.string().min(1),
  images: z.array(z.string().url()).min(1),
  inStock: z.boolean(),
  isNew: z.boolean(),
  isSale: z.boolean(),
  sizes: z.array(z.string()).min(1),
  featured: z.boolean(),
  slug: z.string().min(1),
  stones: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().min(0).optional(),
  soldCount: z.number().min(0).optional(),
  createdAt: z.string().datetime().optional(),
})

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().min(1).max(10),
})

export type ProductSchema = z.infer<typeof productSchema>
export type CartItemSchema = z.infer<typeof cartItemSchema>
