import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import NewsBody from "./NewsBody";
import { articles } from "../../data";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);
  if (!article) return {};
  return { title: `${article.title} – Sport News`, description: article.excerpt };
}

export default async function NewsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <NewsBody article={article} />
    </>
  );
}
