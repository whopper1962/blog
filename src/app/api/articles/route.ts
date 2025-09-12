import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { ArticlesApiResponse, SortKey } from "@/types/articles";

function parseIntParam(value: string | null, fallback: number): number {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseIntParam(url.searchParams.get("page"), 1);
    const pageSize = parseIntParam(url.searchParams.get("pageSize"), 8);
    const sort = (url.searchParams.get("sort") as SortKey) || "newest";
    const search = (url.searchParams.get("q") || "").trim();
    const title = (url.searchParams.get("title") || "").trim();

    const where: Prisma.ArticleWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { excerpt: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        title ? { title: { contains: title, mode: "insensitive" } } : {},
      ],
    };

    const orderBy: Prisma.ArticleOrderByWithRelationInput =
      sort === "title" ? { title: "asc" } : { createdAt: (sort === "oldest" ? "asc" : "desc") as Prisma.SortOrder };

    const total = await prisma.article.count({ where });
    const items = await prisma.article.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        excerpt: true,
        createdAt: true,
      },
    });

    const articles = items.map((a) => ({
      id: a.id,
      title: a.title,
      excerpt: a.excerpt,
      publishedDate: a.createdAt.toISOString(),
      slug: a.id,
    }));

    const body: ArticlesApiResponse = {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
      sort,
      q: search || undefined,
      title: title || undefined,
      articles,
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to list articles" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
