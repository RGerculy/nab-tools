import { useMemo, useState } from 'react';
import { Copy, Check, Minus, Braces } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightJson(json: string): string {
  return escapeHtml(json)
    .replace(/("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")(\s*:)?/g, (_match, str, _, colon) => {
      // Keys (followed by colon) vs strings
      return colon
        ? `<span class="json-key">${str}</span>${colon}`
        : `<span class="json-string">${str}</span>`;
    })
    .replace(/\b(true|false)\b/g, '<span class="json-bool">$1</span>')
    .replace(/\bnull\b/g, '<span class="json-null">null</span>')
    .replace(/-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, '<span class="json-number">$&</span>');
}

function formatJson(input: string): string {
  return JSON.stringify(JSON.parse(input), null, 2);
}

function minifyJson(input: string): string {
  return JSON.stringify(JSON.parse(input));
}

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isMinified, setIsMinified] = useState(false);

  const outputHtml = useMemo(() => (output ? highlightJson(output) : ''), [output]);

  const run = (minify: boolean) => {
    setError('');
    if (!input.trim()) { setOutput(''); setIsMinified(false); return; }
    try {
      setOutput(minify ? minifyJson(input) : formatJson(input));
      setIsMinified(minify);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const copy = async () => {
    await copyText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="json-in">Input JSON</label>
        <textarea
          id="json-in"
          className="input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='{"name": "AiOTools", "tools": 10}'
          spellCheck={false}
          style={{ minHeight: 180 }}
        />
      </div>

      <div className="row">
        <button className="btn" onClick={() => run(false)} disabled={!input.trim()}><Braces size={16} /> Format</button>
        <button className="btn secondary" onClick={() => run(true)} disabled={!input.trim()}><Minus size={16} /> Minify</button>
      </div>

      {error && <div className="alert error">Invalid JSON: {error}</div>}

      {output && (
        <div className="field">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <label>{isMinified ? 'Minified JSON' : 'Formatted JSON'}</label>
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
          </div>
          <div className="json-output" dangerouslySetInnerHTML={{ __html: outputHtml }} />
        </div>
      )}
    </div>
  );
}
