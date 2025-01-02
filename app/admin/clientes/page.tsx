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
import { Eye, Search, Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatPrice } from "@/lib/utils"

const customers = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@example.com",
    phone: "(11) 98765-4321",
    orders: 5,
    totalSpent: 1499.95,
    lastOrder: "2024-01-02",
    address: {
      street: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
    orderHistory: [
      {
        id: "1",
        date: "2024-01-02",
        status: "Entregue",
        total: 299.99,
      },
      {
        id: "2",
        date: "2023-12-15",
        status: "Entregue",
        total: 459.99,
      },
      {
        id: "3",
        date: "2023-11-28",
        status: "Entregue",
        total: 739.97,
      },
    ],
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao@example.com",
    phone: "(21) 98765-4321",
    orders: 3,
    totalSpent: 899.97,
    lastOrder: "2024-01-02",
    address: {
      street: "Av. Principal, 456",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "20000-000",
    },
    orderHistory: [
      {
        id: "4",
        date: "2024-01-02",
        status: "Pago",
        total: 459.99,
      },
      {
        id: "5",
        date: "2023-12-20",
        status: "Entregue",
        total: 439.98,
      },
    ],
  },
  {
    id: "3",
    name: "Ana Oliveira",
    email: "ana@example.com",
    phone: "(31) 98765-4321",
    orders: 2,
    totalSpent: 599.98,
    lastOrder: "2024-01-01",
    address: {
      street: "Rua do Comércio, 789",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "30000-000",
    },
    orderHistory: [
      {
        id: "6",
        date: "2024-01-01",
        status: "Enviado",
        total: 299.99,
      },
      {
        id: "7",
        date: "2023-12-25",
        status: "Entregue",
        total: 299.99,
      },
    ],
  },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Clientes</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie os clientes da sua loja
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar cliente..." className="pl-8" />
          </div>
        </div>

        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead>Total Gasto</TableHead>
                <TableHead>Último Pedido</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {customer.id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>{formatPrice(customer.totalSpent)}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Cliente: {customer.name}</DialogTitle>
                          <DialogDescription>
                            Detalhes do cliente
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-medium">Informações Pessoais</h3>
                              <div className="mt-2 space-y-1">
                                <p>
                                  <span className="text-muted-foreground">
                                    Nome:
                                  </span>{" "}
                                  {customer.name}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">
                                    Email:
                                  </span>{" "}
                                  {customer.email}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">
                                    Telefone:
                                  </span>{" "}
                                  {customer.phone}
                                </p>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-medium">Endereço</h3>
                              <div className="mt-2 space-y-1">
                                <p>{customer.address.street}</p>
                                <p>
                                  {customer.address.city},{" "}
                                  {customer.address.state}
                                </p>
                                <p>{customer.address.zipCode}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Histórico de Pedidos</h3>
                            <div className="mt-2 space-y-3">
                              {customer.orderHistory.map((order) => (
                                <div
                                  key={order.id}
                                  className="flex items-center justify-between rounded-lg border p-3"
                                >
                                  <div>
                                    <p className="font-medium">
                                      Pedido #{order.id}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {order.date}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">
                                      {formatPrice(order.total)}
                                    </p>
                                    <p
                                      className={`text-sm ${
                                        order.status === "Pendente"
                                          ? "text-yellow-500"
                                          : order.status === "Pago"
                                          ? "text-green-500"
                                          : order.status === "Enviado"
                                          ? "text-blue-500"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {order.status}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t pt-4">
                            <div>
                              <p className="font-medium">Total de Pedidos</p>
                              <p className="text-sm text-muted-foreground">
                                {customer.orders} pedidos
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">Total Gasto</p>
                              <p className="text-sm text-muted-foreground">
                                {formatPrice(customer.totalSpent)}
                              </p>
                            </div>
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
