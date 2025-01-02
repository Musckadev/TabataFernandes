"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/cart-context"
import { formatPrice } from "@/lib/utils"
import { ArrowRight, CheckCircle2, CreditCard, MapPin, Package, Shield, Truck, User2, Zap } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    title: "Frete Padrão",
    description: "Entrega em 5-7 dias úteis",
    price: 19.90,
    icon: Truck
  },
  {
    id: "express",
    title: "Frete Expresso",
    description: "Entrega em 2-3 dias úteis",
    price: 29.90,
    icon: Zap
  }
] as const

type ShippingOption = typeof SHIPPING_OPTIONS[number]["id"]

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cpf: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>("standard")
  const [showShippingOptions, setShowShippingOptions] = useState(false)
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [step, setStep] = useState<'personal' | 'shipping' | 'payment'>('personal')
  const [addressData, setAddressData] = useState<any>(null)
  const [selectedPayment, setSelectedPayment] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format CPF
    if (name === "cpf") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
    }

    // Format phone
    if (name === "phone") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
    }

    // Format CEP
    if (name === "cep") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1")
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
  }

  const handleCheckCEP = async () => {
    const cep = formData.cep.replace(/\D/g, "")
    if (cep.length !== 8) {
      return
    }

    setIsLoadingCep(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      
      if (!data.erro) {
        setShowShippingOptions(true)
        setAddressData(data)
        setFormData(prev => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }))
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    } finally {
      setIsLoadingCep(false)
    }
  }

  const handleContinue = () => {
    if (step === 'personal') {
      // Validate personal information
      if (!formData.fullName || !formData.email || !formData.phone || !formData.cpf) {
        return
      }
      setStep('shipping')
    } else if (step === 'shipping') {
      // Validate shipping information
      if (!formData.cep || !formData.street || !formData.number || !formData.neighborhood || !formData.city || !formData.state) {
        return
      }
      setStep('payment')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  // Calculate shipping and total
  const shipping = subtotal >= 299 ? 0 : SHIPPING_OPTIONS.find(opt => opt.id === selectedShipping)?.price || 0
  const total = subtotal + shipping

  const getButtonText = () => {
    switch (step) {
      case 'personal':
        return 'Continuar para Entrega'
      case 'shipping':
        return 'Continuar para Pagamento'
      case 'payment':
        return 'Finalizar Pedido'
      default:
        return 'Continuar'
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 'personal':
        return formData.fullName && formData.email && formData.phone && formData.cpf
      case 'shipping':
        return showShippingOptions && (subtotal >= 299 || selectedShipping) &&
               formData.street && formData.number && formData.neighborhood && formData.city && formData.state
      case 'payment':
        return selectedPayment !== ""
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className={`rounded-full p-2 ${step === 'personal' ? 'bg-gray-900 text-white' : step === 'shipping' || step === 'payment' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                <User2 className="h-4 w-4" />
              </div>
              <span className="ml-2 text-sm font-medium">Dados Pessoais</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center">
              <div className={`rounded-full p-2 ${step === 'shipping' ? 'bg-gray-900 text-white' : step === 'payment' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                <Package className="h-4 w-4" />
              </div>
              <span className="ml-2 text-sm font-medium">Entrega</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center">
              <div className={`rounded-full p-2 ${step === 'payment' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
                <CreditCard className="h-4 w-4" />
              </div>
              <span className="ml-2 text-sm font-medium">Pagamento</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Personal Information */}
            {step === 'personal' && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-full bg-gray-900 p-2 text-white">
                      <User2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Informações Pessoais</h2>
                      <p className="text-sm text-gray-500">Preencha seus dados para continuar</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Digite seu nome completo"
                        className="bg-gray-50 border-gray-200"
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Digite seu email"
                          className="bg-gray-50 border-gray-200"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone (WhatsApp)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(00) 00000-0000"
                          className="bg-gray-50 border-gray-200"
                          maxLength={15}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        placeholder="000.000.000-00"
                        className="bg-gray-50 border-gray-200"
                        maxLength={14}
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Shipping Section */}
            {step === 'shipping' && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-full bg-gray-900 p-2 text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Endereço de Entrega</h2>
                      <p className="text-sm text-gray-500">Informe o endereço para entrega</p>
                    </div>
                  </div>

                  <form className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="cep">CEP</Label>
                        <div className="flex gap-2">
                          <Input
                            id="cep"
                            name="cep"
                            value={formData.cep}
                            onChange={handleChange}
                            placeholder="00000-000"
                            className="bg-gray-50 border-gray-200"
                            maxLength={9}
                            required
                          />
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={handleCheckCEP}
                            disabled={formData.cep.replace(/\D/g, "").length !== 8 || isLoadingCep}
                            className="shrink-0"
                          >
                            {isLoadingCep ? "..." : "Buscar"}
                          </Button>
                        </div>
                        <div className="mt-2">
                          <a 
                            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-500 hover:text-gray-700 underline inline-flex items-center gap-1"
                          >
                            <MapPin className="h-4 w-4" />
                            Não sei meu CEP
                          </a>
                        </div>
                      </div>
                    </div>

                    {showShippingOptions && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="street">Rua</Label>
                          <Input
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="Nome da rua"
                            className="bg-gray-50 border-gray-200"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="number">Número</Label>
                            <Input
                              id="number"
                              name="number"
                              value={formData.number}
                              onChange={handleChange}
                              placeholder="123"
                              className="bg-gray-50 border-gray-200"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="complement">Complemento</Label>
                            <Input
                              id="complement"
                              name="complement"
                              value={formData.complement}
                              onChange={handleChange}
                              placeholder="Apto 101"
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="neighborhood">Bairro</Label>
                          <Input
                            id="neighborhood"
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                            placeholder="Nome do bairro"
                            className="bg-gray-50 border-gray-200"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">Cidade</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="Nome da cidade"
                              className="bg-gray-50 border-gray-200"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">Estado</Label>
                            <Input
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              placeholder="UF"
                              className="bg-gray-50 border-gray-200"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                {showShippingOptions && (
                  <>
                    <Separator />

                    {/* Shipping Options */}
                    <div className="p-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Opções de Entrega</h3>
                      {subtotal >= 299 ? (
                        <div className="rounded-lg bg-green-50 p-4 text-green-800">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">Parabéns! Você ganhou Frete Grátis</p>
                              <p className="text-sm mt-0.5">Seu pedido ultrapassou R$ 299</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <RadioGroup
                          value={selectedShipping}
                          onValueChange={(value) => setSelectedShipping(value as ShippingOption)}
                          className="space-y-4"
                        >
                          {SHIPPING_OPTIONS.map((option) => {
                            const Icon = option.icon
                            return (
                              <label
                                key={option.id}
                                className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${
                                  selectedShipping === option.id
                                    ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                                <div className="flex items-center gap-4">
                                  <div className={`rounded-full p-2 ${
                                    selectedShipping === option.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{option.title}</p>
                                    <p className="text-sm text-gray-500">{option.description}</p>
                                  </div>
                                </div>
                                <span className="font-medium">
                                  {formatPrice(option.price)}
                                </span>
                              </label>
                            )
                          })}
                        </RadioGroup>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Payment Section */}
            {step === 'payment' && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-full bg-gray-900 p-2 text-white">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Forma de Pagamento</h2>
                      <p className="text-sm text-gray-500">Escolha como deseja pagar</p>
                    </div>
                  </div>

                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={(value) => setSelectedPayment(value)}
                    className="space-y-4"
                  >
                    {/* Credit Card */}
                    <label className="flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors hover:border-gray-300">
                      <RadioGroupItem value="credit" id="credit" className="sr-only" />
                      <div className="flex items-center gap-4">
                        <div className="rounded-full p-2 bg-gray-100">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Cartão de Crédito</p>
                          <p className="text-sm text-gray-500">Até 12x sem juros</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image src="/visa.svg" alt="Visa" width={32} height={32} />
                        <Image src="/mastercard.svg" alt="Mastercard" width={32} height={32} />
                      </div>
                    </label>

                    {/* Pix */}
                    <label className="flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors hover:border-gray-300">
                      <RadioGroupItem value="pix" id="pix" className="sr-only" />
                      <div className="flex items-center gap-4">
                        <div className="rounded-full p-2 bg-gray-100">
                          <Zap className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Pix</p>
                          <p className="text-sm text-gray-500">5% de desconto</p>
                        </div>
                      </div>
                    </label>

                    {/* Boleto */}
                    <label className="flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors hover:border-gray-300">
                      <RadioGroupItem value="boleto" id="boleto" className="sr-only" />
                      <div className="flex items-center gap-4">
                        <div className="rounded-full p-2 bg-gray-100">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 4H20V6H4V4ZM4 8H8V18H4V8ZM10 8H14V18H10V8ZM16 8H20V18H16V8ZM4 20H20V22H4V20Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Boleto Bancário</p>
                          <p className="text-sm text-gray-500">Vencimento em 3 dias úteis</p>
                        </div>
                      </div>
                      <Image src="/boleto.svg" alt="Boleto" width={32} height={32} />
                    </label>
                  </RadioGroup>

                  {selectedPayment === 'credit' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          className="bg-gray-50 border-gray-200"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="cardName">Nome no Cartão</Label>
                          <Input
                            id="cardName"
                            placeholder="Nome impresso no cartão"
                            className="bg-gray-50 border-gray-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            placeholder="000"
                            maxLength={4}
                            className="bg-gray-50 border-gray-200"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/AA"
                            className="bg-gray-50 border-gray-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="installments">Parcelas</Label>
                          <select
                            id="installments"
                            className="w-full rounded-md border-gray-200 bg-gray-50 py-2 text-sm"
                          >
                            <option value="1">1x de {formatPrice(total)}</option>
                            <option value="2">2x de {formatPrice(total / 2)}</option>
                            <option value="3">3x de {formatPrice(total / 3)}</option>
                            <option value="4">4x de {formatPrice(total / 4)}</option>
                            <option value="5">5x de {formatPrice(total / 5)}</option>
                            <option value="6">6x de {formatPrice(total / 6)}</option>
                            <option value="7">7x de {formatPrice(total / 7)}</option>
                            <option value="8">8x de {formatPrice(total / 8)}</option>
                            <option value="9">9x de {formatPrice(total / 9)}</option>
                            <option value="10">10x de {formatPrice(total / 10)}</option>
                            <option value="11">11x de {formatPrice(total / 11)}</option>
                            <option value="12">12x de {formatPrice(total / 12)}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPayment === 'pix' && (
                    <div className="mt-6">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-green-100 p-2">
                            <Zap className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Total com 5% de desconto: {formatPrice(total * 0.95)}
                            </p>
                            <p className="text-sm text-gray-500">
                              O QR Code para pagamento será gerado após a confirmação do pedido
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPayment === 'boleto' && (
                    <div className="mt-6">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-blue-100 p-2">
                            <svg
                              className="h-5 w-5 text-blue-600"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 4H20V6H4V4ZM4 8H8V18H4V8ZM10 8H14V18H10V8ZM16 8H20V18H16V8ZM4 20H20V22H4V20Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Total a pagar: {formatPrice(total)}
                            </p>
                            <p className="text-sm text-gray-500">
                              O boleto será gerado após a confirmação do pedido com vencimento em 3 dias úteis
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Resumo do Pedido</h2>
                <div className="flow-root">
                  <div className="divide-y divide-gray-200 -my-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex py-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium text-gray-900">
                              <h3 className="line-clamp-2">{item.name}</h3>
                              <p className="ml-4">{formatPrice((item.salePrice || item.price) * item.quantity)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Qtd: {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium text-gray-900">{formatPrice(subtotal)}</p>
                </div>

                {(showShippingOptions && (subtotal >= 299 || selectedShipping)) && (
                  <>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Frete</p>
                      <p className="font-medium text-gray-900">{shipping === 0 ? "Grátis" : formatPrice(shipping)}</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4">
                      <p className="text-base font-medium text-gray-900">Total</p>
                      <p className="text-base font-medium text-gray-900">{formatPrice(total)}</p>
                    </div>
                  </>
                )}

                {!showShippingOptions && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-600 text-center">
                      Informe seu CEP para calcular o frete
                    </p>
                  </div>
                )}

                {(showShippingOptions && !selectedShipping && subtotal < 299) && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-600 text-center">
                      Selecione uma opção de frete
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleContinue}
                  disabled={!isStepValid()}
                >
                  {getButtonText()}
                </Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Pagamento 100% seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
