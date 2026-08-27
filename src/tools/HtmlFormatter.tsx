import { useState } from 'react';
import { Check, Copy, FileCode } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const SAMPLE = '<div class="card"><h2>Hello</h2><p>Readable HTML is easier to debug.</p></div>';
function minify(value: string): string { return value.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><').trim(); }
function formatHtml(value: string): string {
  const compact = minify(value).replace(/>\s*</g, '><'); const tokens = compact.replace(/></g, '>\n<').split('\n').filter(Boolean); let depth = 0; const out: string[] = [];
  for (const token of tokens) { const trimmed = token.trim(); if (/^<\//.test(trimmed)) depth = Math.max(0, depth - 1); out.push(`${'  '.repeat(depth)}${trimmed}`); if (/^<([a-zA-Z][^/>]*)[^/]>$/.test(trimmed) && !/^<(input|img|br|hr|meta|link|source|area|base|embed|param|track|wbr)\b/i.test(trimmed)) depth += 1; }
  return out.join('\n');
}

export function HtmlFormatter() {
  const [input, setInput] = useState(SAMPLE); const [mode, setMode] = useState<'format' | 'minify'>('format'); const [copied, setCopied] = useState(false);
  const output = mode === 'format' ? formatHtml(input) : minify(input);
  const copy = async () => { await copyText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); };
  return <div className="tool-ui">
    <div className="field"><label>Action</label><div className="tabs"><button className={`tab ${mode === 'format' ? 'active' : ''}`} onClick={() => setMode('format')}>Format / beautify</button><button className={`tab ${mode === 'minify' ? 'active' : ''}`} onClick={() => setMode('minify')}>Minify</button></div></div>
    <div className="field"><label htmlFor="html-input"><FileCode size={15} style={{ verticalAlign: 'middle', marginRight: 5 }} />HTML input</label><textarea id="html-input" className="input" value={input} onChange={e => setInput(e.target.value)} style={{ minHeight: 200, fontFamily: 'ui-monospace, Consolas, monospace' }} /></div>
    <div className="field"><label>Output</label><textarea className="input" readOnly value={output} style={{ minHeight: 200, fontFamily: 'ui-monospace, Consolas, monospace' }} /><button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy output</button></div>
  </div>;
}
