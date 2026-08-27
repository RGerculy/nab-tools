import type { ArticleSource, ContentSection } from './content/types';

export interface BlogArticle {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  intro: string[];
  sections: ContentSection[];
  faqs?: { q: string; a: string }[];
  relatedToolSlugs?: string[];
  sources?: ArticleSource[];
}
