import Image from "next/image";
import { ButtonLink } from "@/components/dws/ButtonLink";

export function Hero() {
  return (
    <section className="px-5 pt-28 pb-16 md:px-6 md:pt-32 md:pb-20 lg:px-8 lg:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-5 text-sm text-[#8A8A96]">Studio de sites para negócios locais</p>
          <h1 className="text-balance text-[2.125rem] leading-[1.12] font-semibold tracking-[-0.03em] text-white sm:text-5xl sm:leading-[1.08] lg:text-[3.25rem] lg:leading-[1.06]">
            Um site que faz o cliente falar com você.
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-[#B4B4BE] sm:text-lg">
            Trabalhamos com clínicas, lojas, restaurantes e consultorias. O
            site explica o que você faz, carrega rápido no celular e deixa o
            WhatsApp à vista.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#contato" className="w-full sm:w-auto">
              Pedir orçamento
            </ButtonLink>
            <ButtonLink
              href="#trabalhos"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Ver trabalhos
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-[#6B6B76]">
            7 a 14 dias para publicar · Resposta em até 24h
          </p>
        </div>

        <div>
          <a
            href="#trabalhos"
            className="group block overflow-hidden rounded-lg border border-[#262626] bg-[#0c0c0c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
          >
            <Image
              src="/showcase/divina-cozinha/capa/capa.png"
              alt="Demonstração Divina Cozinha, site de restaurante com cardápio e reservas"
              width={1200}
              height={750}
              priority
              className="h-auto w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </a>
          <p className="mt-3 text-sm text-[#6B6B76]">
            Divina Cozinha · Gastronomia · Demonstração
          </p>
        </div>
      </div>
    </section>
  );
}
