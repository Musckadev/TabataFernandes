"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contato</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Envie sua mensagem</h2>
          <Card className="p-6">
            <form className="space-y-4">
              <div>
                <Input placeholder="Seu nome" />
              </div>
              <div>
                <Input type="email" placeholder="Seu e-mail" />
              </div>
              <div>
                <Input placeholder="Assunto" />
              </div>
              <div>
                <Textarea
                  placeholder="Sua mensagem"
                  className="min-h-[150px]"
                />
              </div>
              <Button className="w-full">Enviar Mensagem</Button>
            </form>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Informações de Contato</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Rua Exemplo, 123
                    <br />
                    Bairro - Cidade/UF
                    <br />
                    CEP: 12345-678
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    (11) 1234-5678
                    <br />
                    Segunda a Sexta: 9h às 18h
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">E-mail</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    contato@exemplo.com
                    <br />
                    suporte@exemplo.com
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
