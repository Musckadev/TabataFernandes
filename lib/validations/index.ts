import { z } from "zod"

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  salePrice: z.number().positive().optional(),
  category: z.string().min(1),
  collection: z.string().min(1),
  material: z.string().min(1),
  stockQuantity: z.number().int().min(0),
  inStock: z.boolean(),
  isNew: z.boolean(),
  isSale: z.boolean(),
  featured: z.boolean(),
  slug: z.string().min(1),
  images: z.array(z.string().url()),
  sizes: z.array(z.object({
    size: z.string().min(1),
    stockQuantity: z.number().int().min(0)
  })),
  stones: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewsCount: z.number().int().min(0).optional(),
  soldCount: z.number().int().min(0).optional()
})

export const reviewSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional()
})

export const orderSchema = z.object({
  id: z.string().optional(),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  shippingAddress: z.string().min(1),
  shippingCity: z.string().min(1),
  shippingState: z.string().length(2),
  shippingZip: z.string().min(8).max(9),
  subtotal: z.number().positive(),
  shippingFee: z.number().min(0),
  total: z.number().positive(),
  paymentMethod: z.string().min(1),
  notes: z.string().optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
    total: z.number().positive(),
    size: z.string().optional()
  }))
})

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  parentId: z.string().optional(),
  active: z.boolean()
})

export const collectionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  active: z.boolean()
})

export const materialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  active: z.boolean()
})

export const stoneSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  active: z.boolean()
})

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  role: z.enum(["ADMIN", "MANAGER", "STAFF"]),
  active: z.boolean()
})

export const settingSchema = z.object({
  id: z.string().optional(),
  key: z.string().min(1),
  value: z.string(),
  type: z.enum(["STRING", "NUMBER", "BOOLEAN", "JSON"]),
  description: z.string().optional()
})
