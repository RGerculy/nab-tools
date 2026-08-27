import { Link } from 'react-router-dom';
import './StaticPages.css';

export function Privacy() {
  return (
    <div className="static-page">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: 27 August 2026</em></p>

      <h2>Short version</h2>
      <p>
        NAB Tools is designed so your data stays on your device. There are no accounts,
        application databases, tracking cookies, or server-side processing of local tool input.
      </p>

      <h2>How tools work</h2>
      <p>
        Tools such as password generation, JSON formatting, hashing, encoding, word counting,
        colour conversion, QR codes, and UUID generation run in your browser using JavaScript.
        Your input is processed locally and is not transmitted to NAB Tools servers.
      </p>

      <h2>Storage</h2>
      <p>
        NAB Tools does not intentionally store your tool inputs on the server. Most tools keep
        working values only in the current page while you use them. Your browser may retain
        normal browser data according to its own settings.
      </p>

      <h2>Exceptions</h2>
      <p>Two lookup tools contact third-party services because they need external information:</p>
      <ul>
        <li><strong>What Is My IP</strong> — contacts <a href="https://www.ipify.org" rel="noopener noreferrer">ipify.org</a> and <a href="https://ip-api.com" rel="noopener noreferrer">ip-api.com</a> to return public IP and approximate location information.</li>
        <li><strong>DNS Lookup</strong> — sends the domain and record type to Cloudflare or Google DNS-over-HTTPS.</li>
      </ul>
      <p>
        These third parties have their own privacy policies. No data from the other tools is
        intentionally sent over the network by NAB Tools.
      </p>

      <h2>Contact</h2>
      <p>Questions? Reach out via <a href="mailto:contact@notabis.com">contact@notabis.com</a> or the <Link to="/about">About page</Link>.</p>
    </div>
  );
}

export function About() {
  return (
    <div className="static-page">
      <h1>About NAB Tools</h1>
      <p>
        NAB Tools is a collection of free, useful online tools that run 100% in your browser.
        No uploads. No accounts. No tracking. Just tools that work.
      </p>
      <h2>Why browser-only?</h2>
      <p>
        Running tools client-side means your data never leaves your device. That makes the
        tools fast, private, and free to operate — there are no servers processing your files,
        which means no server costs and no data breaches.
      </p>
      <h2>What's next</h2>
      <p>
        We're adding new tools regularly. If you have an idea, or a tool you wish existed,
        we'd love to hear about it.
      </p>
      <p className="muted">Built with ❤️ in 2026.</p>
      <h2>Contact</h2>
      <p>Questions, feedback, or ideas for new tools? Email <a href="mailto:contact@notabis.com">contact@notabis.com</a>.</p>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="static-page centered">
      <h1>404 — Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn">← Back to all tools</Link>
    </div>
  );
}
