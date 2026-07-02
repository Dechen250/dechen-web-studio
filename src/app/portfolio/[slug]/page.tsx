import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDemoPage from "@/components/portfolio/PortfolioDemoPage";
import {
  getPortfolioDemo,
  portfolioDemos,
} from "@/data/portfolio-demos";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioDemos.map((demo) => ({ slug: demo.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = getPortfolioDemo(slug);
  if (!demo) return {};
  return {
    title: demo.meta.title,
    description: demo.meta.description,
  };
}

export default async function PortfolioSlugPage({ params }: Props) {
  const { slug } = await params;
  const demo = getPortfolioDemo(slug);

  if (!demo) notFound();

  return <PortfolioDemoPage demo={demo} />;
}
