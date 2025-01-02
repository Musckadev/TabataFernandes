"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  price: z.string().min(1, { message: "Preço é obrigatório" }),
  salePrice: z.string().optional(),
  category: z.string({
    required_error: "Selecione uma categoria.",
  }),
  collection: z.string({
    required_error: "Selecione uma coleção.",
  }),
  material: z.string({
    required_error: "Selecione um material.",
  }),
  sizes: z.array(z.string()).min(1, {
    message: "Selecione pelo menos um tamanho.",
  }),
  images: z.array(z.string()).min(1, {
    message: "Adicione pelo menos uma imagem.",
  }),
  inStock: z.boolean().default(true),
  isNew: z.boolean().default(false),
  isSale: z.boolean().default(false),
  featured: z.boolean().default(false),
  sku: z.string().optional(),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
})

interface ProductFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
}

export function ProductForm({ onSubmit, defaultValues }: ProductFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      price: "",
      salePrice: "",
      category: "",
      collection: "",
      material: "",
      sizes: [],
      images: [],
      inStock: true,
      isNew: false,
      isSale: false,
      featured: false,
      sku: "",
      weight: "",
      dimensions: "",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <div className="space-y-4">
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

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Colar delicado em prata 925 com pingente de coração..."
                            className="min-h-[100px]"
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

                  <div className="grid gap-4 sm:grid-cols-2">
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
                          <FormDescription>
                            Preço regular do produto.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço Promocional</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="79.90"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Preço com desconto (opcional).
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

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
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
                          <FormDescription>
                            Categoria principal do produto.
                          </FormDescription>
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
                          <FormDescription>
                            Coleção à qual o produto pertence.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                              <SelectItem key={material.id} value={material.id}>
                                {material.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Material principal do produto.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sizes"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Tamanhos</FormLabel>
                          <FormDescription>
                            Selecione os tamanhos disponíveis.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {sizes.map((size) => (
                            <FormField
                              key={size.id}
                              control={form.control}
                              name="sizes"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={size.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(size.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                size.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== size.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {size.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
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
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Peso (g)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="10"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Peso em gramas.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                          onChange={(urls) => field.onChange(urls)}
                          onRemove={(url) =>
                            field.onChange(
                              field.value.filter((current) => current !== url)
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
                            placeholder="Colar delicado em prata 925 com pingente de coração..."
                            className="min-h-[100px]"
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
                            placeholder="colar, prata, coração, joia"
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

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
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
                      <FormDescription>
                        Produto disponível para compra.
                      </FormDescription>
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
                      <FormLabel>Lançamento</FormLabel>
                      <FormDescription>
                        Produto será exibido como lançamento.
                      </FormDescription>
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
                      <FormLabel>Em Promoção</FormLabel>
                      <FormDescription>
                        Produto está em promoção.
                      </FormDescription>
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
                      <FormDescription>
                        Produto será exibido em destaque na loja.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Salvar Produto</Button>
        </div>
      </form>
    </Form>
  )
}
