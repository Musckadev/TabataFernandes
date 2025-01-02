"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    title: "Coleção Primavera",
    description: "Peças delicadas banhadas a ouro 18k",
  },
  {
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    title: "Colares Exclusivos",
    description: "Design único com acabamento premium",
  },
  {
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
    title: "Brincos Sofisticados",
    description: "Para todas as ocasiões",
  },
]

export function HeroCarousel() {
  return (
    <div className="w-full">
      <Carousel className="w-full max-w-screen-2xl mx-auto">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[2.5/1] w-full overflow-hidden rounded-lg">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-white/90 max-w-md">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  )
}