import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { articlesByTag } from '../data/articles';

/**
 * Footer slot: 5 random blog articles, re-picked on every render.
 * Shows the same slot on every page (home, tools, blog, legal…).
 */
export function FooterArticles() {
  const picks = useMemo(() => {
    const all = Object.values(articlesByTag).flat();
    if (all.length === 0) return [];
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(5, all.length));
  }, []);

  if (picks.length === 0) return null;

  return (
    <div className="footer-articles">
      <h3 className="footer-articles-title">From the blog</h3>
      <ul className="footer-articles-list">
        {picks.map(a => (
          <li key={a.slug}>
            <Link to={`/blog/${a.slug}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
