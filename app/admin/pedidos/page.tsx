"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatPrice } from "@/lib/utils"
import { Eye, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const orders = [
  {
    id: "1",
    customer: "Maria Silva",
    email: "maria@example.com",
    date: "2024-01-02",
    status: "Pendente",
    total: 299.99,
    payment: "Cartão de Crédito",
    items: [
      {
        name: "Colar Elegance",
        quantity: 1,
        price: 199.99,
      },
      {
        name: "Brinco Crystal",
        quantity: 2,
        price: 50.00,
      },
    ],
    shipping: {
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
  },
  {
    id: "2",
    customer: "João Santos",
    email: "joao@example.com",
    date: "2024-01-02",
    status: "Pago",
    total: 459.99,
    payment: "PIX",
    items: [
      {
        name: "Anel Glamour",
        quantity: 1,
        price: 459.99,
      },
    ],
    shipping: {
      address: "Av. Principal, 456",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "20000-000",
    },
  },
  // Add more orders...
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Pedidos</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie os pedidos da sua loja
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar pedido..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Pendente"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Pago"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Enviado"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Entregue"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(order.total)}</TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Pedido #{order.id}</DialogTitle>
                          <DialogDescription>
                            Detalhes do pedido
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div>
                            <h3 className="font-medium">Cliente</h3>
                            <div className="mt-2 space-y-1">
                              <p>{order.customer}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.email}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Endereço de Entrega</h3>
                            <div className="mt-2 space-y-1">
                              <p>{order.shipping.address}</p>
                              <p>
                                {order.shipping.city}, {order.shipping.state}
                              </p>
                              <p>{order.shipping.zipCode}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Itens do Pedido</h3>
                            <div className="mt-2 space-y-3">
                              {order.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between rounded-lg border p-3"
                                >
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Quantidade: {item.quantity}
                                    </p>
                                  </div>
                                  <p className="font-medium">
                                    {formatPrice(item.price)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t pt-4">
                            <p className="font-medium">Total</p>
                            <p className="font-medium">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
