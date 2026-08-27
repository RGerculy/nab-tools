import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { tools, categories } from '../data/tools';
import { ToolIcon } from './icons';
import './Home.css';

export default function Home() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return tools;
    const q = query.toLowerCase();
    return tools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div className="home">

      <section className="hero">
        <h1>Free online tools that run in your browser</h1>
        <p className="hero-sub">
          Password generator, QR codes, JSON formatter, DNS lookup and more.
          No uploads. No tracking. Nothing leaves your device.
        </p>
        <div className="hero-search">
          <Search size={18} className="hero-search-icon" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search tools… e.g. password, qr, json, hash"
            aria-label="Search tools"
          />
        </div>
      </section>

      {query.trim() ? (
        <section className="search-results-section">
          <h2>{filtered.length} tool{filtered.length === 1 ? '' : 's'} found</h2>
          <div className="tool-grid">
            {filtered.map(t => <ToolCard key={t.slug} slug={t.slug} name={t.name} description={t.description} icon={t.icon} />)}
          </div>
          {filtered.length === 0 && <p className="no-results">No tools match “{query}”. Try “password”, “json”, “qr”, “hash”, “ip”.</p>}
        </section>
      ) : (
        categories.map(cat => {
          const catTools = tools.filter(t => t.category === cat.id);
          return (
            <section key={cat.id} className="category-section">
              <div className="category-head">
                <h2>{cat.name}</h2>
                <p>{cat.description}</p>
              </div>
              <div className="tool-grid">
                {catTools.map(t => <ToolCard key={t.slug} slug={t.slug} name={t.name} description={t.description} icon={t.icon} />)}
              </div>
            </section>
          );
        })
      )}

      <section className="privacy-note">
        <h2>Privacy by design</h2>
        <p>
          Every tool on NAB Tools runs entirely in your browser using JavaScript.
          Your text, files, and data are never uploaded to a server — they never
          leave your device. That means no data breaches, no retention, no tracking.
        </p>
      </section>
    </div>
  );
}

function ToolCard({ slug, name, description, icon }: { slug: string; name: string; description: string; icon: string }) {
  return (
    <Link to={`/tools/${slug}`} className="tool-card">
      <div className="tool-card-icon"><ToolIcon name={icon} size={24} /></div>
      <h3 className="tool-card-name">{name}</h3>
      <p className="tool-card-desc">{description}</p>
      <span className="tool-card-cta">Open tool →</span>
    </Link>
  );
}
