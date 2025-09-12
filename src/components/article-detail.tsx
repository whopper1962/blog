import { ArticleContent } from "@/components/article-content";
import { notFound } from "next/navigation";
import type { ApiArticleWithNeighbors } from "@/types/articles";

interface ArticleDetailProps {
  id: string;
}

export default async function ArticleDetail({ id }: ArticleDetailProps) {
  const endpoint = `${process.env.NEXT_PUBLIC_SITE_URL}/api/articles/${encodeURIComponent(id)}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) notFound();
  const data = (await res.json()) as ApiArticleWithNeighbors;

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 lg:p-8 shadow-lg">
      <ArticleContent
        article={{ frontmatter: data.frontmatter, markdown: data.markdown, prev: data.prev, next: data.next }}
      />
    </div>
  );
}
