import { articlesByTag } from '../data/articles';
import { Link } from 'react-router-dom';
import './Blog.css';

/** Blog index — lists all posts from the article registry. */
export function Blog() {
  const posts = Object.entries(articlesByTag)
    .flatMap(([tag, articles]) => articles.map(a => ({ ...a, tag })))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="blog">
      <section className="hero">
        <h1>Blog</h1>
        <p>Guides, explainers, and tips behind the tools — DNS, security, web dev, and more.</p>
      </section>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <p>No articles yet — we're writing. Check back soon.</p>
          <p>
            Meanwhile, try the{' '}
            <Link to="/tools/dns-lookup">DNS lookup</Link>,{' '}
            <Link to="/tools/password-generator">password generator</Link>, or{' '}
            <Link to="/tools/json-formatter">JSON formatter</Link>.
          </p>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="post-card">
              <span className="post-tag">{post.tag}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <small>{post.date}</small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
