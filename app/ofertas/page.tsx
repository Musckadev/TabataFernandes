"use client"

import { ProductGrid } from "@/components/product/product-grid"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CountdownTimer } from "@/components/countdown-timer"

export default function OffersPage() {
  // Set end time to 24 hours from now
  const endTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ofertas Especiais</h1>
        <p className="text-muted-foreground">
          Descubra nossas semijoias com preços imperdíveis
        </p>
      </div>

      <div className="grid gap-8">
        {/* Banner de Ofertas */}
        <Card className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-500 p-6 text-white">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Promoção Relâmpago</h2>
            <p className="mb-4">Até 50% OFF em peças selecionadas</p>
            <CountdownTimer endTime={endTime} />
          </div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_-50%,#ffffff,transparent)]" />
        </Card>

        {/* Tabs de Ofertas */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">Todas as Ofertas</TabsTrigger>
            <TabsTrigger value="flash">Ofertas Relâmpago</TabsTrigger>
            <TabsTrigger value="sets">Conjuntos em Promoção</TabsTrigger>
            <TabsTrigger value="clearance">Última Chance</TabsTrigger>
          </TabsList>
          
          {/* Promoções em Destaque */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="p-6 bg-gradient-to-br from-rose-50 to-rose-100">
              <h3 className="text-lg font-semibold mb-2">Colares e Correntes</h3>
              <p className="text-muted-foreground mb-4">Até 40% de desconto em colares selecionados</p>
              <p className="text-sm font-medium text-rose-600">A partir de R$ 89,90</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100">
              <h3 className="text-lg font-semibold mb-2">Brincos Premium</h3>
              <p className="text-muted-foreground mb-4">Compre 2, Leve 3 em toda a coleção</p>
              <p className="text-sm font-medium text-amber-600">Economize até R$ 150</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
              <h3 className="text-lg font-semibold mb-2">Anéis Exclusivos</h3>
              <p className="text-muted-foreground mb-4">Segunda peça com 50% OFF</p>
              <p className="text-sm font-medium text-purple-600">Linha Premium</p>
            </Card>
          </div>

          <TabsContent value="all" className="space-y-4">
            <ProductGrid />
          </TabsContent>
          <TabsContent value="flash" className="space-y-4">
            <ProductGrid />
          </TabsContent>
          <TabsContent value="sets" className="space-y-4">
            <ProductGrid />
          </TabsContent>
          <TabsContent value="clearance" className="space-y-4">
            <ProductGrid />
          </TabsContent>
        </Tabs>

        {/* Informações Adicionais */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mt-8">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Garantia Vitalícia</h4>
            <p className="text-sm text-muted-foreground">
              Todas as nossas peças possuem garantia no banho de ouro
            </p>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Frete Grátis</h4>
            <p className="text-sm text-muted-foreground">
              Em compras acima de R$ 299 para todo Brasil
            </p>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Parcelamento</h4>
            <p className="text-sm text-muted-foreground">
              Em até 10x sem juros no cartão
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
