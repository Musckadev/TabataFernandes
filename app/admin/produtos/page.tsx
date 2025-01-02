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
import { columns, type Product } from "./columns"
import { products } from "@/data/products"

export default function ProductsPage() {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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
      // Adicionar novo produto
      console.log("Novo produto:", product)
    }
    
    setSelectedProduct(null)
    setOpen(false)
  }

  const handleEdit = (product: Product) => {
    const formattedProduct = {
      ...product,
      price: product.price.toString(),
      salePrice: product.salePrice?.toString(),
    }
    setSelectedProduct(formattedProduct as Product)
    setOpen(true)
  }

  const handleDuplicate = (product: Product) => {
    const duplicatedProduct = {
      ...product,
      id: crypto.randomUUID(),
      name: `${product.name} (Cópia)`,
    }
    console.log("Produto duplicado:", duplicatedProduct)
  }

  const handleDelete = (product: Product) => {
    if (confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
      console.log("Produto excluído:", product)
    }
  }

  return (
    <div className="flex h-full flex-col space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie os produtos da sua loja
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Adicionar Produto</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? "Editar Produto" : "Adicionar Produto"}
              </DialogTitle>
              <DialogDescription>
                {selectedProduct 
                  ? "Edite as informações do produto"
                  : "Adicione um novo produto à sua loja"}
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-6">
              <ProductForm 
                onSubmit={handleProductSubmit} 
                defaultValues={selectedProduct || undefined}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1">
        <DataTable 
          columns={columns} 
          data={products} 
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
