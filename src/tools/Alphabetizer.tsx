import { useState } from 'react';
import { Copy, Check, ListOrdered } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

type SortMode = 'lines' | 'words';
type Order = 'asc' | 'desc';

export function Alphabetizer() {
  const [input, setInput] = useState('banana\napple\ncherry\nApple\nBanana');
  const [mode, setMode] = useState<SortMode>('lines');
  const [order, setOrder] = useState<Order>('asc');
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [dedupe, setDedupe] = useState(false);
  const [copied, setCopied] = useState(false);

  const sortItems = () => {
    const items = mode === 'lines'
      ? input.split('\n').map(s => s.replace(/\r$/, ''))
      : input.split(/\s+/).filter(Boolean);
    const filtered = dedupe ? Array.from(new Set(items)) : items;
    const sorted = filtered.sort((a, b) => {
      const cmp = ignoreCase ? a.toLowerCase().localeCompare(b.toLowerCase()) : a.localeCompare(b);
      return order === 'asc' ? cmp : -cmp;
    });
    return mode === 'lines' ? sorted.join('\n') : sorted.join(' ');
  };

  const output = sortItems();

  const copy = async () => {
    await copyText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="al-in">Input</label>
        <textarea id="al-in" className="input" value={input} onChange={e => setInput(e.target.value)} spellCheck={false} placeholder="Paste a list, one item per line…" />
      </div>

      <div className="field">
        <label>Options</label>
        <div className="row">
          <div className="tabs" role="tablist">
            <button className={`tab ${mode === 'lines' ? 'active' : ''}`} onClick={() => setMode('lines')} role="tab" aria-selected={mode === 'lines'}>Lines</button>
            <button className={`tab ${mode === 'words' ? 'active' : ''}`} onClick={() => setMode('words')} role="tab" aria-selected={mode === 'words'}>Words</button>
          </div>
          <div className="tabs" role="tablist">
            <button className={`tab ${order === 'asc' ? 'active' : ''}`} onClick={() => setOrder('asc')} role="tab" aria-selected={order === 'asc'}>A → Z</button>
            <button className={`tab ${order === 'desc' ? 'active' : ''}`} onClick={() => setOrder('desc')} role="tab" aria-selected={order === 'desc'}>Z → A</button>
          </div>
        </div>
        <div className="check-grid" style={{ marginTop: 10 }}>
          <label className="check"><input type="checkbox" checked={ignoreCase} onChange={e => setIgnoreCase(e.target.checked)} /> Ignore case</label>
          <label className="check"><input type="checkbox" checked={dedupe} onChange={e => setDedupe(e.target.checked)} /> Remove duplicates</label>
        </div>
      </div>

      <div className="row">
        <button className="btn" onClick={sortItems}><ListOrdered size={16} /> Sort</button>
        <button className="btn secondary" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy</button>
      </div>

      <div className="field">
        <label>Sorted output ({mode === 'lines' ? output.split('\n').filter(Boolean).length + ' items' : output.split(/\s+/).filter(Boolean).length + ' words'})</label>
        <div className="output" style={{ maxHeight: 260 }}>{output}</div>
      </div>

      <div className="alert info">
        Sorts naturally and instantly as you type — no server round-trip. "Remove duplicates" keeps the first occurrence of each value.
      </div>
    </div>
  );
}
