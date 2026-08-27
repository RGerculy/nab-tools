import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug } from '../data/articles';
import { toolBySlug } from '../data/tools';
import { FaqItem } from './FaqItem';
import './BlogPost.css';
import { DEFAULT_TITLE, pageTitle } from '../data/brand';

/**
 * Renders a single blog article at /blog/:slug.
 * Includes a standard AI-assistance disclosure footer.
 */
export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      document.title = pageTitle(article.title);
    } else {
      document.title = pageTitle('Article not found');
    }
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [article]);

  if (!article) {
    return (
      <div className="static-page centered">
        <h1>Article not found</h1>
        <p>The article you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn">← Back to blog</Link>
      </div>
    );
  }

  const relatedTools = (article.relatedToolSlugs ?? [])
    .map(s => toolBySlug(s))
    .filter(Boolean);

  const faqSchema = article.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <article className="blog-post">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <Link to="/blog">Blog</Link> <span>/</span> <span>{article.title}</span>
      </nav>

      <header className="blog-post-header">
        <span className="post-tag">{article.tag}</span>
        <h1>{article.title}</h1>
        <p className="blog-post-date">{article.date}</p>
      </header>

      {article.intro.map((p, i) => (
        <p key={i} className="blog-post-lead">{p}</p>
      ))}

      {article.sections.map((section, i) => (
        <section key={i} className="blog-post-section">
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
          {section.list && section.list.length > 0 && (
            <ul>
              {section.list.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          )}
          {section.tip && (
            <div className="article-tip">
              <strong>Tip:</strong> {section.tip}
            </div>
          )}
        </section>
      ))}

      {article.faqs && article.faqs.length > 0 && (
        <section className="blog-post-section">
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {article.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>
      )}

      {relatedTools.length > 0 && (
        <section className="blog-post-section">
          <h2>Try it yourself</h2>
          <div className="related-tools">
            {relatedTools.map(t => t && (
              <Link key={t.slug} to={`/tools/${t.slug}`} className="related-tool">
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {article.sources && article.sources.length > 0 && (
        <section className="blog-post-section">
          <h2>Sources &amp; further reading</h2>
          <ul className="sources-list">
            {article.sources.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="blog-post-disclosure">
        <p>
          <em>
            This article was researched and drafted with the assistance of AI,
            then reviewed and edited by a human.
          </em>
        </p>
      </footer>
    </article>
  );
}
