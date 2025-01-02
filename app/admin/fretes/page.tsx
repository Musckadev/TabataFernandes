"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash, Search } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const shippingRegions = [
  {
    id: "1",
    name: "Sudeste",
    states: ["SP", "RJ", "MG", "ES"],
    rates: {
      pac: { 
        base: 15.0, 
        perKg: 2.0,
        deliveryTime: "5-8 dias úteis"
      },
      sedex: { 
        base: 25.0, 
        perKg: 3.5,
        deliveryTime: "1-2 dias úteis"
      },
      transport: { 
        base: 20.0, 
        perKg: 2.5,
        deliveryTime: "3-5 dias úteis"
      },
    },
  },
  {
    id: "2",
    name: "Sul",
    states: ["PR", "SC", "RS"],
    rates: {
      pac: { 
        base: 18.0, 
        perKg: 2.5,
        deliveryTime: "6-10 dias úteis"
      },
      sedex: { 
        base: 28.0, 
        perKg: 4.0,
        deliveryTime: "2-3 dias úteis"
      },
      transport: { 
        base: 23.0, 
        perKg: 3.0,
        deliveryTime: "4-6 dias úteis"
      },
    },
  },
]

export default function ShippingRatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Gerenciamento de Fretes</h2>
          <p className="text-sm text-muted-foreground">
            Configure as taxas de entrega por região
          </p>
        </div>
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
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                      <SelectItem value="MT">Mato Grosso</SelectItem>
                      <SelectItem value="GO">Goiás</SelectItem>
                      <SelectItem value="DF">Distrito Federal</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="SE">Sergipe</SelectItem>
                      <SelectItem value="AL">Alagoas</SelectItem>
                      <SelectItem value="PE">Pernambuco</SelectItem>
                      <SelectItem value="PB">Paraíba</SelectItem>
                      <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                      <SelectItem value="CE">Ceará</SelectItem>
                      <SelectItem value="PI">Piauí</SelectItem>
                      <SelectItem value="MA">Maranhão</SelectItem>
                      <SelectItem value="PA">Pará</SelectItem>
                      <SelectItem value="AP">Amapá</SelectItem>
                      <SelectItem value="AM">Amazonas</SelectItem>
                      <SelectItem value="RR">Roraima</SelectItem>
                      <SelectItem value="AC">Acre</SelectItem>
                      <SelectItem value="RO">Rondônia</SelectItem>
                      <SelectItem value="TO">Tocantins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="delivery-time">Prazo de Entrega</Label>
                  <Input id="delivery-time" placeholder="Ex: 3-5 dias úteis" />
                </div>
              </div>
              <div className="space-y-4">
                <Label>Taxas de Entrega</Label>
                <div className="rounded-lg border p-4">
                  <h4 className="font-medium">PAC</h4>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="pac-base">Taxa Base</Label>
                      <Input id="pac-base" type="number" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="pac-kg">Taxa por Kg</Label>
                      <Input id="pac-kg" type="number" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="pac-time">Prazo de Entrega</Label>
                      <Input id="pac-time" placeholder="Ex: 5-8 dias úteis" />
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="font-medium">SEDEX</h4>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="sedex-base">Taxa Base</Label>
                      <Input id="sedex-base" type="number" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sedex-kg">Taxa por Kg</Label>
                      <Input id="sedex-kg" type="number" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sedex-time">Prazo de Entrega</Label>
                      <Input id="sedex-time" placeholder="Ex: 1-2 dias úteis" />
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="font-medium">Transportadora</h4>
                  <div className="mt-2 grid grid-cols-3 gap-4">
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
                      <Input id="transport-kg" type="number" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="transport-time">Prazo de Entrega</Label>
                      <Input id="transport-time" placeholder="Ex: 3-5 dias úteis" />
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

      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar região..." className="pl-8" />
          </div>
        </div>

        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Região</TableHead>
                <TableHead>Estados</TableHead>
                <TableHead>PAC</TableHead>
                <TableHead>SEDEX</TableHead>
                <TableHead>Transportadora</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingRegions.map((region) => (
                <TableRow key={region.id}>
                  <TableCell className="font-medium">{region.name}</TableCell>
                  <TableCell>{region.states.join(", ")}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">
                        Base: R$ {region.rates.pac.base.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Por Kg: R$ {region.rates.pac.perKg.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Prazo: {region.rates.pac.deliveryTime}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">
                        Base: R$ {region.rates.sedex.base.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Por Kg: R$ {region.rates.sedex.perKg.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Prazo: {region.rates.sedex.deliveryTime}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">
                        Base: R$ {region.rates.transport.base.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Por Kg: R$ {region.rates.transport.perKg.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Prazo: {region.rates.transport.deliveryTime}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
