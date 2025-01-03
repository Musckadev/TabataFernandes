import { z } from "zod"

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  salePrice: z.number().positive().nullable().optional(),
  category: z.string().min(1),
  collection: z.string().min(1),
  material: z.string().min(1),
  stockQuantity: z.number().int().min(0).default(0),
  inStock: z.boolean().default(true),
  isNew: z.boolean().default(false),
  isSale: z.boolean().default(false),
  featured: z.boolean().default(false),
  slug: z.string().min(1),
  rating: z.number().min(0).max(5).nullable().optional(),
  reviewsCount: z.number().int().min(0).default(0),
  soldCount: z.number().int().min(0).default(0),
  images: z.array(z.object({
    url: z.string().url(),
    position: z.number().int().min(0)
  })).default([]),
  sizes: z.array(z.object({
    size: z.string().min(1),
    stockQuantity: z.number().int().min(0)
  })).default([]),
  stones: z.array(z.object({
    stone: z.string().min(1)
  })).optional().nullable()
})

export const reviewSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).default("PENDING")
})

export const orderSchema = z.object({
  id: z.string().optional(),
  orderNumber: z.string(),
  userId: z.string(),
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
  total: z.number().positive(),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number().positive(),
    size: z.string(),
    stone: z.string().optional(),
    quantity: z.number().int().positive()
  }))
})

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "STAFF"]).default("STAFF"),
  active: z.boolean().default(true)
})

export const activityLogSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  action: z.string(),
  details: z.string()
})
