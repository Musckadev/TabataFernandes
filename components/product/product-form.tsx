"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, FormData } from "@/types/form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { generateSlug } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/image-upload"
import { ScrollArea } from "@/components/ui/scroll-area"

const categories = [
  { id: "colares", label: "Colares" },
  { id: "brincos", label: "Brincos" },
  { id: "aneis", label: "Anéis" },
  { id: "pulseiras", label: "Pulseiras" },
  { id: "conjuntos", label: "Conjuntos" },
]

const collections = [
  { id: "classica", label: "Clássica" },
  { id: "moderna", label: "Moderna" },
  { id: "vintage", label: "Vintage" },
  { id: "minimalista", label: "Minimalista" },
  { id: "luxo", label: "Luxo" },
]

const materials = [
  { id: "ouro-18k", label: "Ouro 18k" },
  { id: "prata-925", label: "Prata 925" },
  { id: "aco-inox", label: "Aço Inoxidável" },
  { id: "zirconia", label: "Zircônia" },
  { id: "perola", label: "Pérola" },
]

const sizes = [
  { id: "unico", label: "Único" },
  { id: "pp", label: "PP" },
  { id: "p", label: "P" },
  { id: "m", label: "M" },
  { id: "g", label: "G" },
  { id: "gg", label: "GG" },
]

interface ProductFormProps {
  onSubmit: (data: FormData) => void
  defaultValues?: Partial<FormData>
}

export function ProductForm({ onSubmit, defaultValues }: ProductFormProps) {
  const defaultFormValues: FormData = {
    name: "",
    description: "",
    price: "",
    salePrice: null,
    category: "",
    collection: "",
    material: "",
    stockQuantity: 0,
    sizes: [],
    images: [],
    stones: null,
    inStock: true,
    isNew: false,
    isSale: false,
    featured: false,
    slug: "",
    rating: null,
    reviewsCount: 0,
    soldCount: 0,
    sku: "",
    weight: "",
    dimensions: "",
    metaTitle: "",
    metaDescription: "",
    keywords: ""
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || defaultFormValues,
  })

  const handleSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      slug: generateSlug(data.name),
    }
    onSubmit(formattedData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Colar Delicado Coração" {...field} />
                        </FormControl>
                        <FormDescription>
                          Nome do produto que será exibido na loja.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="99.90"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço promocional</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="Digite o preço promocional"
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Colar delicado com pingente de coração..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Descrição detalhada do produto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="collection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coleção</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma coleção" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {collections.map((collection) => (
                              <SelectItem
                                key={collection.id}
                                value={collection.id}
                              >
                                {collection.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um material" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {materials.map((material) => (
                              <SelectItem
                                key={material.id}
                                value={material.id}
                              >
                                {material.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <FormField
                      control={form.control}
                      name="inStock"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Em Estoque</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isNew"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Novo</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isSale"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Promoção</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Destaque</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC123" {...field} />
                          </FormControl>
                          <FormDescription>
                            Código único do produto.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stockQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade em Estoque</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Peso</FormLabel>
                          <FormControl>
                            <Input placeholder="10g" {...field} />
                          </FormControl>
                          <FormDescription>
                            Peso do produto em gramas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dimensions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dimensões</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="10cm x 5cm x 2cm"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Dimensões do produto (C x L x A).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagens do Produto</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          onRemove={(url) =>
                            field.onChange(
                              field.value.filter((image) => image.url !== url)
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Adicione imagens do produto. A primeira imagem será a
                        principal.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título Meta</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Colar Delicado Coração | Sua Loja"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Título que aparecerá na aba do navegador.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição Meta</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Colar delicado com pingente de coração..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Descrição que aparecerá nos resultados de busca.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Palavras-chave</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="colar, coração, delicado, joia"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Palavras-chave separadas por vírgula.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  )
}
