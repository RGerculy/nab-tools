import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

type CaseMode = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab';

const MODES: { id: CaseMode; label: string }[] = [
  { id: 'upper', label: 'UPPERCASE' },
  { id: 'lower', label: 'lowercase' },
  { id: 'title', label: 'Title Case' },
  { id: 'sentence', label: 'Sentence case' },
  { id: 'camel', label: 'camelCase' },
  { id: 'snake', label: 'snake_case' },
  { id: 'kebab', label: 'kebab-case' },
];

function splitWords(s: string): string[] {
  return s
    .trim()
    .split(/[\s\-_]+/)
    .filter(Boolean);
}

function convert(text: string, mode: CaseMode): string {
  if (!text) return '';
  switch (mode) {
    case 'upper': return text.toUpperCase();
    case 'lower': return text.toLowerCase();
    case 'title':
      return text.toLowerCase().replace(/\b\p{L}/gu, c => c.toUpperCase());
    case 'sentence':
      return text.toLowerCase().replace(/^(\s*\p{L})/u, c => c.toUpperCase());
    case 'camel':
      return splitWords(text).map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');
    case 'snake':
      return splitWords(text).map(w => w.toLowerCase()).join('_');
    case 'kebab':
      return splitWords(text).map(w => w.toLowerCase()).join('-');
  }
}

export function CaseConverter() {
  const [input, setInput] = useState('hello world from NAB tools');
  const [mode, setMode] = useState<CaseMode>('title');
  const [copied, setCopied] = useState(false);

  const output = convert(input, mode);

  const copy = async () => {
    await copyText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="case-in">Text</label>
        <textarea id="case-in" className="input" value={input} onChange={e => setInput(e.target.value)} style={{ minHeight: 100 }} />
      </div>

      <div className="field">
        <label>Case</label>
        <div className="tabs" role="tablist" style={{ flexWrap: 'wrap' }}>
          {MODES.map(m => (
            <button key={m.id} className={`tab ${mode === m.id ? 'active' : ''}`} onClick={() => setMode(m.id)} role="tab" aria-selected={mode === m.id}>{m.label}</button>
          ))}
        </div>
      </div>

      {output && (
        <div className="field">
          <label>Output</label>
          <div className="output" style={{ maxHeight: 'none' }}>{output}</div>
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
