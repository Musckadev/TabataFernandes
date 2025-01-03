import { Prisma } from "@prisma/client"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  salePrice: number | null
  category: string
  collection: string
  material: string
  stockQuantity: number
  inStock: boolean
  isNew: boolean
  isSale: boolean
  featured: boolean
  slug: string
  rating: number | null
  reviewsCount: number
  soldCount: number
  images: ProductImage[]
  sizes: ProductSize[]
  stones: ProductStone[] | null
  sku: string
  weight: string
  dimensions: string
  metaTitle: string
  metaDescription: string
  keywords: string
  createdAt: Date
  updatedAt: Date
}

export type ProductImage = {
  id: string
  productId: string
  url: string
  position: number
  createdAt: Date
}

export type ProductSize = {
  id: string
  productId: string
  size: string
  stockQuantity: number
  createdAt: Date
}

export type ProductStone = {
  id: string
  productId: string
  stone: string
  createdAt: Date
}

export type CartItem = {
  id: string
  name: string
  price: number
  salePrice: number | null
  image: string
  size: string
  stone?: string
  quantity: number
}

export type Order = {
  id: string
  orderNumber: string
  userId: string
  status: OrderStatus
  total: number
  items: OrderItem[]
  createdAt: Date
  updatedAt: Date
}

export type OrderItem = {
  id: string
  orderId: string
  productId: string
  name: string
  price: number
  size: string
  stone?: string
  quantity: number
  createdAt: Date
}

export type Review = {
  id: string
  productId: string
  name: string
  email: string
  rating: number
  comment?: string
  status: ReviewStatus
  createdAt: Date
}

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export type OrderHistory = {
  id: string
  orderId: string
  status: OrderStatus
  notes?: string
  createdAt: Date
}

export type ActivityLog = {
  id: string
  userId: string
  action: string
  details: string
  createdAt: Date
}

export enum UserRole {
  ADMIN = "ADMIN",
  STAFF = "STAFF"
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum SettingType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  JSON = 'JSON'
}

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  parent?: Category
  children?: Category[]
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export type Collection = {
  id: string
  name: string
  slug: string
  description?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export type Material = {
  id: string
  name: string
  description?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export type Stone = {
  id: string
  name: string
  description?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export type Setting = {
  id: string
  key: string
  value: string
  type: string
  description?: string
  createdAt: Date
  updatedAt: Date
}
