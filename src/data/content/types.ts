/**
 * Content standard for every tool page.
 *
 * Every tool gets: intro paragraphs, ordered sections (h2 + paragraphs /
 * optional list / optional tip), FAQ (rendered as accordion + JSON-LD),
 * related tools (internal links), and a blog tag (lights up the related
 * articles slot once the blog registry has posts).
 *
 * Depth should scale with the topic: a simple tool (word counter) gets
 * 3–4 sections; a rich topic (DNS lookup) gets 6+ with real depth.
 */
export interface ArticleSource {
  title: string;
  url: string;
}

export interface ContentSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  tip?: string;
}

export interface ToolContent {
  slug: string;
  /** 1–3 paragraphs directly under the tool UI. */
  intro: string[];
  sections: ContentSection[];
  faqs: { q: string; a: string }[];
  /** Slugs of other tools to cross-link (internal linking for SEO). */
  relatedSlugs?: string[];
}
