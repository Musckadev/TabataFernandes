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
  stockQuantity: number
  inStock: boolean
  isNew: boolean
  isSale: boolean
  sizes: ProductSize[]
  featured: boolean
  slug: string
  stones?: string[]
  rating?: number
  reviewsCount?: number
  soldCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface ProductSize {
  id: string
  size: string
  stockQuantity: number
}

export interface ProductImage {
  id: string
  url: string
  position: number
}

export interface ProductStone {
  id: string
  stone: string
}

export interface Review {
  id: string
  productId: string
  name: string
  email: string
  rating: number
  comment?: string
  status: ReviewStatus
  createdAt: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingZip: string
  subtotal: number
  shippingFee: number
  total: number
  status: OrderStatus
  paymentMethod: string
  paymentStatus: PaymentStatus
  trackingCode?: string
  notes?: string
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  total: number
  size?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  parent?: Category
  children?: Category[]
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description?: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Material {
  id: string
  name: string
  description?: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Stone {
  id: string
  name: string
  description?: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Setting {
  id: string
  key: string
  value: string
  type: SettingType
  description?: string
  createdAt: string
  updatedAt: string
}

export interface ActivityLog {
  id: string
  userId: string
  user: User
  action: string
  entityType: string
  entityId: string
  details?: any
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF'
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
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
