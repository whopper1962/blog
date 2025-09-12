import { IconLink } from "@/components/icon-link";
import Image from "next/image";
import Link from "next/link";
import type { RecentArticlesResponse } from "@/types/articles";
import { formatDate } from "@/lib/date";

export default async function Home() {
  const endpoint = `${process.env.NEXT_PUBLIC_SITE_URL}/api/articles/recent`;
  const res = await fetch(endpoint, { cache: "no-store" });
  const data: RecentArticlesResponse = await res.json();
  const recentArticles = data.articles ?? [];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-24">
          <div className="order-1 lg:order-2 flex justify-center lg:justify-center">
            <Image
              src="/whopper-lg.png"
              alt="コミックの表紙"
              className="w-auto object-contain"
              width={0}
              height={0}
              sizes="100vw"
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Ayoo! Welcome to my blog!</h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Masahi Kawakami です。趣味はNFL観戦（LA Ramsファン）、アメコミ、ゲーム、プログラミング、イラストです。
                <Link
                  href={`/articles/e48f5222-e7e7-4378-ab55-bec7792f2dc6`}
                  className="text-blue-600 hover:text-blue-500"
                >
                  こちらのページ
                </Link>
                で描いたイラストを紹介しています。
                <br />
                色々と記事を投稿して行こうと思います。アメコミやイラストの紹介が多くなりそうな予感です。よろしくお願いします。
              </p>
            </div>

            <div className="flex space-x-4">
              <IconLink href="https://github.com/whopper1962">
                <svg className="w-6 md:w-8 h-6 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </IconLink>
              <IconLink href="https://www.linkedin.com/in/masashi-kawakami-whopper1962">
                <svg className="w-6 md:w-8 h-6 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </IconLink>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 mb-12 lg:mb-24">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">最新の記事</h2>
            <Link
              href="/articles"
              className="text-sm sm:text-base text-blue-600 hover:text-blue-500 transition-colors font-medium flex items-center gap-1"
            >
              記事一覧を見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="block border-b border-border pb-4 sm:pb-5 last:border-b-0 last:pb-0 hover:opacity-80 transition-opacity duration-200"
              >
                <article className="h-full flex flex-col justify-between min-h-[100px] sm:min-h-[120px]">
                  <div className="space-y-2 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <time>{formatDate(article.publishedDate)}</time>
                    </div>

                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <div className="text-muted-foreground leading-relaxed text-xs sm:text-sm min-h-[2.5rem] sm:min-h-[3rem] flex-grow">
                      <p className="line-clamp-3 overflow-hidden">{article.excerpt}</p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 justify-center items-center">
              <div className="flex-shrink-0">
                <Image src="/whopper-coding.png" alt="Person using computer" width={100} height={100} />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Qiitaにて技術記事を投稿しています。よろしければご覧ください。
                </p>
                <Link
                  href="https://qiita.com/whopper1962"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 transition-colors font-medium text-sm sm:text-base"
                >
                  記事を見る
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
