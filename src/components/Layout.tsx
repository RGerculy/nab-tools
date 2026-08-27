import { Outlet, Link, NavLink } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Menu, X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { tools } from '../data/tools';
import { ToolIcon } from './icons';
import { ToastHost } from './Toast';

import { FooterArticles } from './FooterArticles';
import { BRAND } from '../data/brand';
import { BLOG_ENABLED } from '../config';
import './Layout.css';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools;
    const q = searchQuery.toLowerCase();
    return tools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  const closeAll = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setLegalOpen(false);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label={`${BRAND} Home`}>
            <span className="brand-icon"><ToolIcon name="Shield" size={26} /></span>
            <span className="brand-text">{BRAND}</span>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
            <div className="search-wrapper">
              <button
                className={`search-toggle ${searchOpen ? 'open' : ''}`}
                onClick={() => setSearchOpen(!searchOpen)}
                aria-expanded={searchOpen}
                aria-label={searchOpen ? 'Close search' : 'Search tools'}
              >
                {searchOpen ? <X size={16} /> : <Search size={16} />}
              </button>
              {searchOpen && (
                <div className="search-overlay">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search tools… (password, json, qr, hash)"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    autoFocus
                    aria-label="Search tools"
                  />
                  <div className="search-results">
                    {filteredTools.length > 0 ? (
                      filteredTools.slice(0, 8).map(tool => (
                        <Link key={tool.slug} to={`/tools/${tool.slug}`} className="search-result" onClick={closeAll}>
                          <span className="search-result-icon"><ToolIcon name={tool.icon} size={16} /></span>
                          <span>{tool.name}</span>
                        </Link>
                      ))
                    ) : (
                      <div className="search-empty">No tools found</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <ul className="nav-links">
              <li>
                <NavLink to="/" end className="nav-link" onClick={closeAll}>Home</NavLink>
              </li>
              {BLOG_ENABLED && <li>
                <NavLink to="/blog" className="nav-link" onClick={closeAll}>Blog</NavLink>
              </li>}
              <li>
                <NavLink to="/about" className="nav-link" onClick={closeAll}>About</NavLink>
              </li>
              <li className="nav-category">
                <button
                  className="nav-category-toggle"
                  onClick={() => setLegalOpen(!legalOpen)}
                  aria-expanded={legalOpen}
                >
                  <span>Legal</span>
                  {legalOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {legalOpen && (
                  <ul className="nav-tools">
                    <li><Link to="/privacy" className="nav-tool-link" onClick={closeAll}>Privacy</Link></li>
                    <li><Link to="/tos" className="nav-tool-link" onClick={closeAll}>Terms of Service</Link></li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main className="main" id="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          {BLOG_ENABLED && <FooterArticles />}
          <p>{BRAND} — every tool runs 100% in your browser. No uploads, no tracking, no servers.</p>
          <p className="footer-links">
            {BLOG_ENABLED && <><Link to="/blog">Blog</Link> · </>}
            <Link to="/about">About</Link> · <Link to="/privacy">Privacy</Link> · <Link to="/tos">Terms</Link>
          </p>
        </div>
      </footer>

      <ToastHost />

    </div>
  );
}
