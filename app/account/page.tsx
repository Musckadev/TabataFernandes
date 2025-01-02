"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Package, User } from "lucide-react"

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Pedidos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Nome</label>
                  <Input placeholder="Seu nome" />
                </div>
                <div>
                  <label className="text-sm font-medium">E-mail</label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Telefone</label>
                  <Input placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <label className="text-sm font-medium">CPF</label>
                  <Input placeholder="000.000.000-00" />
                </div>
              </div>
              <Button>Salvar Alterações</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-center text-muted-foreground">
                <Package className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-2">Você ainda não tem pedidos</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
