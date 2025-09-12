import prisma from "@/lib/prisma";
import type { SuggestArticlesResponse } from "@/types/articles";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const title = (url.searchParams.get("title") || "").trim();

    const items = await prisma.article.findMany({
      where: title ? { title: { contains: title, mode: "insensitive" } } : undefined,
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, createdAt: true },
    });

    const articles = items.map((a) => ({
      id: a.id,
      title: a.title,
      publishedDate: a.createdAt.toISOString(),
      slug: a.id,
    }));

    const body: SuggestArticlesResponse = { articles };
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch suggestion articles" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
