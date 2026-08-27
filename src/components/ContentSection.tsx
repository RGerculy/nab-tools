import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import type { ToolContent } from '../data/content/types';
import { toolBySlug } from '../data/tools';
import { FaqItem } from './FaqItem';
import './ContentSection.css';

/**
 * Renders the article portion of a tool page: intro, sections, FAQ
 * (accordion + JSON-LD FAQPage schema), and related tools.
 */
export function ToolArticle({ content }: { content: ToolContent }) {
  const relatedTools = useMemo(
    () => (content.relatedSlugs ?? []).map(slug => toolBySlug(slug)).filter(Boolean),
    [content.relatedSlugs],
  );

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }), [content.faqs]);

  return (
    <article className="tool-article">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {content.intro.map((p, i) => <p key={i} className="article-intro">{p}</p>)}

      {content.sections.map((section, i) => (
        <section key={i} className="article-section">
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
          {section.list && section.list.length > 0 && (
            <ul>
              {section.list.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          )}
          {section.tip && (
            <div className="article-tip">
              <Lightbulb size={16} aria-hidden="true" />
              <span><strong>Tip:</strong> {section.tip}</span>
            </div>
          )}
        </section>
      ))}

      {content.faqs.length > 0 && (
        <section className="article-section">
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {content.faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </section>
      )}

      {relatedTools.length > 0 && (
        <section className="article-section">
          <h2>Related tools</h2>
          <div className="related-tools">
            {relatedTools.map(t => t && (
              <Link key={t.slug} to={`/tools/${t.slug}`} className="related-tool">
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

