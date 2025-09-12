"use client";

import type React from "react";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import type { ArticlesApiResponse } from "@/types/articles";
import { LoadingListSkeleton } from "@/components/loading-skeleton";
import { formatDate } from "@/lib/date";

export default function ArticlesList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTitle = searchParams.get("title") || "";
  const initialSort = (searchParams.get("sort") as "newest" | "oldest" | "title") || "newest";
  const initialPage = Number.parseInt(searchParams.get("page") || "1", 10) || 1;

  const [title, setTitle] = useState(initialTitle);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const PAGE_SIZE = 10;
  const [isPending, startTransition] = useTransition();

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (sortBy) params.set("sort", sortBy);
    params.set("page", String(currentPage));
    params.set("pageSize", String(PAGE_SIZE));
    return params.toString();
  }, [title, sortBy, currentPage]);

  const { data, isFetching } = useQuery<ArticlesApiResponse>({
    queryKey: ["articles", queryString],
    queryFn: async () => {
      const res = await fetch(`/api/articles?${queryString}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch articles");
      return (await res.json()) as ArticlesApiResponse;
    },
    placeholderData: (prev) => prev,
    initialData: { page: 1, pageSize: 10, total: 0, totalPages: 1, sort: "newest", articles: [] },
  });

  const replaceUrl = (nextTitle: string, nextSort: typeof sortBy, nextPage: number) => {
    const params = new URLSearchParams();
    if (nextTitle) params.set("title", nextTitle);
    params.set("sort", nextSort);
    params.set("page", String(nextPage));
    params.set("pageSize", String(PAGE_SIZE));
    const url = `?${params.toString()}`;
    startTransition(() => router.replace(url, { scroll: false }));
  };

  const currentArticles = data?.articles ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTitle = e.target.value;
    setTitle(nextTitle);
    setCurrentPage(1);
    replaceUrl(nextTitle, sortBy, 1);
  };

  const handleSortChange = (newSort: "newest" | "oldest" | "title") => {
    setSortBy(newSort);
    setCurrentPage(1);
    replaceUrl(title, newSort, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    replaceUrl(title, sortBy, page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <Input type="text" placeholder="タイトルで検索" value={title} onChange={handleTitleChange} className="w-full" />
      </div>

      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-4">
          <span className="text-xs sm:text-sm text-muted-foreground">並び替え:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleSortChange("newest")}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors cursor-pointer ${
                sortBy === "newest"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              新しい順
            </button>
            <button
              onClick={() => handleSortChange("oldest")}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors cursor-pointer ${
                sortBy === "oldest"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              古い順
            </button>
            <button
              onClick={() => handleSortChange("title")}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors cursor-pointer ${
                sortBy === "title"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              タイトル
            </button>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">全{total}件</div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {isFetching || isPending ? (
          <LoadingListSkeleton />
        ) : currentArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">該当する記事がありません。</p>
          </div>
        ) : (
          currentArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="block border-b border-border pb-4 sm:pb-5 last:border-b-0 last:pb-0 hover:opacity-80 transition-opacity duration-200"
            >
              <article className="h-full flex flex-col justify-between min-h-[120px] sm:min-h-[140px]">
                <div className="space-y-2 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <time>{formatDate(article.publishedDate)}</time>
                  </div>

                  <h2 className="text-base sm:text-xl font-semibold transition-colors">{article.title}</h2>

                  <div className="text-muted-foreground leading-relaxed text-xs sm:text-base min-h-[3rem] sm:min-h-[3.6rem] flex-grow">
                    <p className="line-clamp-3 overflow-hidden">{article.excerpt}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8 border-t border-border">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-2 text-xs sm:text-sm rounded-md transition-colors ${
              currentPage === 1
                ? "text-muted-foreground cursor-not-allowed"
                : "text-foreground hover:bg-muted cursor-pointer"
            }`}
          >
            <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
              <span className="border-l-2 border-b-2 border-current w-2 h-2 rotate-45 transform"></span>
            </span>
            前へ
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors cursor-pointer ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-2 text-xs sm:text-sm rounded-md transition-colors ${
              currentPage === totalPages
                ? "text-muted-foreground cursor-not-allowed"
                : "text-foreground hover:bg-muted cursor-pointer"
            }`}
          >
            次へ
            <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
              <span className="border-r-2 border-b-2 border-current w-2 h-2 -rotate-45 transform"></span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
