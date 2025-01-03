import { z } from "zod"
import { productSchema, productUpdateSchema } from "@/lib/validations"

export const formSchema = productSchema.extend({
  price: z.string(),
  salePrice: z.string().optional().nullable(),
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
  stockQuantity: z.number().int().min(0),
  reviewsCount: z.number().int().min(0),
  soldCount: z.number().int().min(0),
  rating: z.number().min(0).max(5).nullable(),
  sku: z.string(),
  weight: z.string(),
  dimensions: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  keywords: z.string()
})

export type FormData = z.infer<typeof formSchema>

export type UpdateFormData = FormData & {
  id: string
}
