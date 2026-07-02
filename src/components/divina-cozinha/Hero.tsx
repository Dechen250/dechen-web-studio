import Image from "next/image";
import { heroImage } from "@/data/divina-cozinha";
import { Button, FadeIn } from "./ui";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/95 via-[#FAF9F6]/75 to-[#FAF9F6]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 py-32 md:px-8">
        <FadeIn>
          <p className="mb-4 font-sans text-xs font-medium tracking-[0.25em] text-[#8B9A7D] uppercase">
            Culinária contemporânea
          </p>
          <h1 className="max-w-2xl font-display text-4xl leading-[1.1] font-medium tracking-tight text-[#3D3832] md:text-5xl lg:text-6xl">
            Mais do que uma refeição.
            <br />
            <span className="text-[#6B6560]">
              Uma experiência para ser lembrada.
            </span>
          </h1>
          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-[#6B6560] md:text-lg">
            Na Divina Cozinha, ingredientes selecionados, ambiente acolhedor e
            alta gastronomia se unem para criar momentos inesquecíveis.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#reservas">Reservar Mesa</Button>
            <Button href="#cardapio" variant="secondary">
              Conhecer o Cardápio
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
