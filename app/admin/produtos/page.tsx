"use client"

import { useState, useEffect } from "react"
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
import { Product } from "@/types"
import { Loading } from "@/components/ui/loading"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type ProductFormData = Omit<Product, 'price' | 'salePrice'> & {
  price: string;
  salePrice?: string;
}

export default function ProductsPage() {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [search, products])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (!response.ok) {
        throw new Error("Falha ao carregar produtos")
      }
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      toast.error("Erro ao carregar produtos")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProductSubmit = async (data: any) => {
    try {
      const product = {
        ...data,
        price: Number(data.price),
        salePrice: data.salePrice ? Number(data.salePrice) : undefined,
      }

      const response = await fetch("/api/products" + (selectedProduct ? `/${selectedProduct.id}` : ""), {
        method: selectedProduct ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        throw new Error("Falha ao salvar produto")
      }

      toast.success(selectedProduct ? "Produto atualizado com sucesso" : "Produto criado com sucesso")
      fetchProducts()
    } catch (error) {
      toast.error("Erro ao salvar produto")
      console.error(error)
    } finally {
      setOpen(false)
      setSelectedProduct(null)
    }
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

  const onDuplicate = async (product: Product) => {
    try {
      const duplicatedProduct = {
        ...product,
        id: undefined,
        name: `${product.name} (Cópia)`,
        slug: `${product.slug}-copia`,
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(duplicatedProduct),
      })

      if (!response.ok) {
        throw new Error("Falha ao duplicar produto")
      }

      toast.success("Produto duplicado com sucesso")
      fetchProducts()
    } catch (error) {
      toast.error("Erro ao duplicar produto")
      console.error(error)
    }
  }

  const onDelete = async (product: Product) => {
    if (!confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Falha ao excluir produto")
      }

      toast.success("Produto excluído com sucesso")
      fetchProducts()
    } catch (error) {
      toast.error("Erro ao excluir produto")
      console.error(error)
    }
  }

  if (isLoading) {
    return <Loading />
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

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={filteredProducts} 
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />
    </div>
  )
}
