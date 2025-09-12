import prisma from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return new Response(JSON.stringify({ error: "Article not found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    const [prev, next] = await Promise.all([
      prisma.article.findFirst({
        where: { createdAt: { lt: article.createdAt } },
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, excerpt: true },
      }),
      prisma.article.findFirst({
        where: { createdAt: { gt: article.createdAt } },
        orderBy: { createdAt: "asc" },
        select: { id: true, title: true, excerpt: true },
      }),
    ]);

    const body = {
      frontmatter: {
        title: article.title,
        publishedDate: article.createdAt.toISOString(),
        excerpt: article.excerpt,
      },
      markdown: article.content,
      prev: prev ?? null,
      next: next ?? null,
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch article" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
