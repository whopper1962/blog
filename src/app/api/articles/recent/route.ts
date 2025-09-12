import prisma from "@/lib/prisma";
import type { RecentArticlesResponse } from "@/types/articles";

export async function GET() {
  try {
    const items = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, excerpt: true, createdAt: true },
    });

    const articles = items.map((a) => ({
      id: a.id,
      title: a.title,
      excerpt: a.excerpt,
      publishedDate: a.createdAt.toISOString(),
      slug: a.id,
    }));

    const body: RecentArticlesResponse = { articles };
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to load recent articles" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
