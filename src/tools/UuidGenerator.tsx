import { useState } from 'react';
import { Copy, RefreshCw, Check, Download } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

function uuidv4(): string {
  if (crypto.randomUUID) return crypto.randomUUID();
  // Fallback for older browsers
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, uuidv4));
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setUuids(Array.from({ length: count }, uuidv4));
    setCopiedAll(false);
  };

  const copy = async (text: string, idx: number) => {
    await copyText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const copyAll = async () => {
    await copyText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const download = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="uuid-count">How many UUIDs?</label>
        <div className="num-row">
          <input
            id="uuid-count"
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={e => setCount(Math.min(1000, Math.max(1, Number(e.target.value) || 1)))}
          />
          <button className="btn" onClick={generate}><RefreshCw size={16} /> Generate</button>
          <button className="btn secondary" onClick={copyAll}>{copiedAll ? <Check size={16} /> : <Copy size={16} />} Copy all</button>
          <button className="btn secondary" onClick={download}><Download size={16} /> CSV</button>
        </div>
      </div>

      <div className="password-list">
        {uuids.map((u, i) => (
          <div className="password-row" key={`${u}-${i}`}>
            <code>{u}</code>
            <button className="icon-btn" onClick={() => copy(u, i)} aria-label="Copy UUID">
              {copiedIdx === i ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
