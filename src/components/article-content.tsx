import Link from "next/link";
import type { ArticleFrontmatter, NeighborArticleSummary } from "@/types/articles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeUnwrapImages from "rehype-unwrap-images";
import Image from "next/image";
import { Children, isValidElement } from "react";
import { formatDate } from "@/lib/date";

interface ArticleContentProps {
  article: {
    frontmatter: ArticleFrontmatter;
    markdown: string;
    prev?: NeighborArticleSummary | null;
    next?: NeighborArticleSummary | null;
  };
}

export async function ArticleContent(props: ArticleContentProps) {
  const { title, publishedDate, updatedDate } = props.article.frontmatter;

  return (
    <article className="space-y-8">
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <Link href="/articles" className="hover:text-foreground transition-colors">
          記事一覧
        </Link>
        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
        <span className="text-foreground break-words">{title}</span>
      </nav>

      <header className="space-y-6">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
          {title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>公開日:</span>
            <span className="font-medium text-foreground whitespace-nowrap">{formatDate(publishedDate)}</span>
          </div>
          {updatedDate && (
            <div className="flex items-center gap-2">
              <span>更新日:</span>
              <span className="font-medium text-foreground whitespace-nowrap">{formatDate(updatedDate)}</span>
            </div>
          )}
        </div>
      </header>

      <div className="prose text-sm md:text-base prose-lg md:prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeUnwrapImages]}
          components={{
            h1: ({ children }) => (
              <h2 className="mt-10 mb-4 text-2xl md:text-3xl font-bold tracking-tight text-foreground">{children}</h2>
            ),
            h2: ({ children }) => (
              <h3 className="mt-8 mb-3 text-xl md:text-2xl font-semibold tracking-tight text-foreground">{children}</h3>
            ),
            h3: ({ children }) => (
              <h4 className="mt-6 mb-2 text-lg md:text-xl font-semibold tracking-tight text-foreground">{children}</h4>
            ),
            p: ({ children }) => {
              const hasElementChild = Children.toArray(children).some((child) => isValidElement(child));
              if (hasElementChild) return <div className="text-muted-foreground leading-relaxed">{children}</div>;
              return <p className="text-muted-foreground leading-relaxed">{children}</p>;
            },
            a: ({ href, children }) => (
              <a href={href as string} className="text-blue-600 hover:underline">
                {children}
              </a>
            ),
            img: ({ src, alt, title }) => {
              const cleanedSrc = ((src as string) || "").trim().replace(/,$/, "");
              return (
                <figure className="my-8 flex flex-col items-center" data-block>
                  <Image
                    src={cleanedSrc}
                    alt={alt || ""}
                    className="max-h-80 w-auto object-contain"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                    style={{ width: "100%", height: "auto" }}
                  />
                  {title ? (
                    <figcaption className="mt-3 text-xs sm:text-sm text-muted-foreground text-center italic">
                      {title}
                    </figcaption>
                  ) : null}
                </figure>
              );
            },
            ul: ({ children }) => (
              <ul className="space-y-2 my-6 text-muted-foreground text-sm md:text-base">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5 flex-shrink-0"></span>
                <span className="leading-relaxed">{children}</span>
              </li>
            ),
          }}
        >
          {props.article.markdown}
        </ReactMarkdown>
      </div>

      {(props.article.prev || props.article.next) && (
        <nav className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-border/50">
          {props.article.prev ? (
            <Link
              href={`/articles/${props.article.prev.id}`}
              className="flex-1 group p-4 sm:p-6 rounded-lg border border-border/50 bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1">前の記事</div>
                  <div className="text-sm sm:text-base text-blue-600 group-hover:text-blue-500 transition-colors">
                    <span className="mr-2">«</span>
                    {props.article.prev.title}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {props.article.next ? (
            <Link
              href={`/articles/${props.article.next.id}`}
              className="flex-1 group p-4 sm:p-6 rounded-lg border border-border/50 bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="ml-auto text-right">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1">次の記事</div>
                  <div className="text-sm sm:text-base text-blue-600 group-hover:text-blue-500 transition-colors">
                    {props.article.next.title}
                    <span className="ml-2">»</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      )}
    </article>
  );
}
