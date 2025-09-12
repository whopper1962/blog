import { AuthorProfile } from "@/components/author-profile";
import { RecentArticlesSidebar } from "@/components/recent-articles-sidebar";
import ArticleDetail from "@/components/article-detail";
import { Suspense } from "react";
import { ScrollResetOnMount } from "@/components/scroll-reset";
import ArticleDetailSkeleton from "@/components/article-detail-skeleton";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
      <ScrollResetOnMount />
      <aside className="hidden lg:block lg:col-span-1">
        <div className="sticky top-6">
          <RecentArticlesSidebar />
        </div>
      </aside>

      <main className="lg:col-span-2 xl:col-span-3">
        <Suspense fallback={<ArticleDetailSkeleton />}>
          <ArticleDetail id={id} />
        </Suspense>
      </main>

      <div className="lg:hidden">
        <div className="mt-2">
          <RecentArticlesSidebar />
        </div>
      </div>

      <aside className="hidden lg:block lg:col-span-1">
        <div className="sticky top-6">
          <AuthorProfile />
        </div>
      </aside>
    </div>
  );
}
