export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sobre Nós</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-muted-foreground mb-4">
          Bem-vindo à nossa loja! Somos uma empresa dedicada a oferecer produtos de alta qualidade
          com preços competitivos e excelente atendimento ao cliente.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Nossa História</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Fundada em 2023, nossa loja nasceu do desejo de criar uma experiência de compra única
          e memorável para nossos clientes.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Nossa Missão</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Nossa missão é proporcionar a melhor experiência de compra online, oferecendo produtos
          de qualidade e um atendimento excepcional.
        </p>
      </div>
    </div>
  )
}
