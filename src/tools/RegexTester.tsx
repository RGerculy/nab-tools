import { useMemo, useState } from 'react';
import { Check, Terminal, Flag } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function RegexTester() {
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b');
  const [flags, setFlags] = useState('gi');
  const [text, setText] = useState('Contact us at hello@example.com or support@notabis.com today!');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const matches = useMemo(() => {
    setError('');
    if (!pattern) return [];
    try {
      const re = new RegExp(pattern, flags);
      const found: { match: string; index: number }[] = [];
      let m: RegExpExecArray | null;
      const global = flags.includes('g');
      const source = global ? re : new RegExp(re.source, flags + 'g');
      while ((m = source.exec(text)) !== null) {
        found.push({ match: m[0], index: m.index });
        if (m.index === source.lastIndex) source.lastIndex++;
        if (!global) break;
      }
      return found;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid regex');
      return [];
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (matches.length === 0 || error) return escapeHtml(text);
    let out = '';
    let cursor = 0;
    for (const m of matches) {
      out += escapeHtml(text.slice(cursor, m.index));
      out += `<mark style="background:rgba(0,212,170,0.35);color:inherit;border-radius:3px;padding:0 2px">${escapeHtml(m.match)}</mark>`;
      cursor = m.index + m.match.length;
    }
    out += escapeHtml(text.slice(cursor));
    return out;
  }, [text, matches, error]);

  const toggleFlag = (f: string) => {
    setFlags(fs => (fs.includes(f) ? fs.replace(f, '') : fs + f));
  };

  const copy = async () => {
    await copyText(matches.map(m => m.match).join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="rx-pattern">Regular expression</label>
        <input
          id="rx-pattern"
          className="input"
          style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}
          value={pattern}
          onChange={e => setPattern(e.target.value)}
          placeholder="\\d+"
          spellCheck={false}
        />
        <div className="row" style={{ marginTop: 8 }}>
          {['g', 'i', 'm', 's', 'u'].map(f => (
            <button key={f} className={`tab ${flags.includes(f) ? 'active' : ''}`} onClick={() => toggleFlag(f)} role="tab" aria-selected={flags.includes(f)}>{f}</button>
          ))}
          <span style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', marginLeft: 8 }}>
            {matches.length} match{matches.length === 1 ? '' : 'es'}
          </span>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="field">
        <label htmlFor="rx-text">Test text</label>
        <textarea id="rx-text" className="input" value={text} onChange={e => setText(e.target.value)} spellCheck={false} style={{ minHeight: 120 }} />
      </div>

      {!error && matches.length > 0 && (
        <div className="field">
          <label>Matches</label>
          <div className="json-output" dangerouslySetInnerHTML={{ __html: highlighted }} />
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn secondary" onClick={copy}><Terminal size={16} /> Copy matches</button>
            {copied && <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}><Check size={14} style={{ verticalAlign: '-2px' }} /> Copied</span>}
          </div>
        </div>
      )}

      {!error && matches.length === 0 && pattern && (
        <div className="alert info"><Flag size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />No matches found.</div>
      )}

      <div className="alert info">
        Standard JavaScript regex syntax. Flags: g = global, i = case-insensitive, m = multiline, s = dotall, u = unicode. Everything runs locally in your browser.
      </div>
    </div>
  );
}
