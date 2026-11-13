import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoWindow } from "@/components/demo/DemoWindow";
import { Navbar } from "@/components/dws/Navbar";
import {
  getDemoByShowcaseSlug,
  portfolioDemos,
  showcaseSlug,
} from "@/data/portfolio-demos";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioDemos.flatMap((demo) => {
    const slug = showcaseSlug(demo);
    return slug ? [{ slug }] : [];
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemoByShowcaseSlug(slug);
  if (!demo) return {};
  return {
    title: demo.meta.title,
    description: demo.meta.description,
  };
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const demo = getDemoByShowcaseSlug(slug);

  if (!demo?.href) notFound();

  return (
    <DemoWindow src={`${demo.href}?embed=1`} title={demo.title}>
      <Navbar hrefBase="/" fixed={false} />
    </DemoWindow>
  );
}
