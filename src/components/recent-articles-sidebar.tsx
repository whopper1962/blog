"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SuggestArticlesResponse } from "@/types/articles";
import { formatDate } from "@/lib/date";

export function RecentArticlesSidebar() {
  const [title, setTitle] = useState("");
  const deferredTitle = useDeferredValue(title);

  const { data, isFetching } = useQuery<SuggestArticlesResponse>({
    queryKey: ["sidebar-articles", deferredTitle],
    queryFn: async () => {
      const qs = deferredTitle ? `?title=${encodeURIComponent(deferredTitle)}` : "";
      const res = await fetch(`/api/articles/suggest${qs}`);
      if (!res.ok) throw new Error("Failed to fetch sidebar articles");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const articles = data?.articles ?? [];

  return (
    <div className="space-y-8">
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        <Input
          type="search"
          placeholder="記事を検索..."
          className="pl-10 bg-background/50 border-border/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-xs font-medium text-muted-foreground mb-4 px-1 uppercase tracking-wide">最近の記事</h3>
        {isFetching ? (
          <div className="space-y-3" aria-busy="true" role="status">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse py-2 px-1">
                <div className="h-3 w-5/6 bg-muted rounded mb-2" />
                <div className="h-2 w-24 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-xs text-muted-foreground px-1">該当する記事がありません。</div>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="block py-2 px-1 hover:text-blue-600 transition-colors group"
              >
                <div className="text-sm font-medium text-foreground group-hover:text-blue-600 transition-colors">
                  {article.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{formatDate(article.publishedDate)}</div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-border/50">
          {articles.length >= 5 && <p className="text-xs text-muted-foreground mb-2 px-1">最新の5件を表示中</p>}
          <Link
            href="/articles"
            className="inline-flex items-center text-xs text-blue-600 hover:text-blue-500 transition-colors px-1 font-medium"
          >
            記事一覧を見る
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
