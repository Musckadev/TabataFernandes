"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Configurações</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie as configurações da sua loja
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="payment">Pagamento</TabsTrigger>
          <TabsTrigger value="shipping">Entrega</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium">Informações da Loja</h3>
            <div className="mt-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="store-name">Nome da Loja</Label>
                <Input id="store-name" defaultValue="Joalheria Elegance" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="store-description">Descrição</Label>
                <Textarea
                  id="store-description"
                  defaultValue="Joias exclusivas para momentos especiais"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="store-email">Email de Contato</Label>
                <Input
                  id="store-email"
                  type="email"
                  defaultValue="contato@joalheriaelegance.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="store-phone">Telefone</Label>
                <Input id="store-phone" defaultValue="(11) 1234-5678" />
              </div>
              <Button>Salvar Alterações</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium">SEO</h3>
            <div className="mt-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  defaultValue="Joalheria Elegance - Joias Exclusivas"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  defaultValue="Descubra joias exclusivas para momentos especiais na Joalheria Elegance. Anéis, colares, brincos e muito mais."
                  rows={3}
                />
              </div>
              <Button>Salvar Alterações</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium">Métodos de Pagamento</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cartão de Crédito</Label>
                  <p className="text-sm text-muted-foreground">
                    Aceitar pagamentos com cartão de crédito
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>PIX</Label>
                  <p className="text-sm text-muted-foreground">
                    Aceitar pagamentos via PIX
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Boleto</Label>
                  <p className="text-sm text-muted-foreground">
                    Aceitar pagamentos via boleto
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium">Configurações de Parcelas</h3>
            <div className="mt-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="max-installments">Máximo de Parcelas</Label>
                <Select defaultValue="12">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="3">3x</SelectItem>
                    <SelectItem value="6">6x</SelectItem>
                    <SelectItem value="12">12x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="min-installment-value">
                  Valor Mínimo da Parcela
                </Label>
                <Input
                  id="min-installment-value"
                  type="number"
                  defaultValue="50"
                />
              </div>
              <Button>Salvar Alterações</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium">Métodos de Entrega</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>PAC</Label>
                  <p className="text-sm text-muted-foreground">
                    Entrega econômica pelos Correios
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SEDEX</Label>
                  <p className="text-sm text-muted-foreground">
                    Entrega expressa pelos Correios
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Transportadora</Label>
                  <p className="text-sm text-muted-foreground">
                    Entrega via transportadora parceira
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Regiões de Entrega</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Região
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Nova Região de Entrega</DialogTitle>
                    <DialogDescription>
                      Adicione uma nova região com suas taxas de entrega
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="region-name">Nome da Região</Label>
                      <Input id="region-name" placeholder="Ex: Sudeste" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="region-states">Estados</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione os estados" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="ES">Espírito Santo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="delivery-time">Prazo de Entrega</Label>
                        <Input
                          id="delivery-time"
                          placeholder="Ex: 3-5 dias úteis"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Taxas de Entrega</Label>
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">PAC</h4>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="pac-base">Taxa Base</Label>
                            <Input
                              id="pac-base"
                              type="number"
                              placeholder="0.00"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="pac-kg">Taxa por Kg</Label>
                            <Input
                              id="pac-kg"
                              type="number"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">SEDEX</h4>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="sedex-base">Taxa Base</Label>
                            <Input
                              id="sedex-base"
                              type="number"
                              placeholder="0.00"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="sedex-kg">Taxa por Kg</Label>
                            <Input
                              id="sedex-kg"
                              type="number"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">Transportadora</h4>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="transport-base">Taxa Base</Label>
                            <Input
                              id="transport-base"
                              type="number"
                              placeholder="0.00"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="transport-kg">Taxa por Kg</Label>
                            <Input
                              id="transport-kg"
                              type="number"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button>Salvar Região</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-4 space-y-4">
              {/* Região Sudeste */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sudeste</h4>
                    <p className="text-sm text-muted-foreground">
                      SP, RJ, MG, ES | 3-5 dias úteis
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">PAC</p>
                    <p className="text-sm text-muted-foreground">
                      Base: R$ 15,00 | Por Kg: R$ 2,00
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">SEDEX</p>
                    <p className="text-sm text-muted-foreground">
                      Base: R$ 25,00 | Por Kg: R$ 3,50
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Transportadora</p>
                    <p className="text-sm text-muted-foreground">
                      Base: R$ 20,00 | Por Kg: R$ 2,50
                    </p>
                  </div>
                </div>
              </div>

              {/* Região Sul */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sul</h4>
                    <p className="text-sm text-muted-foreground">
                      PR, SC, RS | 4-6 dias úteis
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">PAC</p>
                    <p className="text-sm text-muted-foreground">
                      Base: R$ 18,00 | Por Kg: R$ 2,50
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">SEDEX</p>
                    <p className="text-sm text-muted-foreground">
                      Base: R$ 28,00 | Por Kg: R$ 4,00
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Transportadora</p>
                    <p className="text-sm text-muted-foreground">
                      Base: R$ 23,00 | Por Kg: R$ 3,00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium">Configurações de Frete Grátis</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Frete Grátis</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar frete grátis acima de um valor
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="free-shipping-min">Valor Mínimo</Label>
                <Input
                  id="free-shipping-min"
                  type="number"
                  defaultValue="299.90"
                />
              </div>
              <Button>Salvar Alterações</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium">Notificações por Email</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novo Pedido</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber email quando houver um novo pedido
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pedido Pago</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber email quando um pedido for pago
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Estoque Baixo</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber email quando o estoque estiver baixo
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium">Notificações para Clientes</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Confirmação de Pedido</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar email de confirmação do pedido
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Status do Pedido</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar atualizações do status do pedido
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Promoções</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar emails sobre promoções e novidades
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Salvar Alterações</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
