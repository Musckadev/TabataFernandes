"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm } from "@/components/product/product-form"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { products } from "@/data/products"
import { Product } from "@/types"

type ProductFormData = Omit<Product, 'price' | 'salePrice'> & {
  price: string;
  salePrice?: string;
}

export default function ProductsPage() {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null)

  const handleProductSubmit = (data: any) => {
    const product = {
      ...data,
      price: Number(data.price),
      salePrice: data.salePrice ? Number(data.salePrice) : undefined,
    }

    if (selectedProduct) {
      // Editar produto existente
      console.log("Produto editado:", { ...selectedProduct, ...product })
    } else {
      // Criar novo produto
      console.log("Novo produto:", product)
    }

    setOpen(false)
    setSelectedProduct(null)
  }

  const onEdit = (product: Product) => {
    const formData: ProductFormData = {
      ...product,
      price: product.price.toString(),
      salePrice: product.salePrice?.toString(),
    }
    setSelectedProduct(formData)
    setOpen(true)
  }

  const onDuplicate = (product: Product) => {
    const duplicatedProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      name: `${product.name} (Cópia)`,
      slug: `${product.slug}-copia`,
    }
    console.log("Produto duplicado:", duplicatedProduct)
  }

  const onDelete = (product: Product) => {
    if (confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
      console.log("Produto excluído:", product)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie os produtos da sua loja
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Adicionar Produto</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? "Editar Produto" : "Novo Produto"}
              </DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para {selectedProduct ? "editar o" : "criar um novo"} produto
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ProductForm 
                onSubmit={handleProductSubmit} 
                defaultValues={selectedProduct || undefined}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable 
        columns={columns} 
        data={products} 
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />
    </div>
  )
}
