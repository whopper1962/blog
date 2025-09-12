export interface ArticleFrontmatter {
  title: string;
  publishedDate: string;
  updatedDate?: string;
  excerpt?: string;
}

export interface LoadedArticle {
  slug: string;
  frontmatter: ArticleFrontmatter;
  markdown: string;
}

export interface ApiArticleResponse {
  frontmatter: ArticleFrontmatter;
  markdown: string;
}

export interface NeighborArticleSummary {
  id: string;
  title: string;
  excerpt: string;
}

export interface ApiArticleWithNeighbors extends ApiArticleResponse {
  prev?: NeighborArticleSummary | null;
  next?: NeighborArticleSummary | null;
}

export interface ArticleListItem {
  id: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  slug: string;
}

export interface SortKeyMap {
  newest: "newest";
  oldest: "oldest";
  title: "title";
}
export type SortKey = keyof SortKeyMap;

export interface ArticlesApiResponse {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  sort: SortKey;
  q?: string;
  title?: string;
  articles: ArticleListItem[];
}

export interface RecentArticlesResponse {
  articles: ArticleListItem[];
}

export interface SuggestArticlesResponse {
  articles: Pick<ArticleListItem, "id" | "title" | "publishedDate" | "slug">[];
}
