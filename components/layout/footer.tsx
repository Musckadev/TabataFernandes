"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, ShieldCheck, Lock, Award } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white">
      {/* Security Seals */}
      <div className="border-t border-gray-200">
        <div className="container py-8">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <Lock className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">Site Seguro</p>
                <p className="text-xs text-gray-500">Certificado SSL - Seus dados estão protegidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">Pagamento Seguro</p>
                <p className="text-xs text-gray-500">Ambiente protegido por criptografia</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">Compra Garantida</p>
                <p className="text-xs text-gray-500">Satisfação garantida ou seu dinheiro de volta</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Main Footer Content */}
      <div className="border-t border-gray-200">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Logo and Social Links */}
            <div className="lg:col-span-2">
              <span className="text-2xl font-serif font-medium block mb-6">Joalheria</span>
              <p className="text-sm text-gray-600 mb-6">
                Sua loja de semijoias preferida, com peças exclusivas e design único para todos os momentos.
              </p>
              <div className="flex gap-4">
                <Link href="https://instagram.com" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="https://facebook.com" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="https://twitter.com" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Sobre</h3>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/sobre" className="text-gray-600 hover:text-gray-900">
                    Quem Somos
                  </Link>
                </li>
                <li>
                  <Link href="/trabalhe-conosco" className="text-gray-600 hover:text-gray-900">
                    Trabalhe Conosco
                  </Link>
                </li>
                <li>
                  <Link href="/nossas-lojas" className="text-gray-600 hover:text-gray-900">
                    Nossas Lojas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Ajuda</h3>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/central-ajuda" className="text-gray-600 hover:text-gray-900">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/como-comprar" className="text-gray-600 hover:text-gray-900">
                    Como Comprar
                  </Link>
                </li>
                <li>
                  <Link href="/prazo-entrega" className="text-gray-600 hover:text-gray-900">
                    Prazo de Entrega
                  </Link>
                </li>
                <li>
                  <Link href="/trocas-devolucoes" className="text-gray-600 hover:text-gray-900">
                    Trocas e Devoluções
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Contato</h3>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-gray-600">Telefone:</span>
                  <Link href="tel:0800123456" className="text-gray-900 hover:text-gray-600">
                    0800 123 456
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-600">Email:</span>
                  <Link href="mailto:contato@exemplo.com" className="text-gray-900 hover:text-gray-600">
                    contato@exemplo.com
                  </Link>
                </li>
                <li className="text-gray-600">
                  Segunda a Sexta: 8h às 20h
                </li>
                <li className="text-gray-600">
                  Sábado: 9h às 17h
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container py-8">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
            {/* Copyright */}
            <p className="text-xs text-gray-500">
              2024 Sua Loja. Todos os direitos reservados.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>Visa</span>
              <span>•</span>
              <span>Mastercard</span>
              <span>•</span>
              <span>PIX</span>
              <span>•</span>
              <span>Boleto</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}