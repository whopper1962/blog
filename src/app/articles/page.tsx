import ArticlesList from "@/components/articles-list";
import { AuthorProfile } from "@/components/author-profile";
import { Suspense } from "react";
import { LoadingListSkeleton } from "@/components/loading-skeleton";

export default async function ArticlesPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-5 md:mb-24">
      <div className="lg:col-span-3 w-full">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<LoadingListSkeleton />}>
            <ArticlesList />
          </Suspense>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-6">
          <AuthorProfile />
        </div>
      </div>
    </div>
  );
}
